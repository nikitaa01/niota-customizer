import type { Selection } from "../../data/catalog";
import type { Messages } from "../../data/messages";
import { composedLayers, slotColor } from "../../data/selection";
import { selection } from "./state";

const size = 1024;

type Props = {
  messages: Messages;
};

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(src));
    image.src = src;
  });
}

async function exportNyota(current: Selection) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (!context) return;

  context.fillStyle = slotColor("background", current);
  context.fillRect(0, 0, size, size);

  for (const layer of composedLayers(current)) {
    const image = await loadImage(layer.src);
    if (!layer.color) {
      context.drawImage(image, 0, 0, size, size);
      continue;
    }
    const scratch = document.createElement("canvas");
    scratch.width = size;
    scratch.height = size;
    const scratchContext = scratch.getContext("2d");
    if (!scratchContext) continue;
    scratchContext.drawImage(image, 0, 0, size, size);
    scratchContext.globalCompositeOperation = "source-in";
    scratchContext.fillStyle = layer.color;
    scratchContext.fillRect(0, 0, size, size);
    context.drawImage(scratch, 0, 0);
  }

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((result) => {
      if (result) resolve(result);
      else reject(new Error("Could not export Nyota as PNG"));
    }, "image/png");
  });

  if (/iPhone/i.test(navigator.userAgent) && navigator.share) {
    const files = [new File([blob], "nyota.png", { type: "image/png" })];
    if (navigator.canShare?.({ files })) {
      try {
        await navigator.share({ files });
        return;
      } catch (error) {
        // Cancelling the share sheet should not start a download.
        if (error instanceof DOMException && error.name === "AbortError") return;
        // Fall back to downloading if sharing fails or user activation expires.
      }
    }
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "nyota.png";
  link.click();
  // Keep the URL alive for Safari's download prompt; unloading releases it.
}

export default function Download({ messages }: Props) {
  return (
    <button
      type="button"
      class="mx-auto mt-7 block cursor-pointer rounded-[11px] border-2 border-ink bg-butter px-[31px] pt-3.5 pb-[13px] font-display text-[32px] font-normal text-ink"
      onClick={() => {
        void exportNyota(selection.value);
      }}
    >
      {messages.download}
    </button>
  );
}

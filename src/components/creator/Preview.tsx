import { composedLayers, slotColor } from "../../data/selection";
import { selection } from "./state";

export default function Preview() {
  const layers = composedLayers(selection.value);

  return (
    <div
      class="relative h-full w-full"
      style={{ background: slotColor("background", selection.value) }}
    >
        {layers.map((layer) =>
          layer.color ? (
            <div
              key={`${layer.src}-${layer.color}`}
              class="absolute inset-0 h-full w-full [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]"
              style={{
                background: layer.color,
                maskImage: `url("${layer.src}")`,
                WebkitMaskImage: `url("${layer.src}")`,
              }}
            />
          ) : (
            <img
              key={layer.src}
              class="absolute inset-0 h-full w-full object-contain"
              src={layer.src}
              alt=""
            />
          ),
        )}
    </div>
  );
}

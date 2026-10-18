import { catalog } from "../../data/catalog";
import { cn } from "../../lib/cn";
import Preview from "./Preview";
import { categoryId } from "./state";

export default function PreviewFrame() {
  const selectedCategory = catalog.categories.find(
    (category) => category.id === categoryId.value,
  );
  const firstCategory = catalog.categories[0];

  if (!firstCategory || !selectedCategory) return null;

  const isFirstCategory = categoryId.value === firstCategory.id;

  return (
    <div class="relative isolate flex items-start p-6 md:row-span-2 max-md:[grid-area:preview]">
      <div
        class="absolute md:top-0 max-md:bottom-0 left-0 -z-30 h-[64px] w-full md:rounded-tl-[24px] md:border-t-2 max-md:border-r-2 border-ink"
        style={{ background: firstCategory.color }}
      />
      <div
        class={cn(
          "absolute md:top-0 max-md:bottom-0 md:left-0 max-md:right-0 -z-10 h-[64px] max-md:w-[72px] w-full md:rounded-tl-[24px] md:border-t-2 md:border-l-2 max-md:border-r-2 border-ink",
          !isFirstCategory &&
            "md:rounded-tr-[24px] border-r-2 max-md:border-b-2 max-md:rounded-br-[24px]",
        )}
        style={{ background: selectedCategory.color }}
      />
      <div
        class={cn(
          "absolute md:top-[64px] max-md:top-0 left-0 -z-20 md:h-[calc(100%-64px)] max-md:h-full w-full md:rounded-bl-[24px] md:border-b-2 border-l-2 max-md:border-t-2 max-md:border-r-2 max-md:rounded-t-[24px] border-ink",
          !isFirstCategory && "max-md:rounded-br-[24px]",
        )}
        style={{ background: selectedCategory.color }}
      />
      <div class="aspect-square w-full overflow-hidden rounded-[24px] border-2 border-ink bg-white max-md:mx-auto max-md:max-w-sm">
        <Preview />
      </div>
    </div>
  );
}

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
    <div class="relative flex items-start p-6 md:row-span-2 max-md:[grid-area:preview]">
      <div
        class="absolute top-0 left-0 -z-20 h-[64px] w-full rounded-tl-[24px] border-t-2 border-ink"
        style={{ background: firstCategory.color }}
      />
      <div
        class={cn(
          "absolute top-0 left-0 -z-10 h-[64px] w-full rounded-tl-[24px] border-t-2 border-l-2 border-ink",
          !isFirstCategory && "rounded-tr-[24px] border-r-2",
        )}
        style={{ background: selectedCategory.color }}
      />
      <div
        class="absolute top-[64px] left-0 -z-10 h-[calc(100%-64px)] w-full rounded-bl-[24px] border-b-2 border-l-2 border-ink"
        style={{ background: selectedCategory.color }}
      />
      <div class="aspect-square w-full overflow-hidden rounded-[24px] border-2 border-ink bg-white">
        <Preview />
      </div>
    </div>
  );
}

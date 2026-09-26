import { catalog } from "../data/catalog";
import type { Messages } from "../data/messages";
import { cn } from "../lib/cn";
import CategoryTabs from "./creator/CategoryTabs";
import Download from "./creator/Download";
import Options from "./creator/Options";
import Preview from "./creator/Preview";
import { categoryId } from "./creator/state";

type Props = {
  messages: Messages;
};

export default function Creator({ messages }: Props) {
  const selectedCategory = catalog.categories.find(
    (category) => category.id === categoryId.value,
  );
  const firstCategory = catalog.categories[0];
  const lastCategory = catalog.categories.at(-1);

  if (!firstCategory || !lastCategory || !selectedCategory) return null;

  const isFirstCategory = categoryId.value === firstCategory.id;
  const isLastCategory = categoryId.value === lastCategory.id;

  return (
    <div>
      <div class="relative grid grid-cols-[1fr_repeat(4,108px)] grid-rows-[64px_1fr]">
        <div class="relative row-span-2 p-2">
          <div
            class="absolute top-0 left-0 -z-20 h-[64px] w-full rounded-tl-[18px] border-t-2 border-ink"
            style={{ background: firstCategory.color }}
          />
          <div
            class={cn(
              "absolute top-0 left-0 -z-10 h-[64px] w-full rounded-tl-[18px] border-t-2 border-l-2 border-ink",
              !isFirstCategory && "rounded-tr-[18px] border-r-2",
            )}
            style={{ background: selectedCategory.color }}
          />
          <div
            class="absolute top-[64px] left-0 -z-10 h-[calc(100%-64px)] w-full rounded-bl-[18px] border-b-2 border-l-2 border-ink"
            style={{ background: selectedCategory.color }}
          />
          <div class="aspect-square size-full overflow-hidden rounded-[18px] bg-white">
            <Preview />
          </div>
        </div>

        <CategoryTabs messages={messages} />

        <div class="relative col-span-4 min-h-0">
          <div
            class="absolute top-0 left-0 -z-20 h-[64px] w-full border-r-2"
            style={{ background: lastCategory.color }}
          />
          <div
            class="absolute top-0 left-0 -z-10 h-[64px] w-[calc(100%-108px)] border-t-2 border-ink"
            style={{ background: selectedCategory.color }}
          />
          {!isFirstCategory && (
            <div class="absolute -left-0.5 top-0 z-20 h-0.5 w-0.5 bg-ink" />
          )}
          <div
            class={cn(
              "absolute top-0 right-0 -z-10 h-[64px] w-[108px] border-r-2 border-ink",
              !isLastCategory && "rounded-tr-[18px] border-t-2",
            )}
            style={{ background: selectedCategory.color }}
          />
          <div
            class="absolute top-[64px] left-0 -z-10 h-[calc(100%-64px)] w-full rounded-br-[18px] border-b-2 border-r-2 border-ink"
            style={{ background: selectedCategory.color }}
          />
          <div class="absolute inset-0 p-2">
            <Options messages={messages} />
          </div>
        </div>
      </div>
      <Download messages={messages} />
    </div>
  );
}

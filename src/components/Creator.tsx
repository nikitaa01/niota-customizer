import { catalog } from "../data/catalog";
import type { Messages } from "../data/messages";
import { cn } from "../lib/cn";
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

  if (!lastCategory) return null;

  const isFirstCategory = categoryId.value === firstCategory.id;
  const isLastCategory = categoryId.value === lastCategory?.id;
  return (
    <div class="w-[852px] origin-top-left max-[884px]:[transform:scale(calc((100vw-32px)/852px))]">
      <div class="relative grid grid-cols-[1fr_repeat(4,108px)] grid-rows-[64px_1fr]">
        <div class="row-span-2 relative p-2">
          <div
            class={cn(
              "absolute -z-20 top-0 left-0 w-full h-[64px] rounded-tl-[18px] border-t-2",
              `bg-${firstCategory.color}`,
            )}
          ></div>
          <div
            class={cn(
              "absolute -z-10 top-0 left-0 w-full h-[64px] border-t-2 border-l-2 rounded-tl-[18px]",
              `bg-${selectedCategory?.color}`,
              !isFirstCategory && "border-r-2 rounded-tr-[18px]",
            )}
          ></div>
          <div
            class={cn(
              "absolute -z-10 top-[64px] left-0 w-full h-[calc(100%-64px)] border-b-2 border-l-2 rounded-bl-[18px]",
              `bg-${lastCategory.color}`,
            )}
          ></div>
          <div class="size-full aspect-square bg-white rounded-[18px] flex items-center justify-center">
            preview
          </div>
        </div>

        <div class="bg-blue-400 rounded-tr-[18px] border-t-2 border-r-2">
          Category 1
        </div>
        <div class="bg-pink-400 rounded-tl-[18px] rounded-tr-[18px] border-t-2 border-r-2 border-l-2">
          Category 2
        </div>
        <div class="bg-blue-400 rounded-tl-[18px] rounded-tr-[18px] border-2">
          Category 3
        </div>
        <div class="bg-pink-400 rounded-tl-[18px] rounded-tr-[18px] border-t-2 border-r-2 border-l-2">
          Category 4
        </div>

        <div class={"relative col-span-4 p-2"}>
          <div
            class={cn(
              "absolute -z-20 top-0 left-0 w-full h-[64px] border-r-2",
              `bg-${lastCategory.color}`,
            )}
          ></div>
          <div
            class={cn(
              "absolute -z-10 top-0 left-0 w-full h-[64px]",
              `bg-${selectedCategory?.color}`,
              !isLastCategory && "border-t-2 border-r-2 rounded-tr-[18px]",
            )}
          ></div>
          <div
            class={cn(
              "absolute -z-10 top-[64px] left-0 w-full h-[calc(100%-64px)] border-b-2 border-r-2 rounded-br-[18px]",
              `bg-${lastCategory.color}`,
            )}
          ></div>
          <div class="">options</div>
        </div>
      </div>
    </div>
  );
}

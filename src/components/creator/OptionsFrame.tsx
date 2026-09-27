import { catalog } from "../../data/catalog";
import type { Messages } from "../../data/messages";
import { cn } from "../../lib/cn";
import Options from "./Options";
import { categoryId } from "./state";

type Props = {
  messages: Messages;
};

export default function OptionsFrame({ messages }: Props) {
  const selectedCategory = catalog.categories.find(
    (category) => category.id === categoryId.value,
  );
  const firstCategory = catalog.categories[0];
  const lastCategory = catalog.categories.at(-1);

  if (!firstCategory || !lastCategory || !selectedCategory) return null;

  const isFirstCategory = categoryId.value === firstCategory.id;
  const isLastCategory = categoryId.value === lastCategory.id;

  return (
    <div class="relative md:col-span-4 max-md:[grid-area:options]">
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
          !isLastCategory && "rounded-tr-[24px] border-t-2",
        )}
        style={{ background: selectedCategory.color }}
      />
      <div
        class="absolute top-[64px] left-0 -z-10 h-[calc(100%-64px)] w-full rounded-br-[24px] border-b-2 border-r-2 border-ink"
        style={{ background: selectedCategory.color }}
      />
      <div class="p-2">
        <Options messages={messages} />
      </div>
    </div>
  );
}

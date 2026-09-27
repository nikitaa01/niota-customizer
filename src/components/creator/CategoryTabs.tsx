import { catalog } from "../../data/catalog";
import type { Messages } from "../../data/messages";
import { cn } from "../../lib/cn";
import { categoryId } from "./state";

type Props = {
  messages: Messages;
};

const mobileAreas = [
  "max-md:[grid-area:category1]",
  "max-md:[grid-area:category2]",
  "max-md:[grid-area:category3]",
  "max-md:[grid-area:category4]",
];

function tabClass(index: number, selected: boolean) {
  const shape = "relative grid h-full cursor-pointer border-b-0 border-ink p-0";
  const open =
    selected &&
    "z-10 md:h-[calc(100%+2px)] max-md:w-[calc(100%+2px)] max-md:ml-[-2px]";

  if (index === 0) {
    return cn(
      shape,
      "w-full md:rounded-tr-[24px] md:border-t-2 border-r-2 max-md:border-b-2 max-md:rounded-br-[24px]",
      open,
    );
  }

  return cn(
    shape,
    "md:-ml-0.5 md:w-[calc(100%+2px)] max-md:-mt-0.5 max-md:h-[calc(100%+2px)] md:rounded-tl-[24px] rounded-tr-[24px] border-t-2 border-r-2 md:border-l-2 max-md:border-b-2 max-md:rounded-br-[24px]",
    open,
  );
}

export default function CategoryTabs({ messages }: Props) {
  return (
    <div class="contents" role="tablist">
      {catalog.categories.map((item, index) => {
        const selected = item.id === categoryId.value;
        return (
          <button
            key={item.id}
            type="button"
            class={cn(tabClass(index, selected), mobileAreas[index])}
            role="tab"
            aria-selected={selected}
            aria-label={messages.categories[item.id]}
            style={{ background: item.color }}
            onClick={() => {
              categoryId.value = item.id;
            }}
          >
            <img
              class="absolute md:top-8 max-md:top-1/2 md:left-1/2 max-md:right-2 md:h-12 h-auto w-8 md:w-auto -translate-x-1/2 -translate-y-1/2"
              src={item.icon}
              alt=""
            />
          </button>
        );
      })}
    </div>
  );
}

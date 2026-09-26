import { catalog } from "../../data/catalog";
import type { Messages } from "../../data/messages";
import { cn } from "../../lib/cn";
import { categoryId } from "./state";

type Props = {
  messages: Messages;
};

function tabClass(index: number, count: number, selected: boolean) {
  const isFirst = index === 0;
  const isLast = index === count - 1;
  const shape = "grid h-full cursor-pointer place-items-center border-ink p-0";

  if (isFirst) {
    return cn(
      shape,
      "w-full rounded-tr-[18px] border-t-2 border-r-2",
      selected ? "relative z-10 h-[calc(100%+2px)]" : "border-b-2",
    );
  }

  return cn(
    shape,
    "-ml-0.5 w-[calc(100%+2px)] rounded-tl-[18px] rounded-tr-[18px] border-2",
    isLast && "border-b-0",
    selected && "relative z-10 border-b-0",
    selected && !isLast && "h-[calc(100%+2px)]",
  );
}

export default function CategoryTabs({ messages }: Props) {
  const count = catalog.categories.length;

  return (
    <div class="contents" role="tablist">
      {catalog.categories.map((item, index) => {
        const selected = item.id === categoryId.value;
        return (
          <button
            key={item.id}
            type="button"
            class={tabClass(index, count, selected)}
            role="tab"
            aria-selected={selected}
            aria-label={messages.categories[item.id]}
            style={{ background: item.color }}
            onClick={() => {
              categoryId.value = item.id;
            }}
          >
            <img
              class="block h-9 w-9 object-contain"
              src={item.icon}
              alt=""
              width="36"
              height="36"
            />
          </button>
        );
      })}
    </div>
  );
}

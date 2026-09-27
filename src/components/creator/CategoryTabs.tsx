import { catalog } from "../../data/catalog";
import type { Messages } from "../../data/messages";
import { cn } from "../../lib/cn";
import { categoryId } from "./state";

type Props = {
  messages: Messages;
};

function tabClass(index: number, selected: boolean) {
  const shape =
    "relative grid h-full cursor-pointer border-b-0 border-ink p-0";
  const open = selected && "z-10 h-[calc(100%+2px)]";

  if (index === 0) {
    return cn(shape, "w-full rounded-tr-[24px] border-t-2 border-r-2", open);
  }

  return cn(
    shape,
    "-ml-0.5 w-[calc(100%+2px)] rounded-tl-[24px] rounded-tr-[24px] border-t-2 border-r-2 border-l-2",
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
            class={tabClass(index, selected)}
            role="tab"
            aria-selected={selected}
            aria-label={messages.categories[item.id]}
            style={{ background: item.color }}
            onClick={() => {
              categoryId.value = item.id;
            }}
          >
            <img
              class="absolute top-8 left-1/2 h-12 w-auto -translate-x-1/2 -translate-y-1/2"
              src={item.icon}
              alt=""
            />
          </button>
        );
      })}
    </div>
  );
}

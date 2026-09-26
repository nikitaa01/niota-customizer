import { catalog } from "../../data/catalog";
import type { Messages } from "../../data/messages";
import { cn } from "../../lib/cn";
import { categoryId } from "./state";

type Props = {
  messages: Messages;
};

function tabClass(index: number, selected: boolean) {
  const shape = "grid h-full cursor-pointer place-items-center border-b-0 border-ink p-0";
  const open = selected && "relative z-10 h-[calc(100%+2px)]";

  if (index === 0) {
    return cn(shape, "w-full rounded-tr-[18px] border-t-2 border-r-2", open);
  }

  return cn(
    shape,
    "-ml-0.5 w-[calc(100%+2px)] rounded-tl-[18px] rounded-tr-[18px] border-t-2 border-r-2 border-l-2",
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

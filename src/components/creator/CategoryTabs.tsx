import { catalog } from "../../data/catalog";
import type { Messages } from "../../data/messages";
import { categoryId } from "./state";

type Props = {
  messages: Messages;
};

export default function CategoryTabs({ messages }: Props) {
  const category = catalog.categories.find((item) => item.id === categoryId.value)!;

  return (
    <div class="flex items-end justify-end gap-3 pr-7" role="tablist">
      {catalog.categories.map((item) => {
        const selected = item.id === category.id;
        return (
          <button
            key={item.id}
            type="button"
            class={
              selected
                ? "sheet-tab relative z-[2] grid h-14 w-[72px] cursor-pointer place-items-center rounded-t-2xl border-2 border-b-0 border-ink p-0"
                : "relative top-1 z-0 grid h-12 w-[72px] cursor-pointer place-items-center rounded-t-2xl border-2 border-ink p-0"
            }
            role="tab"
            aria-selected={selected}
            aria-label={messages.categories[item.id]}
            style={{ background: item.color, "--tab": item.color }}
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
            {selected && (
              <>
                <span class="sheet-join" />
                <span class="sheet-shoulder sheet-shoulder-left" />
                <span class="sheet-shoulder sheet-shoulder-right" />
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}

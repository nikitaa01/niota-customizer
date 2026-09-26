import { useEffect } from "preact/hooks";
import { catalog, type Group } from "../../data/catalog";
import type { Messages } from "../../data/messages";
import { preloadOption, selectedId, visibleGroups } from "../../data/selection";
import { categoryId, hairGroupId, selection } from "./state";

type Props = {
  messages: Messages;
};

function choose(group: Group, optionId: string) {
  const current = selection.value;
  if (group.selectionKey === "accessory") {
    selection.value = {
      ...current,
      accessory: current.accessory === optionId ? null : optionId,
    };
    return;
  }
  selection.value = { ...current, [group.selectionKey]: optionId };
}

export default function Options({ messages }: Props) {
  const category = catalog.categories.find((item) => item.id === categoryId.value)!;
  const groups = visibleGroups(category, hairGroupId.value);

  useEffect(() => {
    for (const group of groups) {
      for (const option of group.options) preloadOption(option);
    }
  }, [categoryId.value, hairGroupId.value]);

  return (
    <div class="flex h-full min-h-0 flex-col gap-[18px] overflow-auto px-3 py-2">
      {category.view === "tabs" && (
        <div class="flex gap-4" role="tablist">
          {category.groups.map((group) => (
            <button
              key={group.id}
              type="button"
              class="cursor-pointer rounded-full border-2 border-transparent bg-transparent px-3.5 pt-0.5 pb-1 font-display text-2xl font-normal text-ink aria-selected:border-ink aria-selected:bg-white"
              role="tab"
              aria-selected={group.id === hairGroupId.value}
              onClick={() => {
                hairGroupId.value = group.id;
              }}
            >
              {messages.groups[group.id]}
            </button>
          ))}
        </div>
      )}
      {groups.map((group) => (
        <section key={group.id}>
          {category.view === "stack" && (
            <h3 class="mb-2 font-display text-2xl font-normal">
              {messages.groups[group.id]}
            </h3>
          )}
          <div
            class={
              group.slot
                ? "grid grid-cols-4 gap-x-[25px] gap-y-[22px]"
                : group.selectionKey === "accessory"
                  ? "flex items-center justify-between"
                  : "grid grid-cols-4 items-center gap-x-2 gap-y-4"
            }
          >
            {group.options.map((option) => {
              const pressed = selectedId(group, selection.value) === option.id;
              const label =
                option.thumb.type === "color" ? option.thumb.color : option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  class={
                    group.slot
                      ? "h-11 cursor-pointer rounded-[11px] border-2 border-ink p-0 aria-pressed:outline-[3px] aria-pressed:outline-offset-2 aria-pressed:outline-ink"
                      : "cursor-pointer rounded-xl border-0 bg-transparent p-0 aria-pressed:outline-[3px] aria-pressed:outline-offset-2 aria-pressed:outline-ink"
                  }
                  aria-pressed={pressed}
                  aria-label={label}
                  style={
                    option.thumb.type === "color"
                      ? { background: option.thumb.color }
                      : undefined
                  }
                  onPointerEnter={() => preloadOption(option)}
                  onFocus={() => preloadOption(option)}
                  onClick={() => choose(group, option.id)}
                >
                  {option.thumb.type === "image" && (
                    <img
                      class="block h-[52px] w-[68px] object-contain"
                      src={option.thumb.src}
                      alt=""
                    />
                  )}
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

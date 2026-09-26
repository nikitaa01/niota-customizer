import {
  catalog,
  planes,
  type Category,
  type Group,
  type Option,
  type Selection,
  type Slot,
} from "./catalog";

export type DrawnLayer = {
  src: string;
  color?: string;
};

const warmed = new Set<string>();

export function warm(src: string) {
  if (warmed.has(src)) return;
  warmed.add(src);
  const image = new Image();
  image.src = src;
}

export function preloadOption(option: Option) {
  for (const layer of option.layers) warm(layer.src);
}

export function visibleGroups(category: Category, hairGroupId: string): Group[] {
  if (category.view === "tabs") {
    return category.groups.filter((group) => group.id === hairGroupId);
  }
  return category.groups;
}

function optionInGroup(group: Group, id: string | null): Option | undefined {
  if (!id) return undefined;
  return group.options.find((option) => option.id === id);
}

export function selectedId(group: Group, selection: Selection): string | null {
  return selection[group.selectionKey];
}

export function slotColor(slot: Slot, selection: Selection): string {
  for (const category of catalog.categories) {
    for (const group of category.groups) {
      if (group.slot !== slot) continue;
      const option = optionInGroup(group, selection[group.selectionKey]);
      if (option?.thumb.type === "color") return option.thumb.color;
    }
  }
  return "#ffffff";
}

export function findOption(id: string): Option | undefined {
  for (const category of catalog.categories) {
    for (const group of category.groups) {
      const option = group.options.find((item) => item.id === id);
      if (option) return option;
    }
  }
  return undefined;
}

export function composedLayers(selection: Selection): DrawnLayer[] {
  const hair = findOption(selection.hair);
  const accessory = selection.accessory ? findOption(selection.accessory) : undefined;
  const layers = [...(hair?.layers ?? []), ...(accessory?.layers ?? [])];

  return layers
    .map((layer, index) => ({ layer, index }))
    .sort((a, b) => {
      const plane = planes.indexOf(a.layer.plane) - planes.indexOf(b.layer.plane);
      return plane === 0 ? a.index - b.index : plane;
    })
    .map(({ layer }) => ({
      src: layer.src,
      color: layer.tint
        ? "slot" in layer.tint
          ? slotColor(layer.tint.slot, selection)
          : layer.tint.color
        : undefined,
    }));
}

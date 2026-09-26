import {
  catalog,
  planes,
  type Category,
  type Group,
  type Layer,
  type Option,
  type Position,
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

const cheekVariant2 = new Set(["#f8bd89", "#f6ac7f", "#d39271"]);

function layerSources(src: Layer["src"]): string[] {
  return typeof src === "string" ? [src] : Object.values(src);
}

export function preloadOption(option: Option) {
  for (const layer of option.layers) {
    for (const src of layerSources(layer.src)) warm(src);
  }
  if (!option.position) return;
  warm(`/layers/eyes/${option.position}.svg`);
  warm(`/layers/cheeks/1-${option.position}.png`);
  warm(`/layers/cheeks/2-${option.position}.png`);
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

function resolveSrc(src: Layer["src"], position: Position): string {
  return typeof src === "string" ? src : src[position];
}

export function composedLayers(selection: Selection): DrawnLayer[] {
  const hair = findOption(selection.hair);
  const accessory = selection.accessory ? findOption(selection.accessory) : undefined;
  const position = hair?.position ?? "1";
  const skin = slotColor("skin", selection).toLowerCase();
  const cheeks = cheekVariant2.has(skin) ? "2" : "1";
  const layers: Layer[] = [
    ...(hair?.layers ?? []),
    {
      src: `/layers/eyes/${position}.svg`,
      plane: "eyes",
      tint: { slot: "eyes" },
    },
    {
      src: `/layers/cheeks/${cheeks}-${position}.png`,
      plane: "cheeks",
    },
    ...(accessory?.layers ?? []),
  ];

  return layers
    .map((layer, index) => ({ layer, index }))
    .sort((a, b) => {
      const plane = planes.indexOf(a.layer.plane) - planes.indexOf(b.layer.plane);
      return plane === 0 ? a.index - b.index : plane;
    })
    .map(({ layer }) => ({
      src: resolveSrc(layer.src, position),
      color: layer.tint
        ? "slot" in layer.tint
          ? slotColor(layer.tint.slot, selection)
          : layer.tint.color
        : undefined,
    }));
}

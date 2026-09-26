export const planes = [
  "background",
  "hair",
  "skin",
  "eyes",
  "outline",
  "cheeks",
  "accessory",
  "accessoryOutline",
] as const;

export type Plane = (typeof planes)[number];

export type Slot = "skin" | "eyes" | "hair" | "accessory" | "background";

export type Position = "1" | "2";

export type Layer = {
  src: string | Record<Position, string>;
  plane: Plane;
  tint?: { slot: Slot } | { color: string };
};

export type Thumb =
  | { type: "image"; src: string }
  | { type: "color"; color: string };

export type Option = {
  id: string;
  thumb: Thumb;
  position?: Position;
  layers: Layer[];
};

export type SelectionKey =
  | "hair"
  | "accessory"
  | "skin"
  | "eyes"
  | "hairColor"
  | "accessoryColor"
  | "background";

export type Group = {
  id: string;
  selectionKey: SelectionKey;
  slot?: Slot;
  options: Option[];
};

export type CategoryId = "face" | "hair" | "accessory" | "background";

export type Category = {
  id: CategoryId;
  view: "stack" | "tabs";
  icon: string;
  color: string;
  groups: Group[];
};

export type Selection = {
  hair: string;
  accessory: string | null;
  skin: string;
  eyes: string;
  hairColor: string;
  accessoryColor: string;
  background: string;
};

function colors(prefix: string, values: string[]): Option[] {
  return values.map((color, index) => ({
    id: `${prefix}-${index + 1}`,
    thumb: { type: "color", color },
    layers: [],
  }));
}

const hairs: { id: string; position: Position }[] = [
  { id: "low-pigtails", position: "2" },
  { id: "wavy", position: "2" },
  { id: "bob", position: "1" },
  { id: "long", position: "1" },
  { id: "curly", position: "2" },
  { id: "bun", position: "2" },
  { id: "braid", position: "1" },
  { id: "pigtails", position: "2" },
];

function hair({ id, position }: { id: string; position: Position }): Option {
  const base = `/layers/hair/${id}`;
  return {
    id,
    position,
    thumb: { type: "image", src: `/thumbs/hair/${id}.png` },
    layers: [
      { src: `${base}/hair.svg`, plane: "hair", tint: { slot: "hair" } },
      { src: `${base}/skin.svg`, plane: "skin", tint: { slot: "skin" } },
      { src: `${base}/outline.png`, plane: "outline" },
    ],
  };
}

function accessory(id: string, tint: boolean): Option {
  const base = `/layers/accessory/${id}`;
  const layers: Layer[] = [];
  if (tint) {
    layers.push({
      src: { "1": `${base}/1.svg`, "2": `${base}/2.svg` },
      plane: "accessory",
      tint: { slot: "accessory" },
    });
  }
  layers.push({
    src: { "1": `${base}/1.png`, "2": `${base}/2.png` },
    plane: "accessoryOutline",
  });
  return {
    id,
    thumb: { type: "image", src: `/thumbs/accessory/${id}.png` },
    layers,
  };
}

export const catalog: { categories: Category[]; defaults: Selection } = {
  defaults: {
    hair: "bob",
    accessory: null,
    skin: "skin-3",
    eyes: "eyes-3",
    hairColor: "hair-1",
    accessoryColor: "accessory-1",
    background: "background-1",
  },
  categories: [
    {
      id: "face",
      view: "stack",
      icon: "/icons/face.svg",
      color: "#b5e2f9",
      groups: [
        {
          id: "skin",
          selectionKey: "skin",
          slot: "skin",
          options: colors("skin", [
            "#fbdac6",
            "#fbd6b5",
            "#f8bd89",
            "#f6ac7f",
            "#d39271",
            "#c28059",
            "#ae745d",
            "#7c5547",
          ]),
        },
        {
          id: "eyes",
          selectionKey: "eyes",
          slot: "eyes",
          options: colors("eyes", [
            "#b8bec6",
            "#7dbbcc",
            "#77a58a",
            "#797857",
            "#c89a26",
            "#9c7052",
            "#523c37",
            "#251f18",
          ]),
        },
      ],
    },
    {
      id: "hair",
      view: "tabs",
      icon: "/icons/hair.svg",
      color: "#a5c16d",
      groups: [
        {
          id: "hair",
          selectionKey: "hair",
          options: hairs.map(hair),
        },
        {
          id: "hairColor",
          selectionKey: "hairColor",
          slot: "hair",
          options: colors("hair", [
            "#9a8163",
            "#825734",
            "#463128",
            "#000000",
            "#e0d5b3",
            "#d6c489",
            "#bb8021",
            "#b96619",
            "#6174c6",
            "#6ab5e2",
            "#6b8964",
            "#efd770",
            "#5e295e",
            "#cd9ae5",
            "#ea83c1",
            "#88181d",
          ]),
        },
      ],
    },
    {
      id: "accessory",
      view: "stack",
      icon: "/icons/accessory.svg",
      color: "#ebe2a9",
      groups: [
        {
          id: "accessory",
          selectionKey: "accessory",
          options: [
            accessory("flower", true),
            accessory("headband", true),
            accessory("glasses", false),
            accessory("headphones", true),
          ],
        },
        {
          id: "accessoryColor",
          selectionKey: "accessoryColor",
          slot: "accessory",
          options: colors("accessory", [
            "#f7f5ed",
            "#ccbfa8",
            "#eae2a9",
            "#f79fab",
            "#2d5687",
            "#a4c667",
            "#564640",
            "#161513",
          ]),
        },
      ],
    },
    {
      id: "background",
      view: "stack",
      icon: "/icons/background.svg",
      color: "#e8a9c9",
      groups: [
        {
          id: "background",
          selectionKey: "background",
          slot: "background",
          options: colors("background", [
            "#ffffff",
            "#000000",
            "#dcd4c7",
            "#66524b",
            "#ebe2a9",
            "#a5c16d",
            "#aadacd",
            "#b5e2f9",
            "#5775cc",
            "#70508c",
            "#b394ce",
            "#ed97d5",
            "#e8a9c9",
            "#e26a84",
            "#f59e4e",
            "#74300b",
          ]),
        },
      ],
    },
  ],
};

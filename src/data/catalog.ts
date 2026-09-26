export const planes = [
  "background",
  "hairBack",
  "skin",
  "eyes",
  "hairFront",
  "accessory",
] as const;

export type Plane = (typeof planes)[number];

export type Slot = "skin" | "eyes" | "hair" | "accessory" | "background";

export type Layer = {
  src: string;
  plane: Plane;
  tint?: { slot: Slot } | { color: string };
};

export type Thumb =
  | { type: "image"; src: string }
  | { type: "color"; color: string };

export type Option = {
  id: string;
  thumb: Thumb;
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

function hair(id: string): Option {
  const base = `/layers/hair/${id}`;
  return {
    id,
    thumb: { type: "image", src: `/thumbs/hair/${id}.svg` },
    layers: [
      { src: `${base}/hair-back.svg`, plane: "hairBack", tint: { slot: "hair" } },
      { src: `${base}/face.svg`, plane: "skin", tint: { slot: "skin" } },
      { src: `${base}/iris.svg`, plane: "eyes", tint: { slot: "eyes" } },
      { src: `${base}/eyes.svg`, plane: "eyes" },
      { src: `${base}/bangs.svg`, plane: "hairFront", tint: { slot: "hair" } },
    ],
  };
}

function accessory(id: string, layers: Layer[]): Option {
  return {
    id,
    thumb: { type: "image", src: `/thumbs/accessory/${id}.svg` },
    layers,
  };
}

const hairIds = ["short", "bob", "long", "bangs", "curly", "bun", "wavy", "pigtails"];

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
          options: hairIds.map(hair),
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
            accessory("flower", [
              {
                src: "/layers/accessory/flower/petals.svg",
                plane: "accessory",
                tint: { slot: "accessory" },
              },
              {
                src: "/layers/accessory/flower/center.svg",
                plane: "accessory",
                tint: { color: "#e23b4a" },
              },
            ]),
            accessory("brow", [
              {
                src: "/layers/accessory/brow/shape.svg",
                plane: "accessory",
                tint: { slot: "accessory" },
              },
            ]),
            accessory("glasses", [
              {
                src: "/layers/accessory/glasses/shape.svg",
                plane: "accessory",
                tint: { slot: "accessory" },
              },
            ]),
            accessory("headphones", [
              {
                src: "/layers/accessory/headphones/shape.svg",
                plane: "accessory",
                tint: { slot: "accessory" },
              },
            ]),
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

export type TextPart = {
  text: string;
  weight?: "medium";
  italic?: boolean;
  href?: string;
};

export type Messages = {
  metaTitle: string;
  brand: string;
  by: string;
  langSwitch: string;
  langHref: string;
  hello: string;
  haveFun: string;
  download: string;
  intro: TextPart[][];
  groups: Record<string, string>;
  categories: Record<"face" | "hair" | "accessory" | "background", string>;
};

const instagram = "https://www.instagram.com/_daniadesign/";

export const messages: Record<"es" | "en", Messages> = {
  es: {
    metaTitle: "Nyota creator",
    brand: "Nyota creator",
    by: "by @_daniadesign",
    langSwitch: "ENGLISH",
    langHref: "/en",
    hello: "¡Hola!",
    haveFun: "¡Diviértete creando!",
    download: "Descargar mi Nyota",
    groups: {
      skin: "Piel",
      eyes: "Ojos",
      hair: "Pelo",
      hairColor: "Color",
      accessory: "Accesorios",
      accessoryColor: "Color",
      background: "Fondo",
    },
    categories: {
      face: "Cara y ojos",
      hair: "Pelo",
      accessory: "Accesorios",
      background: "Fondo",
    },
    intro: [
      [
        { text: "Soy Dania, (" },
        { text: "@_daniadesign", weight: "medium", href: instagram },
        { text: ") y he creado este pequeño " },
        { text: "Nyota Creator", italic: true },
        {
          text: " por diversión y porque me hace muchísima ilusión ver todas las Nyotas que podéis imaginar.",
        },
      ],
      [
        {
          text: "Crea una Nyota a tu imagen, a la de un amigx o simplemente como te apetezca.",
          weight: "medium",
        },
        {
          text: " Juega con todas las variables hasta encontrar tu combinación perfecta. Y cuando estés listx, ",
        },
        {
          text: "¡descárgala y úsala como foto de perfil donde quieras!",
          weight: "medium",
        },
      ],
      [
        {
          text: "Si compartes tu Nyota en redes, etiquétame para que pueda verla. ",
        },
        { text: "Al ser una herramienta gratuita hecha con mucho cariño, " },
        {
          text: "que me menciones o me des crédito significa mucho para mí.",
          weight: "medium",
        },
      ],
    ],
  },
  en: {
    metaTitle: "Nyota creator",
    brand: "Nyota creator",
    by: "by @_daniadesign",
    langSwitch: "ESPAÑOL",
    langHref: "/",
    hello: "Hi!",
    haveFun: "Have fun creating!",
    download: "Download my Nyota",
    groups: {
      skin: "Skin",
      eyes: "Eyes",
      hair: "Hair",
      hairColor: "Color",
      accessory: "Accessories",
      accessoryColor: "Color",
      background: "Background",
    },
    categories: {
      face: "Face and eyes",
      hair: "Hair",
      accessory: "Accessories",
      background: "Background",
    },
    intro: [
      [
        { text: "I'm Dania (" },
        { text: "@_daniadesign", weight: "medium", href: instagram },
        {
          text: ") and I created this little Nyota Creator just for fun, and because I'm so excited to see all the Nyotas you can imagine.",
        },
      ],
      [
        {
          text: "Create a Nyota that looks like you, a friend, or simply however you feel like",
          weight: "medium",
        },
        {
          text: ". Play around with all the different options until you find your perfect combination. And when you're ready, ",
        },
        {
          text: "download your Nyota and use it as a profile picture wherever you want!",
          weight: "medium",
        },
      ],
      [
        {
          text: "If you share your Nyota on social media, tag me so I can see it. Since this is a free tool made with lots of love, ",
        },
        {
          text: "mentioning me or giving me credit means a lot to me",
          weight: "medium",
        },
        { text: "." },
      ],
    ],
  },
};

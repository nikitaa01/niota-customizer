import { signal } from "@preact/signals";
import { catalog, type CategoryId, type Selection } from "../../data/catalog";

export const categoryId = signal<CategoryId>("background");
export const hairGroupId = signal("hair");
export const selection = signal<Selection>({ ...catalog.defaults });

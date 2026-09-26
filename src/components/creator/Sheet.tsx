import type { ComponentChildren } from "preact";
import { catalog } from "../../data/catalog";
import { categoryId } from "./state";

type Props = {
  children: ComponentChildren;
};

export default function Sheet({ children }: Props) {
  const category = catalog.categories.find((item) => item.id === categoryId.value)!;

  return (
    <div
      class="relative z-[1] -mt-0.5 grid h-[424px] grid-cols-[1.05fr_0.95fr] gap-[22px] rounded-[28px] border-2 border-ink pt-4 pr-[26px] pb-[18px] pl-4"
      style={{ background: category.color }}
    >
      {children}
    </div>
  );
}

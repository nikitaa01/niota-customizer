import type { Messages } from "../data/messages";
import { cn } from "../lib/cn";
import CategoryTabs from "./creator/CategoryTabs";
import Download from "./creator/Download";
import OptionsFrame from "./creator/OptionsFrame";
import PreviewFrame from "./creator/PreviewFrame";

type Props = {
  messages: Messages;
};

export default function Creator({ messages }: Props) {
  return (
    <div>
      <div
        class={cn(
          "relative grid grid-cols-[1fr_repeat(4,108px)] grid-rows-[64px_1fr]",
          "max-md:grid-cols-[1fr_repeat(1,72px)] max-md:grid-rows-[1fr_repeat(4,auto)] max-md:[grid-template-areas:'preview_preview'_'options_category1'_'options_category2'_'options_category3'_'options_category4']",
        )}
      >
        <PreviewFrame />
        <CategoryTabs messages={messages} />
        <OptionsFrame messages={messages} />
      </div>
      <Download messages={messages} />
    </div>
  );
}

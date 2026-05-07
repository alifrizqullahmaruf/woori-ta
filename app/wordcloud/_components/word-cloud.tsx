import type { WordCloudEntry } from "./data";

type WordCloudProps = {
  words: ReadonlyArray<WordCloudEntry>;
};

const SIZE_MAP: Record<WordCloudEntry["weight"], string> = {
  1: "text-[11px]",
  2: "text-[13px]",
  3: "text-[16px]",
  4: "text-[22px] font-bold",
  5: "text-[28px] font-extrabold",
};

const COLOR_MAP: Record<WordCloudEntry["sentiment"], string> = {
  positive: "text-primary-800",
  negative: "text-accent-red",
  neutral:  "text-gray-w600",
};

export function WordCloud({ words }: WordCloudProps) {
  return (
    <div className="flex min-h-[120px] flex-wrap items-center justify-center gap-x-3 gap-y-2 py-2">
      {words.map((word) => (
        <span
          key={word.text}
          className={`leading-tight ${SIZE_MAP[word.weight]} ${COLOR_MAP[word.sentiment]}`}
        >
          {word.text}
        </span>
      ))}
    </div>
  );
}

import rawWordcloud from "@/dataset/wordcloud.json";

export type WordCloudEntry = {
  text: string;
  weight: 1 | 2 | 3 | 4 | 5;
  sentiment: "positive" | "negative" | "neutral";
};

export type WordCloudStockData = {
  ticker: string;
  words: ReadonlyArray<WordCloudEntry>;
};

export const WORDCLOUD_DATA = rawWordcloud as ReadonlyArray<WordCloudStockData>;

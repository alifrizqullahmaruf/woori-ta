import rawStocks   from "@/dataset/stocks.json";
import rawTrending from "@/dataset/trending.json";

export type PlatformMention = {
  icon: string;
  label: string;
  count: number;
};

export type BarchartStockDetail = {
  ticker: string;
  logo: string;
  rank: 1 | 2 | 3;
  mentionCount: number;
  priceChange: { value: number; direction: "up" | "down" };
  platformMentions: ReadonlyArray<PlatformMention>;
  unusualSpike: string | null;
  sentiment: { positive: number; negative: number; neutral: number };
  credibility: { verified: number; unverified: number };
  description: string;
  tags: readonly string[];
};

export type BarchartTrendingStock = {
  rank: number;
  name: string;
  logo: string;
  weeklyDelta: string;
  source: string;
  highlight: string;
  priceSparkline: readonly number[];
  mentionSparkline: readonly number[];
};

export const BARCHART_STOCKS   = rawStocks   as ReadonlyArray<BarchartStockDetail>;
export const BARCHART_TRENDING = rawTrending as ReadonlyArray<BarchartTrendingStock>;

"use client";

import { useState } from "react";
import { BaseDetailCard } from "../../_components/stock-detail/base-detail-card";
import { StockSelector } from "../../_components/stock-detail/stock-selector";
import { BARCHART_STOCKS } from "../../barchart/_components/data";
import { WORDCLOUD_DATA } from "./data";
import { WordCloud } from "./word-cloud";

export function WordcloudHottestInteractive() {
  const [selectedTicker, setSelectedTicker] = useState("NVDA");
  const active    = BARCHART_STOCKS.find((s) => s.ticker === selectedTicker)!;
  const cloudData = WORDCLOUD_DATA.find((d) => d.ticker === selectedTicker)!;

  return (
    <>
      <StockSelector stocks={BARCHART_STOCKS} selectedTicker={selectedTicker} onChange={setSelectedTicker} />
      <div className="px-6">
        <BaseDetailCard
          stock={active}
          sentimentSlot={<WordCloud words={cloudData.words} />}
        />
      </div>
    </>
  );
}

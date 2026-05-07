"use client";

import { useState } from "react";
import { BaseDetailCard } from "../../_components/stock-detail/base-detail-card";
import { StockSelector } from "../../_components/stock-detail/stock-selector";
import { BARCHART_STOCKS } from "../../barchart/_components/data";
import { SentimentPieChart } from "./sentiment-pie-chart";

export function PieHottestInteractive() {
  const [selectedTicker, setSelectedTicker] = useState("NVDA");
  const active = BARCHART_STOCKS.find((s) => s.ticker === selectedTicker)!;

  return (
    <>
      <StockSelector stocks={BARCHART_STOCKS} selectedTicker={selectedTicker} onChange={setSelectedTicker} />
      <div className="px-6">
        <BaseDetailCard
          stock={active}
          sentimentSlot={
            <SentimentPieChart
              positive={active.sentiment.positive}
              negative={active.sentiment.negative}
              neutral={active.sentiment.neutral}
            />
          }
        />
      </div>
    </>
  );
}

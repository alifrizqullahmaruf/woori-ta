"use client";

import Image from "next/image";
import { useState } from "react";
import { BARCHART_STOCKS } from "../../barchart/_components/data";
import { StockSelector } from "../stock-detail/stock-selector";

export function HottestStockInteractive() {
  const [selectedTicker, setSelectedTicker] = useState<string>("NVDA");
  const active = BARCHART_STOCKS.find((s) => s.ticker === selectedTicker)!;

  return (
    <>
      <StockSelector
        stocks={BARCHART_STOCKS}
        selectedTicker={selectedTicker}
        onChange={setSelectedTicker}
      />

      {/* Description card */}
      <div className="px-6">
        <div className="rounded-[20px] bg-primary-100/30 px-5 pt-7 pb-9 text-center">
          <h3 className="typo-base mb-[3px] text-gray-w800">
            It was the hottest thing on social media for the past 5 days.
          </h3>

          <strong className="font-numbers typo-xlarge mb-[9px] block font-black text-black">
            Mentioned {active.mentionCount.toLocaleString()} times!
          </strong>

          <ul className="mb-[21px] flex items-center justify-center gap-[15px]">
            {active.platformMentions.map((p) => (
              <li key={p.label} className="flex items-center gap-[3px]">
                <Image
                  src={p.icon}
                  alt={p.label}
                  width={16}
                  height={16}
                  className="size-4 object-contain"
                />
                <span className="typo-micro">{p.count}</span>
              </li>
            ))}
          </ul>

          <p className="typo-tiny mb-[18px] text-gray-w700">
            {active.description}
          </p>

          <ul className="flex flex-wrap items-center justify-center gap-[3px]">
            {active.tags.map((tag) => (
              <li
                key={tag}
                className="typo-tiny w-max rounded-[30px] bg-primary-650/20 px-1.5 py-px text-gray-w700"
              >
                {tag.length > 10 ? `${tag.slice(0, 10)}…` : tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

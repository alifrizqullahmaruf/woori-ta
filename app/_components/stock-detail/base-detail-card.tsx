"use client";

import Image from "next/image";
import { useState } from "react";
import { CREDIBILITY_MODAL, InfoModal, SENTIMENT_MODAL, type InfoModalContent } from "../info-modal";
import type { BarchartStockDetail } from "../../barchart/_components/data";
import { MentionBar } from "./mention-bar";
import { QuestionBtn } from "./question-btn";
import { SegmentedBar } from "./segmented-bar";

type BaseDetailCardProps = {
  stock: BarchartStockDetail;
  sentimentSlot: React.ReactNode;
};

export function BaseDetailCard({ stock, sentimentSlot }: BaseDetailCardProps) {
  const [modal, setModal] = useState<InfoModalContent | null>(null);
  const maxMention = Math.max(...stock.platformMentions.map((p) => p.count));

  return (
    <div className="rounded-[20px] bg-primary-100/30 px-5 pt-6 pb-7">
      {/* Mention count + platform bars */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="typo-small text-gray-w700">Total mentions · last 5 days</p>
          <div className="mt-1 flex items-center gap-2">
            <strong className="font-numbers text-[2rem] font-black leading-none text-gray-w900">
              {stock.mentionCount.toLocaleString()}
            </strong>
            <span className={`typo-micro flex items-center gap-0.5 rounded-md px-2 py-0.5 font-semibold text-white ${
              stock.priceChange.direction === "down" ? "bg-accent-red" : "bg-primary-800"
            }`}>
              Price {stock.priceChange.direction === "down" ? "↓" : "↑"} {stock.priceChange.value}%
            </span>
          </div>
        </div>
        <div className="flex min-w-40 flex-col gap-2">
          {stock.platformMentions.map((p) => (
            <div key={p.label} className="flex items-center gap-2">
              <Image src={p.icon} alt={p.label} width={16} height={16} className="size-4 shrink-0 object-contain" />
              <MentionBar count={p.count} max={maxMention} />
              <span className="typo-micro w-8 shrink-0 text-right font-numbers text-gray-w700">{p.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Unusual spike */}
      {stock.unusualSpike && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-warning-600/40 bg-warning-600/10 px-3 py-2">
          <span className="text-warning-700">⚠</span>
          <p className="typo-tiny text-gray-w800">
            <span className="font-semibold text-warning-700">Unusual spike!</span>{" "}
            {stock.unusualSpike}
          </p>
        </div>
      )}

      {/* Sentiment — slot passed by consumer */}
      <div className="mt-5">
        <p className="typo-small mb-2 flex items-center gap-1.5 font-medium text-gray-w900">
          Sentiment Score
          <QuestionBtn onClick={() => setModal(SENTIMENT_MODAL)} />
        </p>
        {sentimentSlot}
      </div>

      {/* Source Credibility — always the same */}
      <div className="mt-4">
        <p className="typo-small mb-2 flex items-center gap-1.5 font-medium text-gray-w900">
          Source Credibility
          <QuestionBtn onClick={() => setModal(CREDIBILITY_MODAL)} />
        </p>
        <SegmentedBar
          segments={[
            { pct: stock.credibility.verified,   color: "#00b8d4", label: "Verified" },
            { pct: stock.credibility.unverified, color: "#fba52d", label: "Unverified" },
          ]}
        />
      </div>

      {/* Description */}
      <p className="typo-tiny mt-5 text-center leading-relaxed text-gray-w700">
        {stock.description}
      </p>

      {/* Tags */}
      <ul className="mt-4 flex flex-wrap justify-center gap-[3px]">
        {stock.tags.map((tag) => (
          <li key={tag} className="typo-tiny w-max rounded-[30px] bg-primary-650/20 px-1.5 py-px text-gray-w700">
            {tag.length > 10 ? `${tag.slice(0, 10)}…` : tag}
          </li>
        ))}
      </ul>

      {modal && <InfoModal content={modal} onClose={() => setModal(null)} />}
    </div>
  );
}

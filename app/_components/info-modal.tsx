"use client";

import { useEffect } from "react";

export type InfoModalContent = {
  title: string;
  intro: string;
  bullets: Array<{ color: string; text: string }>;
  warning: string;
};

export const SENTIMENT_MODAL: InfoModalContent = {
  title: "What is Sentiment Score?",
  intro:
    "Sentiment Score shows how people feel about this stock based on social media posts. Each mention is classified by AI into one of three categories:",
  bullets: [
    {
      color: "#60C864",
      text: "Positive — mentions showing optimism, bullish outlook, or good news about the stock.",
    },
    {
      color: "#e34850",
      text: "Negative — mentions showing concern, bearish views, or criticism about the stock.",
    },
    {
      color: "#b2b3b9",
      text: "Neutral — informational mentions with no clear positive or negative leaning.",
    },
  ],
  warning:
    "High positive sentiment does not guarantee a price increase. Always cross-check with other signals before making investment decisions.",
};

export const CREDIBILITY_MODAL: InfoModalContent = {
  title: "What is Source Credibility?",
  intro:
    "Source Credibility shows how trustworthy the accounts behind the mentions are. A higher proportion of verified sources means the buzz is more likely to be organic.",
  bullets: [
    {
      color: "#60C864",
      text: "Verified — posts from accounts with a consistent activity history, sufficient follower count, and no signs of automated behavior.",
    },
    {
      color: "#e34850",
      text: "Unverified — posts from new, low-activity, or anonymous accounts that cannot be confirmed as independent sources.",
    },
  ],
  warning:
    "A high proportion of unverified sources may indicate coordinated activity or artificial buzz. Treat the sentiment data with extra caution.",
};

type InfoModalProps = {
  content: InfoModalContent;
  onClose: () => void;
};

export function InfoModal({ content, onClose }: InfoModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div className="relative w-full max-w-[720px] rounded-t-3xl bg-white px-6 pt-6 pb-10 shadow-2xl">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 flex size-7 items-center justify-center rounded-full text-gray-w600 hover:bg-gray-100"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="typo-large mb-4 font-bold text-gray-w900 pr-8">
          {content.title}
        </h2>

        {/* Intro */}
        <p className="typo-small mb-4 leading-relaxed text-gray-w800">
          {content.intro}
        </p>

        {/* Bullets */}
        <ul className="mb-5 flex flex-col gap-2">
          {content.bullets.map((b, i) => (
            <li key={i} className="typo-small flex gap-2 leading-relaxed text-gray-w800">
              <span
                className="mt-1 inline-block size-3 shrink-0 rounded-full"
                style={{ backgroundColor: b.color }}
              />
              <span>{b.text}</span>
            </li>
          ))}
        </ul>

        {/* Warning */}
        <div className="mb-6 flex gap-2 rounded-xl bg-gray-100 px-4 py-3">
          <span className="shrink-0 text-gray-w600">⚠</span>
          <p className="typo-tiny leading-relaxed text-gray-w700">
            {content.warning}
          </p>
        </div>

        {/* Confirm button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-2xl bg-primary-800 py-4 font-semibold text-white typo-base transition-opacity hover:opacity-90"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

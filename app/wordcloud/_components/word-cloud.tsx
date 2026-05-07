"use client";

import { useEffect, useRef, useState } from "react";
import cloud from "d3-cloud";
import type { WordCloudEntry } from "./data";

type WordCloudProps = {
  words: ReadonlyArray<WordCloudEntry>;
};

const WEIGHT_SIZE: Record<WordCloudEntry["weight"], number> = {
  1: 11,
  2: 14,
  3: 18,
  4: 24,
  5: 32,
};

const COLOR_MAP: Record<WordCloudEntry["sentiment"], string> = {
  positive: "#2589f4",
  negative: "#e34850",
  neutral:  "#686e75",
};

type PlacedWord = {
  text: string;
  size: number;
  color: string;
  x: number;
  y: number;
  rotate: number;
  weight: number;
};

export function WordCloud({ words }: WordCloudProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [placed, setPlaced]   = useState<PlacedWord[]>([]);
  const [dims, setDims]       = useState({ w: 320, h: 220 });

  useEffect(() => {
    if (!containerRef.current) return;
    const w = containerRef.current.offsetWidth  || 320;
    const h = containerRef.current.offsetHeight || 220;
    setDims({ w, h });

    const input: Array<{
      text: string; size: number; color: string; weight: number;
      x?: number; y?: number; rotate?: number;
    }> = words.map((word) => ({
      text:   word.text,
      size:   WEIGHT_SIZE[word.weight],
      color:  COLOR_MAP[word.sentiment],
      weight: word.weight,
    }));

    cloud<(typeof input)[number]>()
      .size([w, h])
      .words(input)
      .padding(5)
      .rotate(0)
      .font("Lato, sans-serif")
      .fontWeight((d) => (d.weight! >= 4 ? "900" : d.weight! >= 3 ? "700" : "400"))
      .fontSize((d) => d.size!)
      .on("end", (output) => {
        setPlaced(
          output.map((d) => ({
            text:   d.text!,
            size:   d.size!,
            color:  d.color as string,
            x:      d.x!,
            y:      d.y!,
            rotate: d.rotate!,
            weight: d.weight as number,
          }))
        );
      })
      .start();
  }, [words]);

  return (
    <div ref={containerRef} className="relative h-55 w-full overflow-hidden">
      <svg
        width={dims.w}
        height={dims.h}
        className="absolute inset-0"
      >
        <g transform={`translate(${dims.w / 2},${dims.h / 2})`}>
          {placed.map((w) => (
            <text
              key={w.text}
              textAnchor="middle"
              transform={`translate(${w.x},${w.y}) rotate(${w.rotate})`}
              fontSize={w.size}
              fontFamily="Lato, sans-serif"
              fontWeight={w.weight >= 4 ? 900 : w.weight >= 3 ? 700 : 400}
              fill={w.color}
            >
              {w.text}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
}

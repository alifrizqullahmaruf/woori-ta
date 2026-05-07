"use client";

import { ArcElement, Chart as ChartJS, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

type SentimentPieChartProps = {
  positive: number;
  negative: number;
  neutral: number;
};

const SEGMENTS = [
  { label: "Positive", color: "#2589f4" },
  { label: "Negative", color: "#e34850" },
  { label: "Neutral",  color: "#b2b3b9" },
];

export function SentimentPieChart({ positive, negative, neutral }: SentimentPieChartProps) {
  const data = {
    datasets: [
      {
        data: [positive, negative, neutral],
        backgroundColor: SEGMENTS.map((s) => s.color),
        borderWidth: 0,
      },
    ],
  };

  const options: import("chart.js").ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="flex items-center gap-5">
      <div className="size-[120px] shrink-0">
        <Pie data={data} options={options} />
      </div>
      <div className="flex flex-col gap-2">
        {SEGMENTS.map((s, i) => {
          const value = [positive, negative, neutral][i];
          return (
            <span
              key={s.label}
              className="typo-small flex items-center gap-2 text-gray-w700"
            >
              <span
                className="inline-block size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              {s.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

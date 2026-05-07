"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LineElement,
  LinearScale,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

type SparklineChartProps = {
  priceData: readonly number[];
  mentionData: readonly number[];
};

export function SparklineChart({ priceData, mentionData }: SparklineChartProps) {
  const labels = priceData.map(() => "");

  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: priceData,
        borderColor: "#2589f4",
        borderWidth: 1.5,
        pointRadius: 0,
        tension: 0.4,
        fill: false,
        borderDash: [],
        yAxisID: "yPrice",
      },
      {
        label: "Mentions",
        data: mentionData,
        borderColor: "#00b8d4",
        borderWidth: 1.5,
        pointRadius: 0,
        tension: 0.4,
        fill: false,
        borderDash: [4, 3],
        yAxisID: "yMentions",
      },
    ],
  };

  const options: import("chart.js").ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: { display: false },
      yPrice: {
        display: false,
        position: "left",
      },
      yMentions: {
        display: false,
        position: "right",
      },
    },
    elements: {
      line: { capBezierPoints: false },
    },
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="h-[56px] w-[120px]">
        <Line data={data} options={options} />
      </div>
      <div className="flex items-center justify-center gap-2">
        <span className="typo-micro flex items-center gap-1 text-gray-w600">
          <span className="inline-block h-px w-4 bg-primary-800" />
          Price
        </span>
        <span className="typo-micro flex items-center gap-1 text-gray-w600">
          <span
            className="inline-block h-px w-4"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, #00b8d4 0, #00b8d4 4px, transparent 4px, transparent 7px)",
            }}
          />
          Mentions
        </span>
      </div>
    </div>
  );
}

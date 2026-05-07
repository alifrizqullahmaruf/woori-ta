import Image from "next/image";
import { ICONS } from "../../_components/screen-utama/data";
import { BARCHART_TRENDING } from "./data";
import { SparklineChart } from "./sparkline-chart";

export function TrendingBarchartSection() {
  return (
    <section className="px-6">
      <header className="mb-1.5 flex items-center justify-between">
        <h2 className="typo-large flex items-center gap-1.5 font-bold">
          <span>The stock price soared as soon as it launched</span>
          <Image
            src={ICONS.trendingUp}
            alt=""
            width={20}
            height={20}
            unoptimized
            className="size-5 shrink-0"
          />
        </h2>
        <Image
          src={ICONS.aiBadge}
          alt="AI"
          width={21}
          height={21}
          className="size-[21px] shrink-0"
        />
      </header>
      <p className="typo-base text-gray-w700">
        Check out examples where buzz translated into actual stock prices.
      </p>

      <ul className="mt-[30px] flex flex-col gap-9">
        {BARCHART_TRENDING.map((stock) => (
          <li key={stock.rank}>
            {/* Row 1: rank + logo + name + delta badge */}
            <div className="mb-[9px] flex items-center">
              <span className="typo-small mr-3 w-3 shrink-0 font-medium text-gray-w700">
                {stock.rank}
              </span>
              <Image
                src={stock.logo}
                alt=""
                width={36}
                height={36}
                className="mr-3 size-9 shrink-0 rounded-full object-contain"
              />
              <h3 className="typo-small flex-1 font-semibold text-gray-w900">
                {stock.name}
              </h3>
              <span className="font-numbers typo-micro ml-4 shrink-0 font-bold bg-accent-cyan/10 font-bold text-accent-cyan p-1 rounded-full">
                {stock.weeklyDelta} over the past week
              </span>
            </div>

            {/* Row 2: description text + sparkline chart */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-0.5">
                <p className="typo-small font-medium text-gray-w800 line-clamp-1">
                  Mentions have increased! ({stock.source})
                </p>
                <p className="typo-small text-gray-w600 line-clamp-1">
                  {stock.highlight}
                </p>
              </div>
              <div className="shrink-0">
                <SparklineChart
                  priceData={stock.priceSparkline}
                  mentionData={stock.mentionSparkline}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

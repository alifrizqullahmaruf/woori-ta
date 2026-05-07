import Image from "next/image";
import { ICONS, TRENDING_STOCKS } from "./data";

export function TrendingStocksSection() {
  return (
    <section className="px-6">
      <header className="mb-1.5 flex items-center justify-between">
        <h2 className="typo-large flex items-center gap-1.5 font-bold">
          <span>Stocks that soared as soon as they blew up</span>
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
        See the cases where buzz actually drove stock prices up.
      </p>

      <ul className="mt-[30px] flex flex-col gap-9">
        {TRENDING_STOCKS.map((stock) => (
          <li key={stock.rank}>
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
              <span className="font-numbers typo-micro ml-auto rounded-2xl bg-accent-cyan/10 font-bold text-accent-cyan p-1">
                {stock.weeklyDelta} over the past week 
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="typo-small font-medium text-gray-w800 line-clamp-1">
                Mentions are up! ({stock.source})
              </p>
              <p className="typo-small text-gray-w600 line-clamp-1">
                {stock.highlight}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

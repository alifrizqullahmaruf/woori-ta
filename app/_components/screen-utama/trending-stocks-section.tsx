import Image from "next/image";
import { ICONS, TRENDING_STOCKS } from "./data";

export function TrendingStocksSection() {
  return (
    <section className="px-6 pt-10">
      <header className="mb-1.5 flex items-center justify-between gap-3">
        <h2 className="text-typo-large font-bold leading-7">뜨자마자 주가도 쑥</h2>
        <Image
          src={ICONS.chevronRight}
          alt=""
          width={21}
          height={21}
          className="size-[21px] shrink-0"
        />
      </header>
      <p className="text-typo-small text-gray-700">
        화제성이 실제 주가로 이어진 사례들, 확인해보세요.
      </p>

      <ul className="mt-6 flex flex-col gap-7">
        {TRENDING_STOCKS.map((stock) => (
          <li key={stock.rank} className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="w-3 text-typo-small font-medium text-gray-700">
                {stock.rank}
              </span>
              <Image
                src={stock.logo}
                alt=""
                width={36}
                height={36}
                className="size-9 shrink-0 rounded-full object-contain"
              />
              <h3 className="flex-1 text-typo-small font-semibold">
                {stock.nameKo}
              </h3>
              <span className="shrink-0 rounded-md bg-accent-cyan/10 px-2 py-1 text-typo-micro text-accent-cyan">
                지난 1주일간 {stock.weeklyDelta}
              </span>
            </div>
            <div className="ml-6 pl-3 text-typo-small text-gray-700">
              <p>언급량이 증가했어요! ({stock.source})</p>
              <p className="text-gray-900">{stock.highlight}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

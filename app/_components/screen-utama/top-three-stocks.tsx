import Image from "next/image";
import { TOP_THREE } from "./data";

export function TopThreeStocks() {
  const ordered = [
    TOP_THREE[0],
    TOP_THREE[1],
    TOP_THREE[2],
  ];

  return (
    <section className="px-10 pb-6">
      <ul className="flex items-end justify-center gap-3">
        {ordered.map((stock) => {
          const isWinner = stock.rank === 2;
          return (
            <li
              key={stock.ticker}
              className={`relative flex flex-1 flex-col items-center rounded-2xl bg-gray-100 ${
                isWinner ? "py-4" : "py-3"
              }`}
            >
              <span className="absolute left-3 top-2 text-typo-tiny font-semibold text-gray-700">
                {stock.rank}
              </span>
              <div
                className={`flex items-center justify-center ${
                  isWinner ? "size-[76px]" : "size-[64px]"
                }`}
              >
                <Image
                  src={stock.logo}
                  alt={stock.ticker}
                  width={76}
                  height={76}
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="mt-2 text-typo-small font-semibold">
                {stock.ticker}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

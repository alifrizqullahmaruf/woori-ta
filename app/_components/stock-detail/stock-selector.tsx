import Image from "next/image";

export type SelectableStock = {
  ticker: string;
  logo: string;
  rank: 1 | 2 | 3;
};

type StockSelectorProps = {
  stocks: ReadonlyArray<SelectableStock>;
  selectedTicker: string;
  onChange: (ticker: string) => void;
};

export function StockSelector({ stocks, selectedTicker, onChange }: StockSelectorProps) {
  return (
    <ul className="mx-auto mt-7 mb-[22px] flex w-[300px] items-center justify-center gap-2 sm:w-[400px] sm:gap-[9px]">
      {stocks.map((stock) => {
        const isSelected = stock.ticker === selectedTicker;
        return (
          <li key={stock.ticker} className="w-1/3 max-w-[140px]">
            <button
              type="button"
              onClick={() => onChange(stock.ticker)}
              className={`flex w-full cursor-pointer select-none flex-col gap-1 rounded-xl border-2 bg-primary-50 px-2 py-2 transition-all duration-300 ease-in-out will-change-transform sm:gap-[9px] sm:px-3 sm:py-[9px] ${
                isSelected
                  ? "z-10 scale-110 border-primary-800 bg-primary-100/30"
                  : "z-0 scale-100 border-transparent hover:scale-105"
              }`}
              style={{ boxShadow: "3px 4px 15px 0px #85A5D940" }}
            >
              <span className="typo-small text-left font-bold text-primary-850">
                {stock.rank}
              </span>
              <div className="mx-auto flex size-14 items-center justify-center sm:size-[76px]">
                <Image
                  src={stock.logo}
                  alt={stock.ticker}
                  width={76}
                  height={76}
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="typo-small truncate pt-2 text-center leading-tight">
                {stock.ticker}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

import { FooterDisclaimer } from "./screen-utama/footer-disclaimer";
import { HeaderByLine } from "./screen-utama/header-by-line";
import { HottestStockHeader } from "./screen-utama/hottest-stock-section";

type PageShellProps = {
  hottest: React.ReactNode;
  trending: React.ReactNode;
  themes: React.ReactNode;
  issues: React.ReactNode;
};

export function PageShell({ hottest, trending, themes, issues }: PageShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <HeaderByLine />
      <main className="flex flex-col gap-[54px] pt-4 pb-18">
        <div>
          <HottestStockHeader />
          {hottest}
        </div>
        {trending}
        {themes}
        {issues}
      </main>
      <FooterDisclaimer />
    </div>
  );
}

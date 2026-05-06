import { FooterDisclaimer } from "./_components/screen-utama/footer-disclaimer";
import { HeaderByLine } from "./_components/screen-utama/header-by-line";
import { HottestStockSection } from "./_components/screen-utama/hottest-stock-section";
import { IssuesSection } from "./_components/screen-utama/issues-section";
import { ThemesSection } from "./_components/screen-utama/themes-section";
import { TopThreeStocks } from "./_components/screen-utama/top-three-stocks";
import { TrendingStocksSection } from "./_components/screen-utama/trending-stocks-section";

export default function Home() {
  return (
    <main className="mx-auto flex flex-1 flex-col bg-white md:max-w-[720px]">
      <HeaderByLine />
      <TopThreeStocks />
      <article className="flex flex-col">
        <HottestStockSection />
        <TrendingStocksSection />
        <ThemesSection />
        <IssuesSection />
      </article>
      <FooterDisclaimer />
    </main>
  );
}

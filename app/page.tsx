import { PageShell } from "./_components/page-shell";
import { HottestStockInteractive } from "./_components/screen-utama/hottest-stock-interactive";
import { IssuesSection } from "./_components/screen-utama/issues-section";
import { ThemesSection } from "./_components/screen-utama/themes-section";
import { TrendingStocksSection } from "./_components/screen-utama/trending-stocks-section";

export default function Home() {
  return (
    <PageShell
      hottest={<HottestStockInteractive />}
      trending={<TrendingStocksSection />}
      themes={<ThemesSection />}
      issues={<IssuesSection />}
    />
  );
}

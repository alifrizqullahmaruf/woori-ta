import { PageShell } from "../_components/page-shell";
import { IssuesSection } from "../_components/screen-utama/issues-section";
import { ThemesSection } from "../_components/screen-utama/themes-section";
import { BarchartHottestInteractive } from "./_components/hottest-detail-barchart";
import { TrendingBarchartSection } from "./_components/trending-barchart-section";

export default function BarchartPage() {
  return (
    <PageShell
      hottest={<BarchartHottestInteractive />}
      trending={<TrendingBarchartSection />}
      themes={<ThemesSection />}
      issues={<IssuesSection />}
    />
  );
}

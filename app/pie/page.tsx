import { PageShell } from "../_components/page-shell";
import { IssuesSection } from "../_components/screen-utama/issues-section";
import { ThemesSection } from "../_components/screen-utama/themes-section";
import { TrendingBarchartSection } from "../barchart/_components/trending-barchart-section";
import { PieHottestInteractive } from "./_components/hottest-detail-pie";

export default function PiePage() {
  return (
    <PageShell
      hottest={<PieHottestInteractive />}
      trending={<TrendingBarchartSection />}
      themes={<ThemesSection />}
      issues={<IssuesSection />}
    />
  );
}

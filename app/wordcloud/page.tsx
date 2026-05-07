import { PageShell } from "../_components/page-shell";
import { IssuesSection } from "../_components/screen-utama/issues-section";
import { ThemesSection } from "../_components/screen-utama/themes-section";
import { TrendingBarchartSection } from "../barchart/_components/trending-barchart-section";
import { WordcloudHottestInteractive } from "./_components/hottest-detail-wordcloud";

export default function WordcloudPage() {
  return (
    <PageShell
      hottest={<WordcloudHottestInteractive />}
      trending={<TrendingBarchartSection />}
      themes={<ThemesSection />}
      issues={<IssuesSection />}
    />
  );
}

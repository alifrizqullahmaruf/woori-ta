import rawDisclaimers from "@/dataset/disclaimers.json";
import rawIssues      from "@/dataset/issues.json";
import rawThemes      from "@/dataset/themes.json";
import rawTrending    from "@/dataset/trending.json";

// ─── Types ────────────────────────────────────────────────────────────────────

export type TrendingStock = {
  rank: number;
  name: string;
  weeklyDelta: string;
  source: string;
  highlight: string;
  logo: string;
};

export type Theme = {
  name: string;
  delta: string;
  icon: string;
};

export type Issue = {
  title: string;
  body: string;
  hero: string;
};

// ─── Data (imported from dataset/) ───────────────────────────────────────────

export const TRENDING_STOCKS  = rawTrending    as ReadonlyArray<TrendingStock>;
export const THEMES           = rawThemes      as ReadonlyArray<Theme>;
export const ISSUES           = rawIssues      as ReadonlyArray<Issue>;
export const DISCLAIMER_LINES = rawDisclaimers as readonly string[];

// ─── Static asset paths (not data — kept here intentionally) ─────────────────

export const BRAND = {
  headerLogo: "/images/screen-utama/brand/advisor-loren.svg",
  footerLogo: "/images/screen-utama/brand/advisor-loren-footer.svg",
};

export const ICONS = {
  aiBadge:      "/images/screen-utama/icons/ai-badge.png",
  trendingUp:   "/images/screen-utama/icons/section-icon.svg",
  externalLink: "/images/screen-utama/icons/external-link.svg",
};

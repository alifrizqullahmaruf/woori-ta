---
title: "Build Woori_ta Screen_Utama landing page"
type: feat
status: completed
date: 2026-05-06
---

# Build Woori_ta Screen_Utama landing page

Replace the Next.js boilerplate at `app/page.tsx` with a long mobile-first landing page that mirrors the Figma design **Woori_ta › Screen_Utama** (fileKey `e2zvlbix7y9DKbgA7JcOTV`, nodeId `1:3`). The page is the entry point for Advisor Loren's AI investment insight service for Woori Bank customers and is composed of six vertically-stacked content sections plus a Korean-language disclaimer footer.

## Overview

The Figma frame is **720 × 3357.5 px** — meant to be viewed in a phone-style narrow column. Per requirement, the outer wrapper uses `mx-auto md:max-w-[720px]` so the layout stays full-width on mobile and centers as a 720 px column on tablet+ screens.

Stack confirmed from `package.json`:

- **Next.js 16.2.4** (App Router, Server Components by default — see `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`)
- **React 19.2.4**
- **Tailwind CSS v4** (CSS-first via `@import "tailwindcss"` and `@theme inline` in `app/globals.css`; **no `tailwind.config.*` file exists** and none should be added — Tailwind v4 derives tokens from CSS)
- **TypeScript 5** with `strict` mode and `@/*` path alias (`tsconfig.json:21`)
- Geist Sans/Mono already wired in `app/layout.tsx`

The page is **fully static** — no data fetching, no interactivity, no `'use client'`. It renders as a Server Component on the default route `/`.

## Problem Statement / Motivation

`app/page.tsx` currently ships the create-next-app boilerplate (Vercel deploy buttons, "Edit page.tsx", etc.). Designers have delivered the Screen_Utama mockup as the canonical home screen for the Woori-ta service. The boilerplate must be fully replaced — not extended — and the result must:

1. Match the Figma vertical rhythm and color tokens
2. Be readable in Korean (the design contains Hangul-heavy copy that Geist Latin alone will not render correctly)
3. Constrain to a **720 px max-width column** for tablet/desktop, full-bleed on mobile
4. Remain a Server Component so the static page ships near-zero JS
5. Set up the design-token foundation so future screens (Tesla detail page, Theme detail) reuse the same Tailwind classes

## Proposed Solution

Implement four things in order:

1. **Design tokens in `app/globals.css`** — register the full color palette and typography ramp inside Tailwind v4's `@theme` so utility classes like `bg-primary-100/30`, `bg-accent-cyan/10`, `text-typo-large`, etc. resolve natively.
2. **Asset acquisition** — call `mcp__figma__get_design_context` against node `1:3` to retrieve Figma asset URLs, download each into `public/images/screen-utama/`, then reference them via `next/image`.
3. **Section components** — split the page into one component per Figma section under `app/_components/screen-utama/`. Each component is a Server Component that takes typed props (or inlines the data) and renders a single Figma section verbatim.
4. **Page composition** — `app/page.tsx` becomes a thin orchestrator that imports and stacks the section components inside the `mx-auto md:max-w-[720px]` wrapper. `app/layout.tsx` is updated for Korean rendering and proper metadata.

### Why this shape (decisions captured from refinement)

- **Component split per section** — keeps `page.tsx` scannable; each section is independently editable.
- **Download Figma assets to `public/`** — the design has many illustrations (stock logos, news photos, theme icons). Static imports through `next/image` give automatic blur placeholders and `width`/`height` (Next 16 image docs at `node_modules/next/dist/docs/01-app/01-getting-started/12-images.md`).
- **Full design tokens via `@theme`** — `bg-primary-100`, `bg-accent-cyan/10`, `text-typo-large` show up across many Figma frames, so registering them once in CSS pays off immediately.
- **Array `.map()` per list** — the three trending stocks, five themes, and three news cards are repeating templates; `.map()` from a typed `const` array keeps the markup compact and the copy editable.

### Critical Next.js 16 considerations (from local docs)

- `next/image`: required props are `src` and `alt`. For string `src` (public folder), `width`/`height` are required. For static imports, dimensions auto-derived. The `priority` prop is **deprecated** — use `preload` (boolean) instead.
- Static assets in `public/` are served at the root URL: `public/images/screen-utama/nvda.png` → `/images/screen-utama/nvda.png`.
- Metadata API: continue to export `Metadata` from `app/layout.tsx`; no `generateMetadata` needed (page is static).
- `next/font/google` unchanged; we keep Geist and add a Korean variable font (`Noto_Sans_KR` or `Pretendard`) — see Open Question #1.

## Technical Approach

### A. Design tokens — `app/globals.css`

Sources of truth: `.figma-color-system.png` (committed at repo root) and Figma frame names like `bg-primary-100/30`, `bg-accent-cyan/10`, `bg-border`, `typo-large`, `typo-small`, `typo-tiny`, `typo-micro`.

Add inside `@theme inline { ... }`:

```css
/* app/globals.css — additions */
@theme inline {
  /* existing */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);

  /* NEW: Primary blue ramp (read hex from .figma-color-system.png) */
  --color-primary-100: #e9f0ff;  /* TODO: confirm exact hex from screenshot */
  --color-primary-200: ...;
  --color-primary-300: ...;
  --color-primary-400: ...;
  --color-primary-500: ...;
  --color-primary-600: ...;
  --color-primary-700: ...;
  --color-primary-800: ...;
  --color-primary-900: ...;

  /* NEW: Neutral ramp */
  --color-gray-100: ...;
  --color-gray-200: ...;
  --color-gray-400: ...;
  --color-gray-600: ...;
  --color-gray-700: ...;
  --color-gray-800: ...;
  --color-gray-900: ...;

  /* NEW: Accents */
  --color-accent-cyan: ...;
  --color-accent-purple: ...;
  --color-accent-navy: ...;

  /* NEW: Status */
  --color-warning-300: ...;
  --color-warning-400: ...;
  --color-warning-500: ...;
  --color-warning-600: ...;
  --color-warning-700: ...;
  --color-red-100: ...;
  --color-error-100: ...;

  /* NEW: Typography ramp (derived from Figma text frame heights) */
  --text-typo-large: 1.25rem;       /* 28px line-height — H2 sections */
  --text-typo-large--line-height: 1.75rem;
  --text-typo-small: 1rem;           /* 24px — H3 / body paragraphs */
  --text-typo-small--line-height: 1.5rem;
  --text-typo-tiny: 0.875rem;        /* 20px — small body */
  --text-typo-tiny--line-height: 1.25rem;
  --text-typo-micro: 0.75rem;        /* 16px — disclaimer */
  --text-typo-micro--line-height: 1rem;

  /* NEW: Semantic color alias used in Figma frame "Footer [bg-border]" */
  --color-border: var(--color-gray-100);
}
```

> **Note for implementer:** the exact hex values must be eyeballed from `.figma-color-system.png` (or extracted with a color-picker). The placeholder `...` values above are markers; replace them before merging. Tailwind v4 generates `bg-primary-100`, `text-primary-500`, `bg-primary-100/30` (opacity), etc. automatically once the `--color-*` tokens are registered.

Also remove the `@media (prefers-color-scheme: dark)` block (or guard the page so dark mode does not invert the design — the Figma only specifies a light variant). See Open Question #2.

### B. Korean font setup — `app/layout.tsx`

Geist does not include Hangul glyphs. Add a Korean variable font alongside Geist:

```ts
// app/layout.tsx
import { Geist, Geist_Mono, Noto_Sans_KR } from "next/font/google";

const notoKR = Noto_Sans_KR({
  variable: "--font-noto-kr",
  subsets: ["latin"],     // KR subset is auto-included
  display: "swap",
});
```

Apply `${notoKR.variable}` on `<html>` next to `${geistSans.variable}`. Then in `@theme`:

```css
--font-sans: var(--font-noto-kr), var(--font-geist-sans), Arial, sans-serif;
```

Korean text falls back gracefully on Latin-only ranges. Also update metadata:

```ts
export const metadata: Metadata = {
  title: "Woori-ta — AI 투자 인사이트",
  description: "어드바이저로렌이 우리은행 고객에게 제공하는 AI 기반 투자 분석 서비스 (테스트)",
};
```

And replace `lang="en"` with `lang="ko"` since the dominant content language is Korean.

### C. Asset acquisition

Before writing components, run:

```ts
// research script — implementer runs once
mcp__figma__get_design_context({
  nodeId: "1:3",
  fileKey: "e2zvlbix7y9DKbgA7JcOTV",
  clientFrameworks: "react,nextjs",
  clientLanguages: "typescript",
});
```

The response includes a JSON map of asset download URLs (one per `<frame name="Image">` in the metadata). Download each into `public/images/screen-utama/` with descriptive names matching the section, e.g.:

```
public/images/screen-utama/
├── top-3/
│   ├── nvda.png            # frame 1:304 (rank 1)
│   ├── amd.png             # frame 1:296 (rank 2)
│   └── tsla.png            # frame 1:289 (rank 3)
├── trending-stocks/
│   ├── silicon-motion.png  # frame 1:57
│   ├── maxlinear.png       # frame 1:72
│   └── axt.png             # frame 1:87
├── themes/
│   ├── mz-platform.png     # frame 1:109
│   ├── crypto.png          # frame 1:155
│   ├── leisure.png         # frame 1:168
│   ├── quantum.png         # frame 1:179
│   └── cloud.png           # frame 1:221
├── news/
│   ├── oil-shock.jpg       # frame 1:243
│   ├── sp500-april.jpg     # frame 1:255
│   └── powell-warsh.jpg    # frame 1:267
├── icons/
│   ├── chevron-right.svg   # frame 1:43, 1:96, 1:235
│   └── external-link.svg   # frame 1:248, 1:260, 1:272
└── brand/
    └── advisor-loren.svg   # frame 1:7, 1:277
```

Reference via static import for automatic blur:

```tsx
import nvdaLogo from "@/public/images/screen-utama/top-3/nvda.png";
<Image src={nvdaLogo} alt="NVIDIA" placeholder="blur" />
```

If a Figma asset URL fails to download, fall back to a 1×1 transparent placeholder and flag in a TODO comment — do not block the page on missing assets.

### D. Component structure

```
app/
├── _components/
│   └── screen-utama/
│       ├── index.ts                   # barrel re-export
│       ├── header-by-line.tsx         # "by [Advisor Loren]" header (frame 1:276)
│       ├── top-three-stocks.tsx       # NVDA / AMD / TSLA podium (frame 1:282)
│       ├── hottest-stock-section.tsx  # "The hottest stock these days" (frame 1:17)
│       ├── trending-stocks-section.tsx # "뜨자마자 주가도 쑥" (frame 1:47)
│       ├── themes-section.tsx         # "몰려든 테마, 결과는 달랐을지도?" (frame 1:101)
│       ├── issues-section.tsx         # "오늘 투자자들, 이 이슈가 중심이에요" (frame 1:233)
│       ├── footer-disclaimer.tsx      # Korean legal text (frame 1:6)
│       └── data.ts                    # all hardcoded copy + numbers
├── globals.css                        # MODIFIED: tokens added
├── layout.tsx                         # MODIFIED: Noto Sans KR + metadata + lang="ko"
└── page.tsx                           # REWRITTEN: thin orchestrator
```

Why `app/_components/` (with underscore prefix) — Next.js App Router treats folders prefixed with `_` as **private folders** that are not routable. This keeps section components co-located with the page without creating accidental routes. Confirm convention in `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/` if unsure.

### E. Data shape — `app/_components/screen-utama/data.ts`

```ts
// app/_components/screen-utama/data.ts
import type { StaticImageData } from "next/image";
import nvda from "@/public/images/screen-utama/top-3/nvda.png";
// ... other imports

export const TOP_THREE: ReadonlyArray<{
  rank: 1 | 2 | 3;
  ticker: string;
  logo: StaticImageData;
}> = [
  { rank: 1, ticker: "NVDA", logo: nvda },
  { rank: 2, ticker: "AMD", logo: amd },
  { rank: 3, ticker: "TSLA", logo: tsla },
];

export const TRENDING_STOCKS: ReadonlyArray<{
  rank: number;
  nameKo: string;
  weeklyDelta: string;       // e.g. "+53.97%"
  source: string;            // "X 기준" / "Reddit·X 기준"
  highlight: string;         // "NAND 컨트롤러 강세로 급등"
  logo: StaticImageData;
}> = [
  { rank: 1, nameKo: "실리콘 모션 테크놀로지 ADR", weeklyDelta: "+53.97%", source: "X 기준", highlight: "NAND 컨트롤러 강세로 급등", logo: siliconMotion },
  { rank: 2, nameKo: "맥스리니어", weeklyDelta: "+51.25%", source: "X 기준", highlight: "실적 호조와 공매도 감소로 급등세", logo: maxlinear },
  { rank: 3, nameKo: "AXT", weeklyDelta: "+51.1%", source: "Reddit·X 기준", highlight: "AI 광학 산업 성장 기대감 급등", logo: axt },
];

export const THEMES: ReadonlyArray<{ nameKo: string; delta: string; icon: StaticImageData }> = [
  { nameKo: "MZ 소비 플랫폼", delta: "+8.2%", icon: mzPlatform },
  { nameKo: "암호화폐",       delta: "+8.1%", icon: crypto },
  { nameKo: "여가",           delta: "+7.5%", icon: leisure },
  { nameKo: "양자 컴퓨터",     delta: "+6%",   icon: quantum },
  { nameKo: "클라우드",       delta: "+5.8%", icon: cloud },
];

export const ISSUES: ReadonlyArray<{
  titleKo: string;
  bodyKo: string;
  hero: StaticImageData;
}> = [
  { titleKo: "중동 긴장 고조로 유가 100달러 돌파, 글로벌 증시 급락", bodyKo: "호르무즈 해협 봉쇄 우려로 WTI 원유가 배럴당 100달러를 돌파했습니다. 다우지수는 557포인트 급락하며 지정학적 리스크가 시장을 압박하고 있습니다.", hero: oilShock },
  { titleKo: "빅테크 실적 호조에 S&P 500, 4월 10.49% 급등…밸류에이션 부담은 '경고등'", bodyKo: "S&P 500이 4월 10.49% 상승하며 2020년 이후 최고 월간 성과를 기록했습니다. 1분기 실적 성장률 27.1% 달성했으나, 선행 PER 24배로 밸류에이션 부담이 커지고 있습니다.", hero: sp500April },
  { titleKo: "파월 퇴임·워시 지명 임박…매파 성향에 연말 금리 인상 가능성 부상", bodyKo: "제롬 파월 의장 임기 종료와 케빈 워시의 매파적 성향으로 통화정책 불확실성이 커지고 있습니다. 인플레이션 재가속 우려로 연말 금리 인상 가능성이 제기되고 있습니다.", hero: powellWarsh },
];

export const DISCLAIMER_LINES: readonly string[] = [
  "본 서비스는 주식회사 어드바이저로렌이 우리은행 고객을 위해 제공하는 것으로, 현재 위탁 테스트 단계에 있으므로 별도의 사전 고지 없이 서비스가 중단될 수 있습니다. 고객께서는 이와 같은 테스트 환경 및 잠재적인 위험성을 충분히 인지한 상태에서 서비스를 이용하시기 바랍니다.",
  "본 서비스는 금융 전문 생성형 AI '어드바이저로렌'이 제공하는 참고용 정보이며, 제공된 정보는 부정확하거나 최신 정보가 아닐 수 있습니다.",
  "투자 판단 및 그에 따른 최종 결정과 책임은 전적으로 고객 본인에게 있으며, 본 서비스는 어떠한 투자 권유도 포함하지 않습니다.",
];
```

Section components import from `data.ts` and `.map()` over the arrays.

### F. `app/page.tsx` — final shape

```tsx
// app/page.tsx
import { HeaderByLine } from "./_components/screen-utama/header-by-line";
import { TopThreeStocks } from "./_components/screen-utama/top-three-stocks";
import { HottestStockSection } from "./_components/screen-utama/hottest-stock-section";
import { TrendingStocksSection } from "./_components/screen-utama/trending-stocks-section";
import { ThemesSection } from "./_components/screen-utama/themes-section";
import { IssuesSection } from "./_components/screen-utama/issues-section";
import { FooterDisclaimer } from "./_components/screen-utama/footer-disclaimer";

export default function Home() {
  return (
    <main className="mx-auto md:max-w-[720px] bg-white">
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
```

Note: the existing `app/layout.tsx` body class is `min-h-full flex flex-col` — the `<main>` here naturally becomes the flex child; `mx-auto` centers it on viewports wider than 720 px.

### G. Section component skeleton (example)

```tsx
// app/_components/screen-utama/trending-stocks-section.tsx
import Image from "next/image";
import { TRENDING_STOCKS } from "./data";

export function TrendingStocksSection() {
  return (
    <section className="px-6 mt-[600px] /* TODO replace with proper spacing tokens */">
      <header className="mb-1.5 flex items-start justify-between">
        <h2 className="text-typo-large font-bold">뜨자마자 주가도 쑥</h2>
        {/* chevron icon */}
      </header>
      <p className="text-typo-small text-gray-600">
        화제성이 실제 주가로 이어진 사례들, 확인해보세요.
      </p>
      <ul className="mt-[30px] flex flex-col gap-9">
        {TRENDING_STOCKS.map((stock) => (
          <li key={stock.rank} className="flex flex-col gap-[9px]">
            <div className="flex items-center gap-4">
              <span className="text-typo-small font-medium">{stock.rank}</span>
              <Image src={stock.logo} alt="" width={36} height={36} className="shrink-0" />
              <h3 className="text-typo-small">{stock.nameKo}</h3>
              <span className="ml-auto rounded bg-accent-cyan/10 px-2.5 py-1 text-typo-micro">
                지난 1주일간 {stock.weeklyDelta}
              </span>
            </div>
            <p className="text-typo-small text-gray-600">언급량이 증가했어요! ({stock.source})</p>
            <p className="text-typo-small">{stock.highlight}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

Apply the same pattern to all six sections, mapping pixel measurements from `mcp__figma__get_metadata` (already pulled — see `frame id="1:47"` etc.) to Tailwind utilities. **Do not re-type Figma's absolute positioning** — translate to flex/grid + gap.

## System-Wide Impact

- **Interaction graph**: Static page, no event handlers, no callbacks. Risk surface = render correctness only.
- **Error propagation**: Only failure mode is a missing image asset (404). `next/image` will log to console; static imports throw at build time (preferred — fail fast). Use static imports for all assets so missing files break the build, not production.
- **State lifecycle**: None — Server Component, no state.
- **API surface parity**: This page sets the **design-token contract** for every future screen (Tesla detail, Theme detail, etc.). Tokens added here in `globals.css` must accommodate those designs too. Cross-check `.figma-B01-theme.png` and `.figma-A01-main.png` while adding tokens to avoid renaming later.
- **Integration test scenarios**:
  1. Build the page (`next build`) — verifies static imports resolve and metadata is valid.
  2. Render in 360 px viewport (mobile) — full-bleed.
  3. Render in 1280 px viewport — column centers, max-width 720 px held.
  4. Korean characters render with Noto Sans KR (verify by inspecting computed font-family on a Hangul span).
  5. Page lighthouse score — should be ≥95 perf because purely static + Next/Image.

## Acceptance Criteria

### Functional

- [ ] `app/page.tsx` no longer references `next.svg`, `vercel.svg`, "Deploy Now", or any Vercel template copy.
- [ ] The page renders all six sections in the order specified above + footer disclaimer.
- [ ] At viewport ≥ 768 px the content column is centered with `max-width: 720px`; at smaller viewports it is full-bleed.
- [ ] All Korean copy listed in **Section E** appears verbatim (no machine-translated paraphrases).
- [ ] All numeric values (`+53.97%`, `927`, `+8.2%`, etc.) match the values pulled from `mcp__figma__get_metadata` on node `1:3`.
- [ ] Each Figma image asset is downloaded into `public/images/screen-utama/` and referenced via static-import `next/image`.

### Token / styling

- [ ] `globals.css` registers `--color-primary-{100..900}`, `--color-gray-{100..900}`, `--color-accent-{cyan,purple,navy}`, `--color-warning-{300..700}`, `--color-red-100`, `--color-error-100`, `--color-border` inside `@theme`.
- [ ] `globals.css` registers typography tokens `typo-large`, `typo-small`, `typo-tiny`, `typo-micro` so `text-typo-large` etc. are valid Tailwind classes.
- [ ] `bg-primary-100/30` and `bg-accent-cyan/10` resolve at runtime (visual check).

### Layout / metadata

- [ ] `app/layout.tsx` `<html lang="ko">`.
- [ ] `app/layout.tsx` includes `Noto_Sans_KR` (or Pretendard) variable, exposed as `--font-noto-kr` and registered in the `--font-sans` fallback chain.
- [ ] Metadata title and description updated away from "Create Next App" boilerplate.

### Quality gates

- [ ] `npm run build` passes (no TS, ESLint, or static-import errors).
- [ ] `npm run lint` passes.
- [ ] No `'use client'` directive added — page stays a Server Component.
- [ ] No `tailwind.config.*` file created (tokens live in CSS for v4).

## Edge Cases & Risks

| Risk | Mitigation |
|------|-----------|
| Geist has no Hangul → Korean text falls back to system font, looks inconsistent | Add Noto Sans KR (or Pretendard) and put it **first** in `--font-sans` |
| `prefers-color-scheme: dark` flips background to `#0a0a0a`, breaking the light-only Figma | Remove the dark-mode block from `globals.css` for now (light-only) — see Open Question #2 |
| Figma asset URLs are short-lived; running `get_design_context` later returns new URLs | Download assets in **one session** and commit them to `public/`; never reference Figma URLs at runtime |
| `bg-primary-100/30` requires Tailwind v4 color-with-opacity; if a hex literal is passed instead of a CSS color, the `/30` modifier silently fails | Use `--color-primary-100: oklch(...)` or hex; verify by inspecting computed `background-color` after build |
| Figma frame names hint Tailwind classes that don't exist out-of-the-box (e.g. `bg-accent-cyan/10`) — assuming they "just work" without registering tokens leads to invisible elements | All required custom tokens are explicitly listed in **Section A**; do not skip them |
| Hex codes in `.figma-color-system.png` are at small font size — easy to misread | Use the Figma file's variable picker (or zoom into the PNG at 200%+) before committing values |
| `<Image>` without `width`/`height` for non-static `src` will throw at runtime in Next 16 | Use static imports exclusively; or pass `fill` with a sized parent |

## Open Questions

1. **Korean font choice**: `Noto_Sans_KR` (Google) vs `Pretendard` (popular Korean variable font, but requires self-hosting from `pretendard-jp.cdn` or npm package). Recommend Noto Sans KR for simplicity unless designer specifies otherwise.
2. **Dark-mode strategy**: drop the `prefers-color-scheme: dark` block entirely (forces light mode), or add a complete dark token set. Figma only shows light. Recommend: drop for now, revisit when designer delivers a dark variant.
3. **Section vertical spacing**: Figma uses absolute Y coordinates (e.g. section starts at `y=600.5`, next at `y=1093.5`). These need to be translated to vertical rhythm (`mt-12`, `pt-16`, etc.) — exact gaps should be diff-checked against the rendered Figma screenshot. Acceptable tolerance: ±4 px.
4. **Chart visualizations**: The `.figma-B01-theme.png` (Tesla detail) shows line charts. The Screen_Utama node `1:3` does **not** include charts, so this plan does not cover them. Confirm before scope grows.

## Sources & References

### Internal references

- Figma design metadata for node `1:3` — already extracted via `mcp__figma__get_metadata`, archived at `C:\Users\ASUS\.claude\projects\d--PARA-Project-woori-ta\...\tool-results\mcp-figma-get_metadata-*.txt` (per `.figma-extract.ps1`)
- Color palette source: `.figma-color-system.png` (repo root)
- Polished UI reference: `.figma-A01-main.png`
- Sister-screen reference: `.figma-B01-theme.png`
- Project rules: [AGENTS.md](AGENTS.md) — must consult `node_modules/next/dist/docs/` before implementing
- Current state: [app/page.tsx](app/page.tsx), [app/layout.tsx](app/layout.tsx), [app/globals.css](app/globals.css)

### Next.js 16 docs (shipped in `node_modules/next/dist/docs/`)

- `01-app/01-getting-started/05-server-and-client-components.md` — Server-by-default rules
- `01-app/01-getting-started/11-css.md` — Tailwind v4 + CSS-first integration
- `01-app/01-getting-started/12-images.md` + `03-api-reference/02-components/image.md` — `next/image` Next 16 changes (`priority` → `preload`, required `width`/`height` for string `src`)
- `01-app/01-getting-started/13-fonts.md` + `03-api-reference/02-components/font.md` — `next/font/google` usage
- `01-app/01-getting-started/14-metadata-and-og-images.md` — `Metadata` export
- `03-api-reference/03-file-conventions/public-folder.md` — `public/` URL mapping

### Figma source

- `https://www.figma.com/design/e2zvlbix7y9DKbgA7JcOTV/Woori_ta?node-id=1-3` — fileKey `e2zvlbix7y9DKbgA7JcOTV`, nodeId `1:3` (Screen_Utama, 720 × 3357.5)

## Implementation Order (suggested)

1. Update `app/globals.css` with the full `@theme` token block (use TODO placeholders for hex values, fill them in after eyeballing `.figma-color-system.png`).
2. Update `app/layout.tsx` for Noto Sans KR, `lang="ko"`, and metadata.
3. Run `mcp__figma__get_design_context` on node `1:3`; download all asset URLs into `public/images/screen-utama/`.
4. Create `app/_components/screen-utama/data.ts` with all typed data arrays.
5. Build section components one-by-one in this order (top-to-bottom of the page): `header-by-line`, `top-three-stocks`, `hottest-stock-section`, `trending-stocks-section`, `themes-section`, `issues-section`, `footer-disclaimer`.
6. Replace `app/page.tsx` entirely with the orchestrator shown in **Section F**.
7. Run `npm run dev`, eyeball at 360 px and 1280 px viewports against `.figma-A01-main.png`. Adjust spacing tokens.
8. Run `npm run build` and `npm run lint` — must pass.

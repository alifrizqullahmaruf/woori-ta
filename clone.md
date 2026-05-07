# clone.md

## Objective

Clone the home page UI from the existing local web application:

```
http://localhost:3000/
```

This document is the **complete specification** for rebuilding the home page as accurately as possible using Next.js, TypeScript, and Tailwind CSS — including exact class names, color tokens, typography classes, spacing values, component hierarchy, and static data shapes.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 App Router |
| Language | TypeScript |
| Styling | Tailwind CSS 4 (`@import "tailwindcss"`) |
| Component Pattern | Atomic Design + Colocation (`_common`, `_root`) |
| Data | Hardcoded TypeScript objects (static JSON) |
| Icons | `lucide-react`, `react-icons` |
| Font (Korean) | Noto Sans KR (Google Fonts, weights 400/500/700) |
| Font (Numbers) | Lato Numbers (local `.woff2`, weights 400/500/700/900) |

Do not add unnecessary dependencies.

---

## Page Entry Point

```
app/page.tsx  →  app/_root/component/RootPageView.tsx
```

`RootPageView` is a **Server Component** that fetches data then renders 4 sections. When cloning with static data, replace the API fetch with hardcoded JSON imports.

---

## Root Layout

File: `app/layout.tsx`

```tsx
<html lang="ko" className="typo-base mx-auto md:max-w-[720px]">
  <body className={`${notoSansKR.className} bg-neutral-500 antialiased`}>
```

### What this does

| Class | Effect |
|---|---|
| `mx-auto` | Centers the content block horizontally |
| `md:max-w-[720px]` | Caps content width at **720px** on screens ≥ 768px |
| `bg-neutral-500` | Gray background (`#737373`) for the space outside the 720px card |
| `typo-base` | Sets base font: 16px / 24px / letter-spacing -0.03em |

**Mobile** (< 768px): full-width, white background.
**Desktop** (≥ 768px): 720px centered card, gray sides.

---

## Page Container

Component: `app/_common/component/templates/PageViewContainer.tsx`

Wraps all sections with:

```tsx
<main className="flex flex-col gap-[54px] pt-4 pb-18 bg-white">
  {children}
</main>
```

- Vertical padding: `pt-4` (16px top), `pb-18` (72px bottom)
- Section gap: `gap-[54px]` (54px between each section)
- Background: `bg-white`

---

## Color System

Defined in `app/_global/styles/globals.css` under `@theme { }`.

Use Tailwind utility classes that map to these custom CSS variables:

### Gray (Text)

| Token | Hex | Tailwind class example |
|---|---|---|
| `--color-gray-w900` | `#333333` | `text-gray-w900` |
| `--color-gray-w800` | `#3f4150` | `text-gray-w800` |
| `--color-gray-w700` | `#686e75` | `text-gray-w700` |
| `--color-gray-w600` | `#8c8d96` | `text-gray-w600` |
| `--color-gray-w400` | `#b2b3b9` | `text-gray-w400` |
| `--color-gray-w200` | `#dddddd` | `text-gray-w200` |

### Surface & Border

| Token | Hex | Usage |
|---|---|---|
| `--color-divider` | `#fafafa` | Section divider background |
| `--color-border` | `#e9ecef` | Card / input borders |

### Accent

| Token | Hex | Tailwind usage |
|---|---|---|
| `--color-accent-red` | `#e34850` | Positive stock return color |
| `--color-accent-cyan` | `#00b8d4` | Cyan badge (stock performance) |
| `--color-accent-navy` | `#002d9c` | Navy accent |
| `--color-accent-purple` | `#a56eff` | Purple accent (theme colors) |

### Primary (Brand Blue)

| Token | Hex | Tailwind class |
|---|---|---|
| `--color-primary-900` | `#2962ff` | `bg-primary-900` / `text-primary-900` |
| `--color-primary-850` | `#2684ff` | `text-primary-850` (rank number color) |
| `--color-primary-800` | `#2589f4` | `border-primary-800` (active card border) |
| `--color-primary-750` | `#4590ff` | Negative return color |
| `--color-primary-700` | `#66b6ff` | |
| `--color-primary-650` | `#86a7cc` | `bg-primary-650/20` (keyword badge bg) |
| `--color-primary-600` | `#82b1ff` | |
| `--color-primary-100` | `#e1ecff` | `bg-primary-100/30` (description card bg) |

### Alert / Warning

| Token | Hex |
|---|---|
| `--color-error-700` | `#ff0404` |
| `--color-warning-700` | `#fa8c16` |
| `--color-warning-600` | `#fba52d` |

---

## Typography System

Defined in `globals.css` under `@layer components`. Use these utility classes instead of raw font-size values.

### Korean Text Classes

| Class | Font Size | Line Height | Letter Spacing |
|---|---|---|---|
| `.typo-xlarge` | 24px (`1.5rem`) | 34px (`2.125rem`) | `-0.05em` |
| `.typo-large` | 20px (`1.25rem`) | 28px (`1.75rem`) | `-0.05em` |
| `.typo-medium` | 18px (`1.125rem`) | 28px (`1.75rem`) | `-0.03em` |
| `.typo-base` | 16px (`1rem`) | 24px (`1.5rem`) | `-0.03em` |
| `.typo-small` | 14px (`0.875rem`) | 24px (`1.5rem`) | `-0.03em` |
| `.typo-tiny` | 13px (`0.8125rem`) | 20px (`1.25rem`) | `-0.03em` |
| `.typo-micro` | 12px (`0.75rem`) | 16px (`1rem`) | `-0.03em` |

### Number Classes (Lato Numbers font)

| Class | Font | Size | Line Height | Letter Spacing |
|---|---|---|---|---|
| `.typo-num-large` | Lato Numbers | 24px | 34px | `-0.01em` |
| `.typo-num-base` | Lato Numbers | 16px | 24px | none |
| `.font-numbers` | Lato Numbers | inherits | inherits | `tnum` feature |

### Usage Pattern

```
Section heading:    typo-large font-bold
Section subheading: typo-base (or default)
Card body text:     typo-small
Small label:        typo-tiny
Badge / tag text:   typo-micro
Big number stat:    typo-xlarge font-numbers font-black
```

---

## Card Component (CardFrame)

File: `app/_common/component/atoms/CardFrame.tsx`

```tsx
<div
  className="rounded-xl px-3 py-[9px] {additionalClasses}"
  style={{
    boxShadow: "3px 4px 15px 0px #85A5D940",
    boxSizing: "border-box",
  }}
>
```

| Property | Value |
|---|---|
| Border radius | `rounded-xl` (12px) |
| Padding | `px-3 py-[9px]` (12px horizontal, 9px vertical) |
| Shadow | `3px 4px 15px 0px #85A5D940` (soft blue shadow, 25% opacity) |
| Background | White (default — not set in CardFrame, set by parent) |

Special variant (TrendingIssues card):
```
rounded-tl-none !p-[21px]
```
Removes top-left border radius and overrides padding to 21px.

---

## Section Header Component

File: `app/_root/component/common/SectionHeader.tsx`

```tsx
<header className="mb-1.5 flex items-start justify-between">
  <h2 className="typo-large flex items-center gap-1.5 font-bold">
    {headingText}
    {isDisplayingIcon && <TrendingUpIcon />}
  </h2>
  {isAiButtonNeeded && <AiButton />}
</header>
{subHeadingText && <p>{subHeadingText}</p>}
```

| Prop | Default | Used by |
|---|---|---|
| `headingText` | required | All sections |
| `subHeadingText` | undefined | Hottest, TopPerformanceStock |
| `isAiButtonNeeded` | `true` | All except TopPerformanceTheme |
| `isDisplayingIcon` | `false` | TopPerformanceStock only |

### AiButton

Small blue circular badge with text "AI". Positioned top-right of section header via `justify-between`. No interaction — purely decorative label indicating AI-generated content.

---

## Section 1: Hottest

**Component:** `app/_root/component/Hottest/index.tsx`
**Heading:** "요즘 가장 핫한 종목,\n이건 다 이유가 있다"
**Sub-heading:** "전 세계가 몰린 이유, 한눈에 보여드릴게요"

### Stock Selector Row

```tsx
<ul className="mt-7 mb-[22px] flex items-center justify-center gap-2 sm:gap-[9px] sm:w-[400px] mx-auto w-[300px]">
  {/* 3 items, each w-1/3 max-w-[140px] */}
```

| Property | Mobile | Tablet+ |
|---|---|---|
| Container width | `w-[300px]` | `sm:w-[400px]` |
| Gap | `gap-2` (8px) | `sm:gap-[9px]` (9px) |
| Margin top | `mt-7` (28px) | same |
| Margin bottom | `mb-[22px]` (22px) | same |

### HottestItem Card

Each stock card is a `CardFrame` with additional classes:

```
typo-small flex flex-col gap-1 sm:gap-1.5 w-full
px-2 sm:px-3 py-2 sm:py-[9px] bg-primary-50
transition-all duration-300 ease-in-out
cursor-pointer select-none will-change-transform
border-2
```

**Active state** (selected card):
```
border-primary-800 bg-primary-100/30 scale-110 z-10
```

**Inactive state**:
```
border-transparent scale-100 z-0
hover:scale-105  (hover-capable devices only)
```

**Card inner layout:**

```
┌─────────────────────┐
│ 1          ← rank   │  text-primary-850 font-bold text-xs sm:text-sm, text-left
│  ┌────────┐          │
│  │  LOGO  │          │  w-14 h-14 (56px mobile) / w-[76px] h-[76px] (76px sm+)
│  └────────┘          │
│   엔비디아            │  text-center truncate text-xs sm:text-sm leading-tight pt-2
└─────────────────────┘
```

Logo: `CompanyLogo` component, `variant="square"`, `container={true}`

### HottestDescription Card

File: `app/_root/component/Hottest/HottestDescription.tsx`

Container:
```
bg-primary-100/30 rounded-[20px] px-5 pt-7 pb-9 text-center
```

| Element | Classes | Notes |
|---|---|---|
| Label "지난 5일간..." | `mb-[3px]` (default typo) | h3 element |
| Mention count "927회 언급!" | `typo-xlarge font-numbers mb-[9px] font-black` | strong element |
| SNS source row | `mb-[21px] flex items-center justify-center gap-[15px]` | ul element |
| Each source item | `flex items-center gap-[3px]` | 16×16px logo + count |
| Count text | `typo-micro` | |
| Description text | `typo-tiny mb-[18px]` | p element |
| Tags/keywords row | `flex flex-wrap items-center justify-center gap-[3px]` | ul element |

**IndexBadge (keyword tag):**
```
text-gray-w700 typo-tiny bg-primary-650/20 w-max rounded-[30px] px-1.5 py-[1px]
```
Text is truncated at 10 chars: `text.length > 10 ? text.slice(0,10) + "..." : text`

**Social media logos** (16×16px PNG images):
- `/images/logo_youtube.png`
- `/images/logo_reddit.png`
- `/images/logo_x.png`

---

## Section 2: TopPerformanceStock

**Component:** `app/_root/component/TopPerformanceStock.tsx`
**Heading:** "뜨자마자 주가도 쑥" + `<TrendingUp />` icon
**Sub-heading:** "화제성이 실제 주가로 이어진 사례들, 확인해보세요."

### Stock List

```tsx
<ul className="mt-[30px] flex flex-col gap-9">
  {/* 3 items */}
```

Gap: `gap-9` (36px between each stock item)
Margin top: `mt-[30px]` (30px)

### TopPerformanceStockItem Layout

Wrapped in `<Link href="/company-info/{ticker}">`:

```
┌─────────────────────────────────────────────────────┐
│ [StockItem (rank+logo+name)]    [지난 1주일간 +53.97%] │ ← mb-[9px] flex items-center
├─────────────────────────────────────────────────────┤
│ 언급량이 증가했어요! (X 기준)                           │ ← typo-small font-medium line-clamp-1
│ NAND 컨트롤러 강세로 급등                              │ ← typo-small text-gray-w600 line-clamp-1
└─────────────────────────────────────────────────────┘
```

**Return badge:**
```
bg-accent-cyan/10 font-family-numbers typo-micro text-accent-cyan ml-auto rounded-2xl px-[9px] py-[3px] font-bold
```

Format: `지난 1주일간 +53.97%` (prefix `+` only if positive)

Color: always `text-accent-cyan` (`#00b8d4`) — cyan regardless of positive/negative

---

## Section 3: TopPerformanceTheme

**Component:** `app/_root/component/TopPerformanceTheme.tsx`
**Heading:** "몰려든 테마, 결과는 달랐을지도?"
**AiButton:** NOT shown (`isAiButtonNeeded={false}`)

### Theme List

```tsx
<ul className="mt-[18px] flex flex-col gap-[9px]">
  {/* 5 items */}
```

Gap: `gap-[9px]` (9px between each theme)
Margin top: `mt-[18px]` (18px)

### TopPerformanceThemeItem Layout

Wrapped in `CardFrame` + `<Link href="/theme/{theme_id}">`:

```
┌───────────────────────────────────────────────┐
│ ●  테마명                          +12.3%      │
│  (colored circle 36x36px)                     │
└───────────────────────────────────────────────┘
```

**Circle logo:**
```
relative mr-[9px] flex size-9 items-center justify-center overflow-hidden rounded-full
```
- If logo URL exists: `<Image fill sizes="36px" className="object-contain p-0.5">`
- If no logo: colored div with first letter of theme name

**Theme name:** `typo-small font-medium`

**Return value:**
```
font-family-numbers font-bold
```
- Positive: `text-accent-red` (`#e34850`) + prefix `+`
- Negative/zero: `text-primary-750` (`#4590ff`)

**Theme color codes** (used in order for 5 items):

| Index | Background | Text |
|---|---|---|
| 0 | `#2684FF33` | `#2962FF` (blue) |
| 1 | `#A56EFF33` | `#A56EFF` (purple) |
| 2 | `#60C86433` | `#60C864` (green) |
| 3 | `#FA8C1633` | `#FA8C16` (orange) |
| 4 | `#E3485033` | `#E34850` (red) |

---

## Section 4: TrendingIssues

**Component:** `app/_root/component/TrendingIssues.tsx`
**Heading:** "오늘 투자자들,\n이 이슈가 중심이에요"

### Issue List

```tsx
<section id="section-issues" className="scroll-mt-5 pb-5">
  <ul className="mt-[18px] flex flex-col gap-[18px]">
    {/* 3 items */}
```

### TrendingIssuesItem Layout

Card container:
```
CardFrame with className="rounded-tl-none !p-[21px]"
```
(Top-left corner is sharp — no radius. All other corners are `rounded-xl`.)

```
┌──────────────────────────────────────────────┐  ← no top-left radius
│ 미국 재정 적자 우려에 증시 급락          [→]  │  ← h3 line-clamp-2, chevron icon
├──────────────────────────────────────────────┤
│ 미국 국채 수익률 급등과 재정 적자 우려,       │  ← typo-tiny line-clamp-3 mb-3
│ 금리 상승...                                 │
├──────────────────────────────────────────────┤
│ [image if imageUrl exists — h-[180px]]       │  ← relative h-[180px] rounded-lg overflow-hidden
└──────────────────────────────────────────────┘
```

**Header row:**
```
mb-1.5 flex items-center justify-between
```

**Title:** `line-clamp-2 max-w-[calc(100%-27px)] font-medium`

**Back icon (rotated →):**
```tsx
<Back className="text-primary-800 ml-3 size-[15px] rotate-180" />
```

**Summary:** `typo-tiny line-clamp-3 mb-3`

**Image container (if present):**
```
relative w-full h-[180px] lg:h-[350px] rounded-lg overflow-hidden
```
Image: `fill`, `object-contain`, `sizes="(max-width: 768px) 100vw, 400px"`

---

## Folder Structure

```
app/
  _root/
    component/
      RootPageView.tsx          ← server component, fetches data
      Hottest/
        index.tsx               ← client component, interactive
        HottestDescription.tsx  ← description + mentions + tags
      TopPerformanceStock.tsx   ← client component
      TopPerformanceTheme.tsx   ← client component
      TrendingIssues.tsx        ← client component
      common/
        SectionHeader.tsx       ← shared section header
  _common/
    component/
      atoms/
        CardFrame.tsx           ← base card wrapper
        Icon.tsx                ← TrendingUp, Back icons
      molecules/
        AiButton.tsx            ← blue AI badge
        StockItem.tsx           ← rank + logo + name row
        CompanySearch/
          CompanyLogo.tsx       ← company logo with fallback
  _global/
    styles/
      globals.css               ← Tailwind 4 config + color tokens + typo classes
data/
  home-static.ts                ← static JSON data (create this)
types/
  sns.ts                        ← TypeScript interfaces (create this)
```

---

## TypeScript Types

File: `types/sns.ts`

```ts
export interface WeeklyHighlightItem {
  ticker: string;
  name_ko: string | null;
  logo_url: string | null;
  mention_count: number;
  x_mentions: number;
  reddit_mentions: number;
  youtube_mentions: number;
  sentiment: string | null;
  summary: string | null;
  keywords: string[] | null;
  price_change_7d: number;
  closing_price: number | null;
}

export interface WeeklyHighlightsResponse {
  period: string;
  top_mentions: WeeklyHighlightItem[];
  top_performers: WeeklyHighlightItem[];
}

export interface ThemeItem {
  theme_id: string;
  theme_name: string;
  theme_logo_url: string | null;
  return_7d: number;
}

export interface NewsItem {
  headline: string;
  summary_a01: string;
  image_url?: string;
}
```

---

## Static Data

File: `data/home-static.ts`

```ts
import type { WeeklyHighlightsResponse, ThemeItem, NewsItem } from "@/types/sns";

export const weeklyHighlights: WeeklyHighlightsResponse = {
  period: "2026-04-28 ~ 2026-05-04",
  top_mentions: [
    {
      ticker: "NVDA",
      name_ko: "엔비디아",
      logo_url: null,
      mention_count: 927,
      youtube_mentions: 86,
      reddit_mentions: 650,
      x_mentions: 191,
      sentiment: "mixed",
      summary:
        "NVDA는 AI 반도체 섹터 강세 속 데이터센터 매출 209% 급증하며 주목받고 있으나, 밸류에이션 우려와 타 반도체주 대비 상승률 둔화 논란이 공존",
      keywords: [
        "AI GPU 독점",
        "데이터센터 매출 급증",
        "반도체 섹터 강세",
        "PEG 0.9배",
        "국방부 AI 확대",
      ],
      price_change_7d: 5.23,
      closing_price: 138.85,
    },
    {
      ticker: "AMD",
      name_ko: "AMD(어드밴스드마이크로디바이시스)",
      logo_url: null,
      mention_count: 543,
      youtube_mentions: 45,
      reddit_mentions: 420,
      x_mentions: 78,
      sentiment: "positive",
      summary:
        "AMD는 MI300X AI 가속기의 데이터센터 채택 확대와 함께 NVIDIA 대안으로 주목받으며 강세",
      keywords: ["MI300X", "AI 가속기", "데이터센터", "NVIDIA 대안"],
      price_change_7d: 8.41,
      closing_price: 155.42,
    },
    {
      ticker: "TSLA",
      name_ko: "테슬라",
      logo_url: null,
      mention_count: 412,
      youtube_mentions: 132,
      reddit_mentions: 198,
      x_mentions: 82,
      sentiment: "negative",
      summary:
        "테슬라는 전기차 판매 둔화와 머스크의 정치적 활동에 따른 브랜드 리스크로 투자자들 사이에 논란이 지속",
      keywords: ["전기차 둔화", "브랜드 리스크", "머스크", "로보택시"],
      price_change_7d: -3.12,
      closing_price: 172.63,
    },
  ],
  top_performers: [
    {
      ticker: "SIMO",
      name_ko: "실리콘 모션 테크놀로지 ADR",
      logo_url: null,
      mention_count: 187,
      youtube_mentions: 0,
      reddit_mentions: 150,
      x_mentions: 37,
      sentiment: "positive",
      summary: "NAND 컨트롤러 강세로 급등",
      keywords: ["NAND 컨트롤러", "반도체"],
      price_change_7d: 53.97,
      closing_price: 41.23,
    },
    {
      ticker: "NVDA",
      name_ko: "엔비디아",
      logo_url: null,
      mention_count: 927,
      youtube_mentions: 86,
      reddit_mentions: 650,
      x_mentions: 191,
      sentiment: "positive",
      summary: "AI GPU 데이터센터 수요 급증",
      keywords: ["AI GPU", "데이터센터"],
      price_change_7d: 5.23,
      closing_price: 138.85,
    },
    {
      ticker: "AMD",
      name_ko: "AMD(어드밴스드마이크로디바이시스)",
      logo_url: null,
      mention_count: 543,
      youtube_mentions: 45,
      reddit_mentions: 420,
      x_mentions: 78,
      sentiment: "positive",
      summary: "MI300X AI 가속기 채택 확대",
      keywords: ["MI300X", "AI 가속기"],
      price_change_7d: 8.41,
      closing_price: 155.42,
    },
  ],
};

export const topThemes: ThemeItem[] = [
  {
    theme_id: "ai-semiconductor",
    theme_name: "AI 반도체",
    theme_logo_url: null,
    return_7d: 12.3,
  },
  {
    theme_id: "electric-vehicle",
    theme_name: "전기차",
    theme_logo_url: null,
    return_7d: -4.7,
  },
  {
    theme_id: "cloud-computing",
    theme_name: "클라우드 컴퓨팅",
    theme_logo_url: null,
    return_7d: 7.2,
  },
  {
    theme_id: "defense-industry",
    theme_name: "방산 산업",
    theme_logo_url: null,
    return_7d: 9.8,
  },
  {
    theme_id: "biotech",
    theme_name: "바이오테크",
    theme_logo_url: null,
    return_7d: -2.1,
  },
];

export const trendingNews: NewsItem[] = [
  {
    headline: "미국 재정 적자 우려에 증시 급락",
    summary_a01:
      "미국 국채 수익률 급등과 재정 적자 우려, 금리 상승, 트럼프 대통령의 관세 정책 등으로 인해 미국 증시가 전반적으로 하락세를 보이고 있습니다.",
  },
  {
    headline: "오픈AI, 조니 아이브의 스타트업 'io' 64억 달러에 인수",
    summary_a01:
      "오픈AI는 아이폰 디자이너 조니 아이브가 설립한 스타트업 'io'를 약 64억 달러에 인수하며, 하드웨어 역량 강화와 AI의 물리적 확장을 본격 추진하고 있습니다.",
  },
  {
    headline: "나이키, 가격 인상 및 아마존 판매 재개",
    summary_a01:
      "나이키는 공급망 혼란과 수익성 악화에 대응해 제품 가격을 인상하고 약 6년 만에 아마존 판매를 재개하며, 스포츠웨어 업계 전반에 가격 변동이 예상됩니다.",
  },
];
```

---

## API Route (Optional Mock)

If you want a Route Handler instead of direct imports:

File: `app/api/home/route.ts`

```ts
import { NextResponse } from "next/server";
import { weeklyHighlights, topThemes, trendingNews } from "@/data/home-static";

export async function GET() {
  return NextResponse.json({
    weekly: weeklyHighlights,
    themes: topThemes,
    news: trendingNews,
  });
}
```

Endpoint: `GET /api/home`

---

## Spacing Reference

| Value | Pixels | Usage |
|---|---|---|
| `gap-[9px]` | 9px | Theme list gap, HottestItem inner gap (sm) |
| `gap-[18px]` | 18px | TrendingIssues list gap |
| `gap-[22px]` | 22px | Hottest stock selector bottom margin |
| `mt-[18px]` | 18px | Theme / issues list margin-top |
| `mt-[30px]` | 30px | TopPerformanceStock list margin-top |
| `mt-7` | 28px | Hottest stock selector margin-top |
| `mb-[9px]` | 9px | Stock item header bottom margin |
| `mb-[21px]` | 21px | SNS source row bottom margin |
| `mb-[18px]` | 18px | Description text bottom margin |
| `gap-[54px]` | 54px | Between all page sections |
| `pt-4` | 16px | Page container top padding |
| `pb-18` | 72px | Page container bottom padding |
| `px-5` | 20px | HottestDescription horizontal padding |
| `pt-7` | 28px | HottestDescription top padding |
| `pb-9` | 36px | HottestDescription bottom padding |
| `!p-[21px]` | 21px | TrendingIssuesItem padding (all sides) |

---

## Responsive Breakpoints

| Breakpoint | Min-width | Context |
|---|---|---|
| `sm:` | 640px | Company logo size, card gap, card padding |
| `md:` | 768px | Max-width 720px applied to `<html>` |
| `lg:` | 1024px | Image height in news cards |

Mobile-first: all base styles target mobile. Overrides prefixed with `sm:` or `lg:`.

---

## Image Assets Required

Ensure these exist in `public/images/`:

```
/images/logo_youtube.png   (16×16px — YouTube logo)
/images/logo_reddit.png    (16×16px — Reddit logo)
/images/logo_x.png         (16×16px — X/Twitter logo)
```

Company logos are loaded dynamically via `CompanyLogo` component using ticker symbol.

---

## Key Interactions

| Interaction | Component | Behavior |
|---|---|---|
| Click stock card | `HottestItem` | Changes `selectedIndex` state → updates `HottestDescription` |
| Active card state | `HottestItem` | `border-primary-800 bg-primary-100/30 scale-110 z-10` |
| Hover card state | `HottestItem` | `hover:scale-105` (hover-capable devices only) |
| Click stock link | `TopPerformanceStockItem` | Navigate to `/company-info/{ticker}` |
| Click theme link | `TopPerformanceThemeItem` | Navigate to `/theme/{theme_id}` |
| Click news card | `TrendingIssuesItem` | Navigate to `/issues/latest?item={index}` |

---

## Important Rules

- Do not modify `globals.css` color tokens or typo classes.
- Use existing `CardFrame`, `SectionHeader`, `AiButton` components — do not reinvent them.
- Match exact class names from this document — pixel accuracy matters.
- Keep `"use client"` on interactive components (`Hottest`, `TopPerformanceStock`, `TopPerformanceTheme`, `TrendingIssues`).
- `RootPageView` stays as a Server Component — only the section components are client.
- For static data mode: replace `await snsService.getWeeklyHighlightsWithFallback(today)` with direct import from `data/home-static.ts`.

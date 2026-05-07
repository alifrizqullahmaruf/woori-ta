# Woori-ta

AI-powered investment insight dashboard for Woori Bank customers, built from Figma design by AdvisorLoren.

## Pages

| Route | Description |
|---|---|
| `/` | Home — hottest stocks with mention count & tags |
| `/barchart` | Sentiment as horizontal segmented bar |
| `/pie` | Sentiment as pie chart |
| `/wordcloud` | Sentiment as word cloud |

## Stack

- **Next.js 16** (App Router, Server Components)
- **React 19** + **TypeScript 5**
- **Tailwind CSS v4** (CSS-first, no config file)
- **Chart.js** + **react-chartjs-2** (sparklines, pie chart)
- **Noto Sans KR** + **Lato** (Google Fonts)

## Project Structure

```
app/
  _components/
    page-shell.tsx          ← shared page layout
    info-modal.tsx          ← "?" info bottom sheet
    stock-detail/           ← shared UI primitives
      base-detail-card.tsx  ← card with sentimentSlot prop
      stock-selector.tsx    ← NVDA / AMD / TSLA selector
      mention-bar.tsx
      segmented-bar.tsx
      question-btn.tsx
    screen-utama/           ← reusable sections

  barchart/ | pie/ | wordcloud/
    _components/            ← page-specific components
    page.tsx

dataset/                    ← all data as JSON (edit here)
  stocks.json
  trending.json
  themes.json
  issues.json
  wordcloud.json
  disclaimers.json

public/images/screen-utama/ ← all static assets
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Updating Data

All content lives in `dataset/*.json` — no TypeScript required:

| File | Content |
|---|---|
| `stocks.json` | Stock data: mentions, sentiment, credibility |
| `trending.json` | Trending stocks + sparklines |
| `themes.json` | Investment themes |
| `issues.json` | Market news |
| `wordcloud.json` | Word cloud keywords per stock |
| `disclaimers.json` | Footer disclaimer text |

## Adding a New Visualization Page

1. Create `app/newpage/_components/hottest-detail-new.tsx` with a custom `sentimentSlot`
2. Create `app/newpage/page.tsx` using `PageShell`:

```tsx
export default function NewPage() {
  return (
    <PageShell
      hottest={<NewHottestInteractive />}
      trending={<TrendingBarchartSection />}
      themes={<ThemesSection />}
      issues={<IssuesSection />}
    />
  );
}
```

## Design Reference

Figma: [Woori_ta](https://www.figma.com/design/uvavtwpYnnqdiHIKeqkwyD/TA?node-id=0-1&t=ZfNl1svJGo79E3SP-1)

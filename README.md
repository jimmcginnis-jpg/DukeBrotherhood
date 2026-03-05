# Duke's Brotherhood: Where Are They Now?

**dukebrotherhood.com** — A comprehensive documentary profile series covering every significant player across eight eras of Duke basketball.

## Project Architecture

```
dukebrotherhood/
├── data/
│   └── players.json          ← THE SINGLE SOURCE OF TRUTH
│                                 All player & era data lives here.
│                                 Edit this file to update any profile.
│
├── pages/
│   ├── index.js              ← Home page (dukebrotherhood.com)
│   ├── _app.js               ← Global app wrapper
│   ├── players/
│   │   ├── index.js          ← All Players listing (/players/)
│   │   └── [slug].js         ← Individual player pages (/players/cooper-flagg/)
│   └── eras/
│       ├── index.js          ← All Eras listing (/eras/)
│       └── [key].js          ← Era detail pages (/eras/dynasty1/)
│
├── components/
│   └── Layout.js             ← Shared header, nav, footer, SEO meta tags
│
├── styles/
│   └── globals.css           ← Tailwind + Duke theming (navy/gold/cream)
│
├── public/                   ← Static assets (favicon, images, etc.)
├── package.json
├── next.config.js            ← Static export configuration
├── tailwind.config.js        ← Duke color palette + fonts
└── postcss.config.js
```

## How It Works

**Static Site Generation (SSG):** At build time, Next.js reads `data/players.json` and generates a standalone HTML page for every player and every era. No server required. The output is plain HTML + CSS + JS files that can be hosted anywhere.

**SEO:** Each player page (e.g., `/players/cooper-flagg/`) is pre-rendered as real HTML with:
- Full `<title>` and `<meta description>` tags
- Open Graph tags for social sharing
- Schema.org structured data (JSON-LD)
- Canonical URLs
- Proper `<h1>` headings

Google sees real HTML content, not a JavaScript blob. This is crucial for ranking on searches like "Cooper Flagg Duke basketball" or "where is Jay Williams now."

## The Update Workflow

### To update an existing player profile:
1. Open `data/players.json`
2. Find the player by `id` or `slug`
3. Edit whatever fields you need (bio text, current status, stats, etc.)
4. Run `npm run build` (or push to GitHub and Vercel rebuilds automatically)

### To add a new player:
1. Add a new entry to the `players` array in `data/players.json`
2. Set `status: "done"` and fill in the bio fields
3. Build and deploy

### To mark a profile as complete:
Change `"status": "soon"` to `"status": "done"` and add the bio content.

## Player Data Schema

Each player in `data/players.json` has these fields:

```json
{
  "id": "flagg",                        // Unique identifier
  "slug": "cooper-flagg",               // URL slug → /players/cooper-flagg/
  "era": "scheyer",                     // Links to an era key
  "name": "Cooper Flagg",               // Display name
  "pos": "Forward",                     // Position
  "years": "2024–25",                   // Years at Duke
  "classOf": "2025",                    // Graduation/departure year
  "height": "6′9″",                     // Height
  "tagline": "The most hyped recruit...", // One-line summary (shown on cards)
  "status": "done",                     // "done" | "soon" | "coming"
  "now": "Dallas Mavericks...",         // Current role/status (brief)
  "drafted": "1st Rd, 1st — Dallas...", // Draft info
  "stat": "1 Duke season • 37 games...", // Key stats line

  "bio": {                              // THE FULL PROFILE (4 tabs)
    "road": "Full text of Road to Duke section...",
    "duke": "Full text of What Made Him Special...",
    "after": "Full text of After Duke section...",
    "now": "Full text of Where Is He Now section..."
  }
}
```

**Bio text formatting:** Use `\n` for paragraph breaks within each section. The player page template splits on `\n` and renders each chunk as a `<p>` tag.

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Install & Run Locally
```bash
npm install
npm run dev
```
Visit http://localhost:3000

### Build for Production
```bash
npm run build
```
This generates a static `out/` directory with all HTML pages.

### Deploy to Vercel (Recommended)
1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and import the repo
3. Point your domain (dukebrotherhood.com) to Vercel
4. Every push to `main` triggers an automatic rebuild

**Cost:** Free for projects like this on Vercel's hobby tier.

## Content Stats
- **Total players:** 80 across 8 eras
- **Profiles complete:** 51 (as of March 2026)
- **Total bio content:** ~334,000 characters of original, researched narrative
- **Average profile:** ~6,500 characters (~1,500–2,500 words)

## Design System
- **Colors:** Duke Navy (#00009C), Gold (#CBB677), Cream (#FAF8F3), Slate (#1a1a2e)
- **Fonts:** Playfair Display (headings), EB Garamond (body), Space Mono (labels/stats)
- **Layout:** Four-tab biography (Road to Duke / At Duke / After Duke / Where Is He Now)

## Future Enhancements
- Player photos / headshots
- Search functionality
- "Last Updated" timestamps per profile
- Timeline visualization
- CMS integration (Sanity/Contentful) for non-code editing
- RSS feed for new profiles

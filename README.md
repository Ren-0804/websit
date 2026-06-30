# 丰吉国际 - Corporate Website & CMS

A logistics corporate website for 丰吉国际供应链管理（江苏）有限公司, built with Next.js 15, React 19, and Tailwind CSS. It includes a small Markdown Content Management System (CMS) for publishing business notes and route observations.

## 🌟 Key Features

### 1. Corporate Frontend
*   **Performance Optimization**: Utilizes modern React Server Components (`app/page.tsx`) to statically generate and fetch news data directly on the server to maximize SEO.
*   **Design Language**: Restrained logistics-company visual system using ink, warm paper, railway red, and industrial gray.
*   **Internationalization (i18n)**: Chinese default with English public UI copy.

### 2. Markdown Parsing CMS Engine
*   **Automated Storage**: Articles are written in an internal Admin dashboard and instantly serialized into physical `.md` files in the `/content/posts/` directory.
*   **Rich Text Rendering**: Dynamic routes (`/news/[slug]`) automatically traverse the markdown syntax using `react-markdown` and `@tailwindcss/typography` to elegantly style headers, blockquotes, tables, and lists.
*   **Frontmatter Metadata**: Every article uses `gray-matter` to store essential metadata (Title, Date, Summary), which acts as automated schema for the Homepage News feeds.

### 3. Google Authenticator (TOTP) Security Layer
*   **Global Interceptor (`middleware.ts`)**: The entire CMS backend (`/admin/*`) is aggressively shielded by a Next.js edge middleware.
*   **Dynamic Two-Factor Auth (2FA)**: Before accessing the publishing dashboard, Administrators must verify their identity using a dynamic 6-digit code from Google Authenticator / Authy.
*   **Zero-Trust Cookies**: Successful verification dispenses a cryptographic JSON Web Token (`jose`) bound to an `HttpOnly` secure cookie.

## 🚀 Getting Started

### Prerequisites
*   Node.js (LTS recommended)
*   [pnpm](https://pnpm.io/) package manager

### Installation

1. Clone the repository and install dependencies:
```bash
pnpm install
```

2. Configure your Environment Variables by creating a `.env.local` file at the root:
```env
TOTP_SECRET=YOUR_GOOGLE_AUTHENTICATOR_SEED_KEY
JWT_SECRET=super_secret_jwt_key_that_should_be_long_enough_for_hs256
ADMIN_SETUP_OPEN=false
```

3. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛡️ Accessing the CMS

1. **Setup Device**: Set `ADMIN_SETUP_OPEN=true` temporarily, navigate to `http://localhost:3000/admin/setup`, scan the QR code using Google Authenticator on your mobile device, then set `ADMIN_SETUP_OPEN=false` again.
2. **Login**: Navigate to `http://localhost:3000/admin/login` and input the 6-digit dynamic code shown on your phone.
3. **Publish**: Upon successful validation, the dashboard at `http://localhost:3000/admin/publish` will unlock, allowing you to draft and instantly deploy new Corporate News directly to the homepage.

## Market Watch Sync

Run the logistics news sync manually:

```bash
pnpm sync:news
```

The sync reads public RSS feeds from non-Chinese sources, filters for Central Asia and logistics relevance, and creates draft Markdown posts in `content/posts`. Drafts are not shown on the public news pages until you review and publish them.

Optional environment variables:

```env
NEWS_SYNC_LIMIT=5
NEWS_SYNC_MAX_AGE_DAYS=30
CENTRAL_ASIA_NEWS_FEEDS=American Journal of Transportation|https://www.ajot.com/news/news/rss,RailFreight.com|https://www.railfreight.com/feed/
```

Use summaries and source links for market monitoring. Review every generated draft before publishing.

### GitHub scheduled sync

The repository includes `.github/workflows/sync-logistics-news.yml`. GitHub Actions runs it every day at `01:00 UTC` and commits up to two new draft posts into `content/posts`. If the repository is connected to Vercel, that commit will trigger the normal Vercel deployment flow.

The workflow only creates drafts with `status: draft`; public news pages ignore drafts until you review and publish them.

## 🛠 Tech Stack

*   [Next.js](https://nextjs.org/) (App Router, Server Components)
*   [Tailwind CSS](https://tailwindcss.com/) (Styling)
*   `lucide-react` (SVG Iconography)
*   `react-markdown`, `gray-matter`, `remark-gfm` (CMS Engine)
*   `otplib`, `jose`, `react-qr-code` (Authentication & Cryptography)

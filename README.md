# 丰吉国际 Corporate Website & CMS

Corporate website for 丰吉国际供应链管理（江苏）有限公司, built with Next.js 15, React 19 and Tailwind CSS.

## Architecture

The public site uses React Server Components for SEO-sensitive content. Business notes are stored as Markdown files in `content/posts` with frontmatter metadata parsed by `gray-matter`.

Production publishing is Git-backed. The admin API serializes Markdown and commits it through the GitHub Contents API. The Git commit then triggers the normal Vercel deployment flow. Local development can still write Markdown files directly when no GitHub publishing token is configured.

News list pages send summary-only data to client components. Full Markdown content is read only for article detail pages.

## Admin authentication

The admin area is protected by `middleware.ts`. Login uses a TOTP code from an authenticator application and issues an 8-hour signed JWT in an `HttpOnly`, `SameSite=Strict` cookie.

This is a single-factor TOTP login flow. It should not be described as two-factor authentication unless a separate first factor is added later.

JWT verification requires:

- HS256
- the expected issuer and audience
- `admin: true`
- a `JWT_SECRET` of at least 32 characters

The login endpoint also applies a basic per-instance rate limit.

## Local setup

Requirements:

- Node.js 22
- pnpm 10

Install dependencies:

```bash
pnpm install
```

Copy the environment template:

```bash
cp .env.example .env.local
```

Generate fresh values for all secrets. Never commit `.env.local` or other environment files.

Run development mode:

```bash
pnpm dev
```

Run verification:

```bash
pnpm typecheck
pnpm build
```

## Required environment variables

Authentication:

```env
TOTP_SECRET=replace-with-a-new-authenticator-seed
JWT_SECRET=replace-with-at-least-32-random-characters
ADMIN_SETUP_OPEN=false
```

Contact email:

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=mailer@example.com
SMTP_PASSWORD=replace-with-provider-app-password
CONTACT_EMAIL=operations@example.com
```

Production Git-backed publishing:

```env
GITHUB_CONTENT_TOKEN=replace-with-fine-grained-token
GITHUB_CONTENT_REPOSITORY=Ren-0804/websit
GITHUB_CONTENT_BRANCH=main
```

Use a fine-grained GitHub token limited to this repository with Contents read and write permission. Store it only in Vercel environment variables.

## Admin setup

1. Temporarily set `ADMIN_SETUP_OPEN=true`.
2. Open `/admin/setup` and bind the authenticator application.
3. Immediately set `ADMIN_SETUP_OPEN=false` again and redeploy.
4. Open `/admin/login` to sign in.
5. Publish from `/admin/publish`.

In production, a successful publish commits the Markdown file to GitHub. The new article becomes public after the resulting Vercel deployment completes.

## Market Watch Sync

Run manually:

```bash
pnpm sync:news
```

The sync reads approved HTTPS RSS feeds, filters for Central Asia and logistics relevance, and creates draft Markdown posts. It uses a 10-second request timeout and a 5 MB response-size limit. Items with invalid dates are ignored.

Optional settings:

```env
NEWS_SYNC_LIMIT=5
NEWS_SYNC_MAX_AGE_DAYS=30
CENTRAL_ASIA_NEWS_FEEDS=American Journal of Transportation|https://www.ajot.com/news/news/rss,RailFreight.com|https://www.railfreight.com/feed/
```

The scheduled workflow runs daily at `01:00 UTC` and commits draft posts. Drafts remain hidden from public news pages until published.

## Continuous verification

`.github/workflows/quality.yml` runs:

```text
pnpm install --frozen-lockfile
pnpm typecheck
pnpm build
```

Vercel preview deployments provide an additional production-build check for branch changes.

## Tech stack

- Next.js App Router and Server Components
- React 19
- Tailwind CSS
- React Markdown and remark-gfm
- gray-matter
- jose
- otplib
- Nodemailer
- Zod

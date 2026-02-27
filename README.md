# LandSea International - Corporate Website & CMS

A high-performance, modern logistics corporate website built with Next.js 15, React 19, and Tailwind CSS. Featuring a built-in, secure Markdown Content Management System (CMS) inspired by industry leaders like DSV.

## 🌟 Key Features

### 1. Corporate Frontend
*   **Performance Optimization**: Utilizes modern React Server Components (`app/page.tsx`) to statically generate and fetch news data directly on the server to maximize SEO.
*   **Design Language**: Professional, bold, and strictly-aligned corporate aesthetic using deep slate blues (`#0f1c2d`) and striking reds (`#e3000f`) similar to global top-tier shipping and logistics firms.
*   **Internationalization (i18n)**: Full multi-language support injected across UI elements for global reach (English, Chinese, Russian, Uzbek).

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
```

3. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛡️ Accessing the CMS

1. **Setup Device**: Navigate to `http://localhost:3000/admin/setup` to scan the QR code using Google Authenticator on your mobile device.
2. **Login**: Navigate to `http://localhost:3000/admin/login` and input the 6-digit dynamic code shown on your phone.
3. **Publish**: Upon successful validation, the dashboard at `http://localhost:3000/admin/publish` will unlock, allowing you to draft and instantly deploy new Corporate News directly to the homepage.

## 🛠 Tech Stack

*   [Next.js](https://nextjs.org/) (App Router, Server Components)
*   [Tailwind CSS](https://tailwindcss.com/) (Styling)
*   `lucide-react` (SVG Iconography)
*   `react-markdown`, `gray-matter`, `remark-gfm` (CMS Engine)
*   `otplib`, `jose`, `react-qr-code` (Authentication & Cryptography)

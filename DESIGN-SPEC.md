# Design System and Style Guide (Enterprise UI)

## Color System
- Neutral palette: `--background`, `--foreground`, `--border` mapped to Tailwind via CSS variables.
- Brand palette: Primary blues with deep accents.
  - `--primary`: `220 70% 50%` (electric blue)
  - `--ring`: `220 70% 50%` for consistent focus state color
  - Support tokens: `--secondary`, `--accent`, `--muted` for surfaces and subtle emphasis
- Contrast targets: body text vs background ≥ 4.5:1; interactive controls ≥ 3:1.
- Charts: `--chart-1`..`--chart-5` provide harmonious, distinguishable hues.

## Typography
- Font stack: `Inter, -apple-system, Segoe UI, Roboto, sans-serif` with optical sizing enabled.
- Line-height: body `1.7`; paragraphs default `leading-7` for readability.
- Hierarchy:
  - `h1`: `text-4xl md:text-5xl font-bold tracking-tight`
  - `h2`: `text-3xl font-bold tracking-tight`
  - `h3`: `text-2xl font-semibold`
- Body color: `text-gray-700`; Headings: `text-gray-900` for strong hierarchy.
- Balance long text using `.text-balance` utility to improve scanability.

## Layout and Grid
- Container: centered, responsive padding; max width up to `2xl: 1440px` using Tailwind container settings.
- Sections: use `.section { py-24 }` for consistent vertical rhythm.
- Grids: prefer `md:grid-cols-2` / `lg:grid-cols-3` and `gap-8~12` depending on density.

## Spacing and White Space
- Component padding: cards `p-6~p-8`, dialogs `p-6`, lists `space-y-4~6`.
- Headings spacing: `mb-6~mb-8`; supporting text `mb-6`.
- Maintain generous whitespace for a premium look while preserving information density.

## Components
- Cards: neutral border `border-gray-200/80`, `rounded-xl`, subtle shadow `shadow-sm`; hover elevates to `hover:shadow-lg` with optional `hover:border-blue-600/40`.
- Buttons: brand-forward gradients (`from-blue-600 to-blue-700`), accessible focus `focus-visible:ring-2 ring-blue-500 ring-offset-2`.
- Navigation: sticky headers with blurred backgrounds on scroll; clear hover and focus states.
- Footer: grouped navs with `aria-label`, actionable contact links (`tel:`, `mailto:`), high-contrast focus rings.

## Accessibility (WCAG 2.1 AA)
- Focus visibility: all interactive elements must have `focus-visible` ring and offset.
- Semantics: use `nav` landmarks with `aria-label`; icons are decorative with `aria-hidden` unless conveying meaning.
- Keyboard: ensure Tab navigation; overlays offer focus trapping and escapable close.
- Language and RTL: utilities in `globals.css` support `dir="rtl"` scenarios.

## Motion and Micro-interactions
- Use lightweight animations: `fade-in-up`, `slide-in`, `scale-in`, `float` from `globals.css`.
- Hover: subtle lift `.hover-lift` and gradient text `.text-gradient` for premium cues.
- Respect `prefers-reduced-motion`; keep durations ≤ 500ms, easing standard.

## Responsiveness and Performance
- Breakpoints: `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1440`.
- Optimize images: leverage `next/image` where applicable; use SVG for logos.
- CSS: Tailwind JIT ensures minimal bundle; reuse utilities and component abstractions.

## Information Architecture and UX Simplification
- Group related actions together; use clear categories in navigation and footers.
- Progressive disclosure: advanced options tucked behind dialogs or expandable panels.
- Reduce cognitive load: concise copy, clear headings, predictable layouts.

## CTAs and Visual Hierarchy
- Contrast and color: primary actions use brand color; secondary actions neutral.
- Placement: CTAs appear above the fold and at decision points; ensure adequate size and spacing.
- Flow: titles → supporting text → action; use scanning patterns with grid alignment.

## Implementation Notes
- Tailwind config maps tokens via CSS variables; update variables in `app/globals.css` to adjust theme.
- Use `focus-visible` classes on `Link` and `button` components for AA compliance.
- Legal and utility links in footer should point to real routes once available.

## Verification
- Use Lighthouse to validate contrast, focus indicators, and performance.
- Test across Chrome/Edge/Safari and common mobile resolutions.

## Token Reference
- Colors: `--background`, `--foreground`, `--primary`, `--secondary`, `--accent`, `--muted`, `--border`, `--ring`.
- Spacing emphasis: `4, 6, 8, 12, 24` units for rhythm.
- Radius: `--radius` → `rounded-xl`; compact controls use `rounded-md`.
- Elevation tiers: `shadow-sm`, `shadow`, `shadow-lg` only.

## Typography Scale
- Display: `text-5xl` for hero titles on `lg+`.
- H1: `text-4xl md:text-5xl` bold.
- H2: `text-3xl` bold.
- H3: `text-2xl` semibold.
- Body: `text-base leading-7`.
- Small: `text-sm text-gray-600` for metadata.

## Iconography and Imagery
- Icons: `lucide-react` sized `h-5 w-5` (body) and `h-6 w-6` (nav).
- Decorative icons include `aria-hidden="true"`.
- Logos: use SVG `public/brand-mark.svg`, `public/brand-wordmark.svg` for crisp scaling.
- Images: prefer `next/image` with descriptive `alt` text.

## Motion Guidelines
- Utilities: `animate-fade-in-up`, `animate-slide-in-left/right`, `animate-scale-in`, `animate-float`.
- Duration ≤ 500ms; entrance `ease-out`, hover `ease-in-out`.
- Respect `prefers-reduced-motion`; provide non-animated fallbacks.

## Accessibility Checklist (AA)
- Visible focus (`focus-visible:ring-2 ring-blue-500 ring-offset-2`).
- WCAG contrast ratios met.
- Semantic landmarks (`header`, `nav[aria-label]`, `main`, `footer`).
- Keyboard operability for menus, dialogs, overlays.
- Decorative icons are `aria-hidden`.

## Performance Guidelines
- Lighthouse: Performance ≥ 90, Accessibility ≥ 95.
- Optimize images and lazy-load where appropriate.
- Animate via transforms to minimize reflow.
- Avoid blocking scripts; prioritize fast TTI.

## IA and Progressive Disclosure Patterns
- Group related items; avoid nesting beyond two levels.
- Use accordions/drawers for advanced options; default collapsed.
- Provide breadcrumbs for deep pages.

## Component Library Conventions
- Buttons: primary gradient for CTAs; neutral for secondary actions.
- Cards: consistent padding/border/elevation with hover lift.
- Navigation: sticky header with blur; mobile drawer with focus management.
- Footer: grouped navs, actionable contact, legal routes.

## QA and Verification Steps
- Run Lighthouse (desktop/mobile) and fix contrast/focus issues.
- Test keyboard traversal and logical focus order.
- Validate responsive layouts at `sm`, `md`, `lg`, `xl`, `2xl`.
- Check RTL behavior using provided utilities.

## Asset Usage
- Use `brand-mark.svg` in header/hero with appropriate `alt` or `aria-label`.
- Use `brand-wordmark.svg` in marketing sections and footer as needed.
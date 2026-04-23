# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Ciasta Joasi** — a one-page marketing website for a solo home baker based in Poznań, Poland. The site is a pure HTML/CSS static site (no build step, no framework, no JavaScript dependencies). It was built as a proof-of-concept and is now being modernized.

The site is written in Polish. All content, labels, and comments should remain in Polish unless the user explicitly requests otherwise.

### Tech Stack

| Technology | Details |
|------------|---------|
| HTML | HTML5 semantic markup, single `index.html` |
| CSS | Vanilla CSS, single `css/styles.css`, no preprocessor |
| JavaScript | Minimal inline JS (year update only) |
| Images | JPEG assets in `assets/images/`, video in `assets/video/` |
| Hosting | Static file hosting (no backend, no server-side rendering) |

## File Structure

```
slodkie/
├── index.html              # Single-page site — all sections here
├── css/
│   └── styles.css          # All styles — organized by section with block comments
└── assets/
    ├── images/
    │   ├── hero.jpg         # Hero section foreground image (portrait, 4:5)
    │   ├── about.jpg        # About section portrait
    │   ├── background1.jpg  # Hero section background (full-bleed)
    │   ├── background2.jpg  # Order section background (full-bleed)
    │   ├── favicon.png      # Logo / favicon
    │   ├── 1.jpg–6.jpg      # Gallery images
    │   ├── piece1.jpg       # Unused — available for gallery or feature use
    │   ├── piece2.jpg       # Unused — available for gallery or feature use
    │   └── piece3.jpg       # Unused — available for gallery or feature use
    └── video/
        └── video.mp4        # Unused — available for hero or background use
```

## Design System

All design tokens are CSS custom properties on `:root` in `css/styles.css`:

| Variable | Value | Usage |
|----------|-------|-------|
| `--bg` | `#ffffff` | Main background |
| `--bg-alt` | `#fbfaf8` | Alternate section background |
| `--text` | `#1f1f1f` | Body text |
| `--muted` | `#5f5f5f` | Secondary/supporting text |
| `--border` | `#ece7e2` | Borders and dividers |
| `--accent` | `#d4a373` | Warm caramel — primary CTA color |
| `--accent-2` | `#b08968` | Deeper caramel — kicker text, highlights |
| `--shadow` | box-shadow value | Card elevation |
| `--radius` | `14px` | Consistent border radius |
| `--wrap` | `1100px` | Max content width |

## Page Sections (in order)

| Section | HTML id | Notes |
|---------|---------|-------|
| Header | — (sticky) | Logo + nav links; no mobile hamburger yet |
| Hero | `#top` | Background image + white overlay + text + hero image |
| Trust Strip | — | 3 proof points; collapses to 1 column at 820px |
| Offer | `#oferta` | 3 cards (cakes, home pastries, seasonal); collapses to 1 col at 980px |
| About | `#o-mnie` | 2-column text + image layout |
| Gallery | `#galeria` | 3-column grid of 6 images; collapses to 1 col at 980px |
| Order Process | `#zamowienia` | Numbered steps 1–3; background image |
| Contact | `#kontakt` | Contact details + aside card |
| Footer | — | Copyright year + back-to-top link |

## Known Issues (as of initial POC)

- No mobile hamburger menu — nav links wrap at small widths
- Gallery images use a fixed pixel height (`220px`/`240px`) which causes poor cropping at various screen sizes
- Missing intermediate breakpoints: grids jump from 3 columns directly to 1 column
- `piece1.jpg`, `piece2.jpg`, `piece3.jpg` are unused assets
- `video.mp4` is unused
- Contact details contain placeholder data (`hello@example.com`, `+48 000 000 000`)

## Development Notes

- **No build step** — edit `index.html` and `css/styles.css` directly; open in browser to preview
- **No external CSS frameworks** — keep it that way; avoid adding Bootstrap/Tailwind unless explicitly requested
- **Mobile-first** is the target; test at 375px, 768px, 1024px, and 1280px+
- **Image optimization** — new or replaced images should be appropriately sized; do not embed base64 images
- **Accessibility** — preserve `alt` text on all images, `aria-label` attributes, and semantic HTML
- **Polish content** — do not translate existing text to English

# Ciasta Joasi — Redesign Spec

**Date:** 2026-04-23
**Project:** slodkie (C:\Users\bdur\workspace\slodkie)
**Status:** Approved

## Summary

Modernize the Ciasta Joasi one-page website from a proof-of-concept to a polished, mobile-first site. The site remains a static HTML/CSS file — no build step, no framework — but gains two lightweight CDN libraries (Swiper.js, GLightbox) for carousel and lightbox functionality. All design changes follow the approved **Modern Editorial** direction: light, airy, serif+sans mix, cream/caramel palette, photogenic and Instagram-adjacent in feel.

## Design Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Visual style | Modern Editorial (C) | Light, airy, cream accents — lets cake photos lead |
| Hero layout | Magazine Style (C) | Centered italic serif title + panoramic photo strip |
| Gallery | Carousel + Lightbox | Swipe-friendly, full proportions, no cropping |
| Tech approach | HTML/CSS + 2 CDN libs | No build step, battle-tested mobile UX |
| Page sections | Keep existing structure | No new sections needed at this stage |

## Tech Stack (after redesign)

| Layer | Technology |
|---|---|
| Markup | HTML5 — single `index.html` |
| Styles | Vanilla CSS — single `css/styles.css` |
| Carousel | [Swiper.js](https://swiperjs.com) via CDN (~40 KB) |
| Lightbox | [GLightbox](https://biati-digital.github.io/glightbox/) via CDN (~15 KB) |
| JS | Minimal inline — Swiper init, GLightbox init, year update |

## Design System

### Typography
- **Headings / Logo / Brand name:** Georgia (serif), font-weight 400, italic for the brand name
- **Body / Nav / Labels:** System UI stack (sans-serif)
- **Section labels:** 0.6rem, letter-spacing 4px, uppercase, `--caramel-dark` color — used above every `<h2>`

### Color Palette (unchanged tokens, adjusted usage)

| Token | Value | Usage |
|---|---|---|
| `--cream` | `#fffbf7` | Hero background, main sections |
| `--warm-white` | `#fbfaf8` | Alternate sections (trust strip, about, steps) |
| `--text` | `#1f1f1f` | Body text, headings |
| `--muted` | `#5f5f5f` | Supporting text |
| `--border` | `#ece7e2` | Borders, dividers |
| `--caramel` | `#d4a373` | Primary CTA buttons, active dots, icons |
| `--caramel-dark` | `#b08968` | Section labels, kicker text, italic brand name |
| `--accent-bg` | `rgba(212,163,115,0.08)` | Card icons background, contact aside |

### Spacing & Shape
- `--radius: 14px` — consistent on all cards, slides, images
- `--wrap: 1100px` — max content width
- Section padding: `4rem 0` (desktop), `2.5rem 0` (mobile)

## Section-by-Section Design

### Header
- Sticky, blurred background (`backdrop-filter: blur(12px)`)
- **Logo:** favicon icon + italic Georgia "Ciasta Joasi"
- **Desktop nav:** text links (Oferta, O mnie, Galeria, Zamówienia) + filled pill CTA "Kontakt"
- **Mobile nav:** hamburger icon (3 lines) replaces the text links; tap opens a slide-down overlay (below the header bar) with nav links stacked vertically; closes on link click or tap outside

### Hero (Magazine Style)
- Centered layout (text-align: center)
- **Kicker line:** `· Poznań · Domowe wypieki z serca ·` — small, uppercase, caramel-dark, letter-spaced
- **H1:** `Ciasta Joasi` in italic Georgia, large; subtitle line below in regular weight
- **Lead text:** one sentence, muted, max-width ~52ch centered
- **CTA buttons:** "Jak zamówić" (filled caramel pill) + "Zobacz galerię →" (ghost pill), centered, flex row
- **Panoramic photo strip:** full-width below the text block, round-top corners (14px), height ~260px desktop / scales on mobile. Implemented as a Swiper carousel in "free mode" or autoplay with 3 slides visible on desktop, 1.2 on mobile (peek effect). Images: `hero.jpg` as main + `piece1.jpg`, `piece2.jpg`, `piece3.jpg` as additional slides — all 4 currently unused or underused images brought into play.
- Background: solid `--cream`, no background image overlay (the photo strip replaces the background image)

### Trust Strip
- 3 items in a horizontal row (flex), centered, divided by `border-right`
- On mobile: stacks to 3 rows with `border-bottom` separators instead
- Remove the card/box styling — keep it clean and inline, no shadows

### Offer (Torty, Ciasta domowe, Świąteczne)
- 3-column grid on desktop → 2-column at 820px → 1-column at 560px (adds intermediate breakpoint)
- Each card gains a small emoji/icon in a rounded square background box at the top
- Section gets a label above the `<h2>`: "Co przygotowuję"

### About (O mnie)
- 2-column grid (text left, photo right) on desktop → 1-column on mobile (photo moves below text)
- Section label above `<h2>`: "Kim jestem"
- `about.jpg` displayed with `aspect-ratio: 4/5`, `object-fit: cover`, `border-radius: 14px`

### Gallery (Galeria)
- **Replaced by Swiper.js carousel** — horizontal, touch/swipe enabled
- Desktop: 3 slides visible (`slidesPerView: 3`, `spaceBetween: 12`)
- Tablet (≤820px): 2 slides visible
- Mobile (≤560px): 1.2 slides visible (peek of next slide)
- Each slide: `aspect-ratio: 4/5`, `border-radius: 14px`, `object-fit: cover`
- Navigation: previous/next arrow buttons (styled as circular bordered buttons) + pagination dots below
- **GLightbox:** each slide image wrapped in `<a class="glightbox">` — clicking opens the full image in an overlay lightbox
- All 9 images usable: `1.jpg`–`6.jpg` + `piece1.jpg`, `piece2.jpg`, `piece3.jpg`
- Section label: "Realizacje"

### Order Process (Zamówienia)
- 3-column grid on desktop → 1-column on mobile (remove intermediate here — steps are tall)
- Each step: numbered circle (caramel accent bg) at the top of the card, then `<h3>` and `<p>`
- Remove the background image (`background2.jpg`) from this section — keeps it clean and consistent with editorial style
- Section label: "Prosty proces"
- Keep the note box below the steps

### Contact (Kontakt)
- 2-column grid (contact info left, info card right) → 1-column on mobile
- Section label: "Napisz do mnie"
- CTA buttons: "Napisz e-mail" (filled) + "Instagram →" (ghost)
- Aside card: cream accent background (`--accent-bg`), border radius 14px — no box shadow

### Footer
- Minimal: italic serif brand name left, copyright center, "Do góry ↑" link right
- No changes in structure

## Responsive Breakpoints

| Breakpoint | px | Change |
|---|---|---|
| Wide desktop | ≥1100px | Full 3-column grids |
| Desktop | 820px–1099px | Cards: 2-column; Hero strip: 2 visible slides |
| Tablet | 560px–819px | Cards: 2-column; Gallery: 2 slides visible; Hero: stacked |
| Mobile | ≤559px | All grids: 1-column; Gallery: 1.2 slides; Hamburger nav |

## Bug Fixes

| Issue | Fix |
|---|---|
| Gallery fixed pixel height causing bad cropping | Swiper slides use `aspect-ratio: 4/5` — no fixed heights |
| No mobile hamburger menu — nav overflows | New hamburger toggle with slide-down overlay nav |
| Grids jump 3→1 with no intermediate | New 2-column breakpoint at 820px for cards/gallery |
| Hero section uses background-image overlay pattern | Replaced with clean cream background + photo strip Swiper |
| `piece1.jpg`, `piece2.jpg`, `piece3.jpg` unused | Added to gallery carousel and hero photo strip |
| `video.mp4` unused | Remains unused — not in scope for this redesign |
| Placeholder contact data | Flag for user to fill in: email, phone number |

## Libraries

### Swiper.js
- CDN: `https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css` + `.js`
- Usage: hero photo strip (autoplay, loop) + gallery carousel (manual navigation)
- Two separate Swiper instances with different configs

### GLightbox
- CDN: `https://cdn.jsdelivr.net/gh/mcstudios/glightbox/dist/css/glightbox.min.css` + `.js`
- Usage: gallery images — each `<img>` wrapped in `<a class="glightbox" href="assets/images/X.jpg">`
- Init: `GLightbox({ selector: '.glightbox' })`

## Out of Scope

- New sections (testimonials, pricing, Instagram feed)
- Domain / hosting changes
- Contact form (currently links to email/Instagram)
- Image optimization / WebP conversion (separate concern)
- Video integration
- Polish text content changes

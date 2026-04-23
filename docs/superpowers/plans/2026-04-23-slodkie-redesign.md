# Ciasta Joasi Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Modernize the Ciasta Joasi one-page website to a polished, mobile-first Modern Editorial design with a Magazine-style hero, Swiper carousel gallery with GLightbox, and a hamburger mobile nav.

**Architecture:** Pure static site — single `index.html` + `css/styles.css` + new `js/main.js`. Two CDN libraries added (Swiper.js v11 for hero strip and gallery carousel, GLightbox v3.3 for image lightbox). All other changes are vanilla HTML/CSS. No build step, no package manager.

**Tech Stack:** HTML5, vanilla CSS (CSS custom properties, CSS Grid, Flexbox), Swiper.js 11 (CDN), GLightbox 3.3 (CDN), vanilla JS (hamburger toggle + library inits)

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `index.html` | Modify | All structural HTML changes |
| `css/styles.css` | Modify | All style changes — typography, layout, components, breakpoints |
| `js/main.js` | Create | Hamburger toggle, Swiper hero init, Swiper gallery init, GLightbox init, year update |
| `.gitignore` | Create/Modify | Exclude `.superpowers/` brainstorm session files |

---

## Task 1: CDN libraries + js/main.js scaffold

**Files:**
- Modify: `index.html`
- Create: `js/main.js`

- [ ] **Step 1: Add Swiper and GLightbox CSS links to `<head>` in `index.html`**

  In `index.html`, add after the existing `<link rel="stylesheet" href="css/styles.css">` line:

  ```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/biati-digital/glightbox@3.3.0/dist/css/glightbox.min.css" />
  ```

- [ ] **Step 2: Replace the inline `<script>` block at the bottom of `index.html`**

  Remove the existing `<script>` block (the one with `document.getElementById('year')...`). Replace it with:

  ```html
  <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/biati-digital/glightbox@3.3.0/dist/js/glightbox.min.js"></script>
  <script src="js/main.js"></script>
  ```

  Place this block immediately before `</body>`.

- [ ] **Step 3: Create `js/main.js` with scaffold**

  Create `js/main.js` with this content:

  ```js
  document.getElementById('year').textContent = new Date().getFullYear();

  // Hamburger nav — wired up in Task 3
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(open));
      mobileNav.classList.toggle('open', open);
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('open');
      });
    });
  }

  // Hero strip Swiper — wired up in Task 4
  if (document.querySelector('.hero-swiper')) {
    new Swiper('.hero-swiper', {
      loop: true,
      autoplay: { delay: 3200, disableOnInteraction: false },
      slidesPerView: 1.8,
      spaceBetween: 10,
      breakpoints: {
        560: { slidesPerView: 2.4, spaceBetween: 10 },
        820: { slidesPerView: 3, spaceBetween: 12 },
      },
      grabCursor: true,
    });
  }

  // Gallery Swiper — wired up in Task 8
  if (document.querySelector('.gallery-swiper')) {
    new Swiper('.gallery-swiper', {
      loop: false,
      slidesPerView: 1.2,
      spaceBetween: 12,
      navigation: { nextEl: '.gallery-next', prevEl: '.gallery-prev' },
      pagination: { el: '.gallery-pagination', clickable: true },
      grabCursor: true,
      breakpoints: {
        560: { slidesPerView: 2, spaceBetween: 12 },
        820: { slidesPerView: 3, spaceBetween: 12 },
      },
    });
  }

  // GLightbox — wired up in Task 8
  if (typeof GLightbox !== 'undefined') {
    GLightbox({ selector: '.glightbox' });
  }
  ```

- [ ] **Step 4: Open `index.html` in a browser and verify no console errors**

  Open `index.html` directly in Chrome/Firefox (file:// is fine). Open DevTools → Console. Expected: no errors about missing scripts. Swiper and GLightbox are loaded even though no elements use them yet.

- [ ] **Step 5: Commit**

  ```bash
  git add js/main.js index.html
  git commit -m "feat: add Swiper and GLightbox CDN, scaffold js/main.js"
  ```

---

## Task 2: Design system typography (CSS)

**Files:**
- Modify: `css/styles.css`

- [ ] **Step 1: Add font variables to `:root` in `css/styles.css`**

  In the `:root` block (top of the file), add two new variables after the existing ones:

  ```css
  --font-serif: Georgia, 'Times New Roman', serif;
  --font-sans: system-ui, -apple-system, Segoe UI, Roboto, Arial, "Helvetica Neue", sans-serif;
  ```

  Also update `--bg-alt` to the slightly warmer tone used in the mockup:
  ```css
  --bg-alt: #fdf9f5;
  ```

- [ ] **Step 2: Update `body` font-family to use the new variable**

  Find the `body { ... }` rule and change:
  ```css
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, "Helvetica Neue", sans-serif;
  ```
  to:
  ```css
  font-family: var(--font-sans);
  ```

- [ ] **Step 3: Add `.section-label` class**

  Add after the `.section-head p` rule:

  ```css
  .section-label {
    display: block;
    font-size: 0.6rem;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--accent-2);
    font-weight: 700;
    margin-bottom: 0.4rem;
  }
  ```

- [ ] **Step 4: Update section headings to use serif font**

  Find `.section-head h2` and change to:

  ```css
  .section-head h2 {
    margin: 0 0 .4rem;
    font-size: clamp(1.4rem, 2.5vw, 2rem);
    font-family: var(--font-serif);
    font-weight: 400;
  }
  ```

- [ ] **Step 5: Update logo to use serif italic**

  Find the `.logo { display: inline-flex; ... }` block and add:

  ```css
  .logo {
    display: inline-flex;
    align-items: center;
    gap: .6rem;
    font-size: 1.1rem;
    font-weight: 400;
    font-family: var(--font-serif);
    font-style: italic;
    color: var(--accent-2);
  }
  ```

  Remove the separate `font-weight: 800;` from the first `.logo` block (the one with `text-decoration:none; color:var(--text); font-weight:800;`) — update it entirely to match:

  ```css
  .logo {
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: .6rem;
    font-size: 1.15rem;
    font-weight: 400;
    font-family: var(--font-serif);
    font-style: italic;
    color: var(--accent-2);
    letter-spacing: 0;
  }
  ```

- [ ] **Step 6: Update nav CTA pill to filled style**

  Find `.nav-cta` and replace with:

  ```css
  .nav-cta {
    padding: .45rem 1rem;
    border-radius: 999px;
    border: none;
    background: var(--accent);
    color: #1b120b;
    font-weight: 700;
    font-size: 0.9rem;
  }
  .nav-cta:hover {
    background: var(--accent-2);
    color: #fff;
  }
  ```

- [ ] **Step 7: Open browser, verify logo is italic serif and section headings look different from body text**

  No console errors expected. The logo should look like italic cursive text.

- [ ] **Step 8: Commit**

  ```bash
  git add css/styles.css
  git commit -m "feat: add serif typography, section-label class, updated logo and nav CTA styles"
  ```

---

## Task 3: Header — desktop CTA + hamburger mobile nav

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`

- [ ] **Step 1: Update the `<header>` HTML in `index.html`**

  Replace the entire `<header class="site-header">` block with:

  ```html
  <header class="site-header">
    <div class="wrap header-inner">
      <a class="logo" href="#top" aria-label="Strona główna">
        <img src="assets/images/favicon.png" alt="" class="logo-icon">Ciasta Joasi
      </a>
      <nav class="main-nav" aria-label="Główna nawigacja">
        <a href="#oferta">Oferta</a>
        <a href="#o-mnie">O mnie</a>
        <a href="#galeria">Galeria</a>
        <a href="#zamowienia">Zamówienia</a>
        <a class="nav-cta" href="#kontakt">Kontakt</a>
      </nav>
      <button class="hamburger" aria-label="Otwórz menu" aria-expanded="false">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
    <nav class="mobile-nav" aria-label="Nawigacja mobilna">
      <a href="#oferta">Oferta</a>
      <a href="#o-mnie">O mnie</a>
      <a href="#galeria">Galeria</a>
      <a href="#zamowienia">Zamówienia</a>
      <a href="#kontakt">Kontakt</a>
    </nav>
  </header>
  ```

- [ ] **Step 2: Add `position: relative` to `.site-header` in `css/styles.css`**

  Find `.site-header` and add `position: relative;` so the absolute-positioned mobile nav is anchored to it:

  ```css
  .site-header {
    position: sticky;
    top: 0;
    background: rgba(255,253,250,.95);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    z-index: 50;
  }
  ```

  Note: remove `background: rgba(255,255,255,.9)` (replace with the warmer tone above).

- [ ] **Step 3: Add hamburger button CSS**

  Add after the `.nav-cta:hover` rule:

  ```css
  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    flex-shrink: 0;
  }
  .hamburger span {
    display: block;
    width: 22px;
    height: 2px;
    background: var(--text);
    border-radius: 2px;
    transition: transform .2s ease, opacity .2s ease;
  }
  .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity: 0; }
  .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  ```

- [ ] **Step 4: Add mobile nav CSS**

  Add after the hamburger CSS:

  ```css
  .mobile-nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(255,253,250,.98);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    flex-direction: column;
    z-index: 48;
  }
  .mobile-nav.open { display: flex; }
  .mobile-nav a {
    text-decoration: none;
    color: var(--text);
    font-weight: 600;
    font-size: 1rem;
    padding: .9rem 1.5rem;
    border-bottom: 1px solid var(--border);
  }
  .mobile-nav a:last-child { border-bottom: none; }
  .mobile-nav a:hover { color: var(--accent-2); }
  ```

- [ ] **Step 5: Update the mobile nav breakpoint rule**

  Find the existing `@media (max-width: 720px)` block for `.main-nav` and replace it with:

  ```css
  @media (max-width: 720px) {
    .main-nav { display: none; }
    .hamburger { display: flex; }
  }
  ```

- [ ] **Step 6: Verify at 375px width in browser DevTools**

  Open browser → DevTools → Toggle device toolbar → set width to 375px.
  Expected: hamburger icon visible (3 lines), nav links hidden. Tap hamburger → mobile nav slides down with all 5 links. Tap a link → nav closes and page scrolls to section.

- [ ] **Step 7: Verify at 1024px width**

  Expected: hamburger hidden, desktop nav links visible, "Kontakt" shows as a filled caramel pill.

- [ ] **Step 8: Commit**

  ```bash
  git add index.html css/styles.css
  git commit -m "feat: add hamburger mobile nav and desktop nav CTA pill"
  ```

---

## Task 4: Hero — Magazine Style

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`

- [ ] **Step 1: Replace the hero section HTML in `index.html`**

  Find the entire `<section class="hero" id="top">` block and replace it with:

  ```html
  <section class="hero" id="top">
    <div class="wrap hero-intro">
      <p class="hero-kicker">· Poznań · Domowe wypieki z serca ·</p>
      <h1><em>Ciasta Joasi</em><br><span class="hero-h1-sub">na zamówienie — tak jak w domu</span></h1>
      <p class="lead">Piekę z pasji, która towarzyszy mi od zawsze. Każdy wypiek przygotowuję ręcznie, z uważnością na smak, świeżość i detale.</p>
      <div class="hero-actions">
        <a class="btn primary" href="#zamowienia">Jak zamówić</a>
        <a class="btn" href="#galeria">Zobacz galerię →</a>
      </div>
    </div>
    <div class="hero-strip">
      <div class="swiper hero-swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide"><img src="assets/images/hero.jpg" alt="Domowy tort" /></div>
          <div class="swiper-slide"><img src="assets/images/piece1.jpg" alt="Wypiek domowy" /></div>
          <div class="swiper-slide"><img src="assets/images/piece2.jpg" alt="Ciasto na zamówienie" /></div>
          <div class="swiper-slide"><img src="assets/images/piece3.jpg" alt="Tort urodzinowy" /></div>
          <div class="swiper-slide"><img src="assets/images/1.jpg" alt="Realizacja" /></div>
        </div>
      </div>
    </div>
  </section>
  ```

- [ ] **Step 2: Replace the hero CSS rules in `css/styles.css`**

  Find and delete all of the following hero CSS blocks:
  - `.hero { padding: 3.5rem 0 2rem; background: radial-gradient... }`
  - `.hero-inner { display:grid; ... }`
  - `.kicker { ... }`
  - `.hero h1 { ... }`
  - `.lead { ... }`
  - `.hero-actions { ... }`
  - `.btn { ... }` — keep this one, only remove hero-specific rules
  - `.hero-bullets { ... }`
  - `.hero-media img { ... }`
  - `.hero { position: relative; background-image: url(...) ... }` (the second hero block)
  - `.hero::before { ... }`
  - `.hero > .wrap { position: relative; z-index: 1; }`
  - `@media (max-width: 900px) { .hero-inner { ... } .hero-media img { ... } }`

  Then add the new hero CSS:

  ```css
  /* =========================================================
     HERO — MAGAZINE STYLE
  ========================================================= */
  .hero {
    background: var(--bg);
    padding: 3.5rem 0 0;
  }

  .hero-intro {
    text-align: center;
    padding-bottom: 2.25rem;
  }

  .hero-kicker {
    margin: 0 0 .75rem;
    font-size: .7rem;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--accent-2);
    font-weight: 700;
  }

  .hero h1 {
    margin: 0 0 .75rem;
    font-family: var(--font-serif);
    font-size: clamp(2.2rem, 5vw, 3.4rem);
    font-weight: 400;
    line-height: 1.1;
  }

  .hero h1 em {
    font-style: italic;
    color: var(--accent-2);
  }

  .hero-h1-sub {
    display: block;
    font-family: var(--font-sans);
    font-size: clamp(1rem, 2.5vw, 1.4rem);
    font-style: normal;
    color: var(--text);
    font-weight: 400;
    margin-top: .3rem;
  }

  .lead {
    margin: 0 0 1.5rem;
    color: var(--muted);
    font-size: 1rem;
    max-width: 52ch;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
  }

  .hero-actions {
    display: flex;
    gap: .8rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .hero-strip {
    width: 100%;
    overflow: hidden;
  }

  .hero-swiper {
    width: 100%;
  }

  .hero-swiper .swiper-slide {
    border-radius: var(--radius) var(--radius) 0 0;
    overflow: hidden;
    aspect-ratio: 4 / 5;
  }

  .hero-swiper .swiper-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  ```

- [ ] **Step 3: Verify hero in browser at 1280px**

  Expected: Italic serif "Ciasta Joasi" centred, subtitle below, lead text, two pill buttons, then a horizontal strip of cake photos below. The strip should autoplay and show ~3 photos.

- [ ] **Step 4: Verify hero at 375px**

  Expected: Title stacks naturally, buttons wrap if needed, photo strip shows ~1.8 slides (peek of second).

- [ ] **Step 5: Commit**

  ```bash
  git add index.html css/styles.css
  git commit -m "feat: replace hero with magazine-style centred layout + Swiper photo strip"
  ```

---

## Task 5: Trust strip — inline style (no cards)

**Files:**
- Modify: `css/styles.css`

- [ ] **Step 1: Replace trust strip CSS**

  Find the entire `/* TRUST STRIP */` section and replace with:

  ```css
  /* =========================================================
     TRUST STRIP
  ========================================================= */
  .trust {
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    background: var(--bg-alt);
    padding: 1.25rem 0;
  }
  .trust-inner {
    display: flex;
    justify-content: center;
    align-items: stretch;
    gap: 0;
    flex-wrap: wrap;
  }
  .trust-item {
    text-align: center;
    padding: .5rem 2.5rem;
    border-right: 1px solid var(--border);
    background: transparent;
    border-radius: 0;
    box-shadow: none;
    border-top: none;
    border-bottom: none;
    border-left: none;
  }
  .trust-item:last-child { border-right: none; }
  .trust-item strong { display: block; margin-bottom: .2rem; font-size: .9rem; }
  .trust-item span { color: var(--muted); font-size: .85rem; }

  @media (max-width: 560px) {
    .trust-inner { flex-direction: column; align-items: stretch; }
    .trust-item {
      border-right: none;
      border-bottom: 1px solid var(--border);
      padding: .85rem 1.5rem;
    }
    .trust-item:last-child { border-bottom: none; }
  }
  ```

- [ ] **Step 2: Verify trust strip in browser at 1280px**

  Expected: 3 items in a horizontal row separated by thin vertical lines, no box/card shadow.

- [ ] **Step 3: Verify at 375px**

  Expected: 3 items stacked, separated by thin horizontal lines.

- [ ] **Step 4: Commit**

  ```bash
  git add css/styles.css
  git commit -m "feat: trust strip to inline style with border separators"
  ```

---

## Task 6: Offer section — icons, section label, intermediate breakpoint

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`

- [ ] **Step 1: Add section label and icons to offer HTML in `index.html`**

  Find the `<section class="section" id="oferta">` block. Update `<header class="section-head">` to add the label:

  ```html
  <header class="section-head">
    <span class="section-label">Co przygotowuję</span>
    <h2>Oferta</h2>
    <p>Od lekkich, owocowych wypieków po klasyczne, bogate smaki — przygotuję słodkości, które pasują do Twojej okazji.</p>
  </header>
  ```

  Then add a `.card-icon` div as the first child of each `<article class="card">`:

  ```html
  <!-- First card -->
  <article class="card">
    <div class="card-icon">🎂</div>
    <h3>Torty okolicznościowe</h3>
    ...
  </article>

  <!-- Second card -->
  <article class="card">
    <div class="card-icon">🍰</div>
    <h3>Ciasta domowe</h3>
    ...
  </article>

  <!-- Third card -->
  <article class="card">
    <div class="card-icon">🌟</div>
    <h3>Świąteczne klasyki</h3>
    ...
  </article>
  ```

- [ ] **Step 2: Add `.card-icon` CSS and fix breakpoints**

  Find the `/* CARDS (OFFER) */` section in `css/styles.css`. Add `.card-icon` and update the media query:

  ```css
  .card-icon {
    width: 40px;
    height: 40px;
    background: rgba(212,163,115,.12);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    margin-bottom: .75rem;
  }

  @media (max-width: 980px) {
    .cards { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 560px) {
    .cards { grid-template-columns: 1fr; }
  }
  ```

  Remove the old `@media (max-width: 980px) { .cards { grid-template-columns: 1fr; } }` rule (the one going straight to 1 column).

- [ ] **Step 3: Verify at 1280px**

  Expected: 3 cards with small emoji icons in rounded squares at the top of each card.

- [ ] **Step 4: Verify at 768px**

  Expected: Cards in a 2-column grid (not 1 column as before).

- [ ] **Step 5: Verify at 375px**

  Expected: Single column cards.

- [ ] **Step 6: Commit**

  ```bash
  git add index.html css/styles.css
  git commit -m "feat: offer cards with icons, section label, and 2-column intermediate breakpoint"
  ```

---

## Task 7: About section — section label

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`

- [ ] **Step 1: Add section label to about HTML**

  Find the `<section class="section alt" id="o-mnie">` block. Update the `about-text` div to add the label before `<h2>`:

  ```html
  <div class="about-text">
    <span class="section-label">Kim jestem</span>
    <h2>O mnie</h2>
    <p>...</p>
    <p>...</p>
  </div>
  ```

  Keep all existing paragraph text unchanged.

- [ ] **Step 2: Update about heading to use serif font**

  In `css/styles.css`, find the `/* ABOUT */` section. After `.about-text p`, add:

  ```css
  .about-text h2 {
    font-family: var(--font-serif);
    font-weight: 400;
    font-size: clamp(1.4rem, 2.5vw, 2rem);
    margin: 0 0 .75rem;
  }
  ```

- [ ] **Step 3: Fix about image breakpoint**

  Find the `@media (max-width: 900px)` for `.about` and update to:

  ```css
  @media (max-width: 820px) {
    .about { grid-template-columns: 1fr; }
    .about-media { order: -1; }
    .about-media img { aspect-ratio: 16 / 9; }
  }
  ```

  This moves the photo above the text on mobile (more natural reading order) and changes the breakpoint to 820px to match the other sections.

- [ ] **Step 4: Verify at 1280px**

  Expected: "Kim jestem" label above "O mnie" heading in serif. Photo on the right.

- [ ] **Step 5: Verify at 768px**

  Expected: Photo stacked above text, wide (16:9 ratio).

- [ ] **Step 6: Commit**

  ```bash
  git add index.html css/styles.css
  git commit -m "feat: about section label, serif h2, photo reorders above text on mobile"
  ```

---

## Task 8: Gallery — Swiper carousel + GLightbox

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`

- [ ] **Step 1: Replace the gallery section HTML in `index.html`**

  Find the entire `<section class="section" id="galeria">` block and replace it with:

  ```html
  <section class="section" id="galeria">
    <div class="wrap">
      <header class="section-head">
        <span class="section-label">Realizacje</span>
        <h2>Galeria</h2>
        <p>Przykładowe realizacje. Każdy wypiek może wyglądać inaczej — dopasuję styl do Twojej wizji. Kliknij zdjęcie, żeby zobaczyć w pełnym rozmiarze.</p>
      </header>

      <div class="swiper gallery-swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <a class="glightbox" href="assets/images/1.jpg" data-gallery="gallery" data-description="Tort urodzinowy">
              <img src="assets/images/1.jpg" alt="Tort urodzinowy" loading="lazy" />
            </a>
          </div>
          <div class="swiper-slide">
            <a class="glightbox" href="assets/images/2.jpg" data-gallery="gallery" data-description="Ciasto z owocami">
              <img src="assets/images/2.jpg" alt="Ciasto z owocami" loading="lazy" />
            </a>
          </div>
          <div class="swiper-slide">
            <a class="glightbox" href="assets/images/3.jpg" data-gallery="gallery" data-description="Makowiec">
              <img src="assets/images/3.jpg" alt="Makowiec" loading="lazy" />
            </a>
          </div>
          <div class="swiper-slide">
            <a class="glightbox" href="assets/images/4.jpg" data-gallery="gallery" data-description="Sernik">
              <img src="assets/images/4.jpg" alt="Sernik" loading="lazy" />
            </a>
          </div>
          <div class="swiper-slide">
            <a class="glightbox" href="assets/images/5.jpg" data-gallery="gallery" data-description="Tarta">
              <img src="assets/images/5.jpg" alt="Tarta" loading="lazy" />
            </a>
          </div>
          <div class="swiper-slide">
            <a class="glightbox" href="assets/images/6.jpg" data-gallery="gallery" data-description="Słodki stół">
              <img src="assets/images/6.jpg" alt="Wypieki na stół" loading="lazy" />
            </a>
          </div>
          <div class="swiper-slide">
            <a class="glightbox" href="assets/images/piece1.jpg" data-gallery="gallery" data-description="Wypiek domowy">
              <img src="assets/images/piece1.jpg" alt="Wypiek domowy" loading="lazy" />
            </a>
          </div>
          <div class="swiper-slide">
            <a class="glightbox" href="assets/images/piece2.jpg" data-gallery="gallery" data-description="Ciasto na zamówienie">
              <img src="assets/images/piece2.jpg" alt="Ciasto na zamówienie" loading="lazy" />
            </a>
          </div>
          <div class="swiper-slide">
            <a class="glightbox" href="assets/images/piece3.jpg" data-gallery="gallery" data-description="Tort">
              <img src="assets/images/piece3.jpg" alt="Tort" loading="lazy" />
            </a>
          </div>
        </div>
      </div>

      <div class="gallery-controls">
        <button class="gallery-prev" aria-label="Poprzednie zdjęcie">‹</button>
        <div class="gallery-pagination"></div>
        <button class="gallery-next" aria-label="Następne zdjęcie">›</button>
      </div>
    </div>
  </section>
  ```

- [ ] **Step 2: Replace gallery CSS in `css/styles.css`**

  Find the entire `/* GALLERY */` section and replace with:

  ```css
  /* =========================================================
     GALLERY — SWIPER CAROUSEL
  ========================================================= */
  .gallery-swiper {
    width: 100%;
    overflow: hidden;
  }

  .gallery-swiper .swiper-slide {
    aspect-ratio: 4 / 5;
    border-radius: var(--radius);
    overflow: hidden;
    box-shadow: var(--shadow);
  }

  .gallery-swiper .swiper-slide a {
    display: block;
    width: 100%;
    height: 100%;
  }

  .gallery-swiper .swiper-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform .35s ease;
  }

  .gallery-swiper .swiper-slide img:hover {
    transform: scale(1.04);
  }

  .gallery-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 1.25rem;
  }

  .gallery-prev,
  .gallery-next {
    width: 38px;
    height: 38px;
    border: 1px solid var(--border);
    border-radius: 50%;
    background: #fff;
    cursor: pointer;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text);
    box-shadow: 0 2px 8px rgba(0,0,0,.06);
    transition: box-shadow .15s ease;
    line-height: 1;
    padding: 0;
  }

  .gallery-prev:hover,
  .gallery-next:hover { box-shadow: var(--shadow); }

  .gallery-prev:disabled,
  .gallery-next:disabled { opacity: .35; cursor: default; box-shadow: none; }

  .gallery-pagination {
    display: flex;
    gap: 6px;
    align-items: center;
  }

  .gallery-pagination .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    background: var(--border);
    border-radius: 50%;
    opacity: 1;
    transition: width .2s ease, background .2s ease, border-radius .2s ease;
    cursor: pointer;
  }

  .gallery-pagination .swiper-pagination-bullet-active {
    background: var(--accent);
    width: 20px;
    border-radius: 3px;
  }
  ```

- [ ] **Step 3: Verify gallery carousel at 1280px**

  Expected: 3 slides visible, each in 4:5 portrait ratio. Arrows left/right of pagination dots. Click an arrow → slides advance. Active pagination dot expands to pill shape.

- [ ] **Step 4: Verify lightbox at 1280px**

  Expected: Clicking a photo opens GLightbox overlay (dark backdrop, full-size image centred, close button top-right, left/right arrows to navigate gallery).

- [ ] **Step 5: Verify at 768px**

  Expected: 2 slides visible. Peek of a third.

- [ ] **Step 6: Verify at 375px**

  Expected: 1.2 slides visible (peek of second). Swipe gesture works.

- [ ] **Step 7: Commit**

  ```bash
  git add index.html css/styles.css
  git commit -m "feat: replace gallery grid with Swiper carousel + GLightbox, add all 9 images"
  ```

---

## Task 9: Order process — section label, remove background image, step-num circles

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`

- [ ] **Step 1: Update the order process section HTML in `index.html`**

  Find `<section class="section alt" id="zamowienia">`. Update the `<header>` to add the section label:

  ```html
  <header class="section-head">
    <span class="section-label">Prosty proces</span>
    <h2>Zamówienia</h2>
    <p>Prosty proces — żebyś mógł/mogła spokojnie czekać na efekt.</p>
  </header>
  ```

  Then update each `<li>` inside `<ol class="steps">` to add a `.step-num` span at the top (before `<h3>`):

  ```html
  <ol class="steps">
    <li>
      <span class="step-num">1</span>
      <h3>Napisz wiadomość</h3>
      <p>Podaj okazję, datę, liczbę porcji oraz preferencje smakowe (np. czekolada, owoce, wanilia).</p>
    </li>
    <li>
      <span class="step-num">2</span>
      <h3>Ustalamy szczegóły</h3>
      <p>Wspólnie doprecyzujemy wygląd, smak, dodatki i ewentualne alergie. Doradzę najlepsze rozwiązania.</p>
    </li>
    <li>
      <span class="step-num">3</span>
      <h3>Wypiek i odbiór</h3>
      <p>W umówionym terminie wypiek jest gotowy. Otrzymujesz świeży produkt, przygotowany specjalnie dla Ciebie.</p>
    </li>
  </ol>
  ```

- [ ] **Step 2: Update the STEPS CSS in `css/styles.css`**

  Find the entire `/* STEPS */` section and replace with:

  ```css
  /* =========================================================
     STEPS
  ========================================================= */
  .steps {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin: 1.25rem 0 1rem;
  }

  .steps li {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.2rem;
    box-shadow: 0 6px 16px rgba(0,0,0,.05);
  }

  .step-num {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(212,163,115,.18);
    border: 1px solid rgba(212,163,115,.3);
    font-size: .82rem;
    font-weight: 800;
    color: var(--accent-2);
    margin-bottom: .75rem;
  }

  .steps h3 { margin: 0 0 .4rem; }
  .steps p { margin: 0; color: var(--muted); font-size: .9rem; }

  .note {
    margin-top: 1rem;
    background: rgba(176,137,104,.10);
    border: 1px solid rgba(176,137,104,.20);
    padding: 1rem;
    border-radius: var(--radius);
  }
  .note p { margin: 0; color: #3a2a1f; }

  @media (max-width: 820px) {
    .steps { grid-template-columns: 1fr; }
  }
  ```

- [ ] **Step 3: Remove the background-image rules for `#zamowienia`**

  Find and delete these three blocks from `css/styles.css`:

  ```css
  #zamowienia {
    position: relative;
    background-image: url("../assets/images/background2.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  #zamowienia::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.7);
    z-index: 0;
  }
  #zamowienia > .wrap {
    position: relative;
    z-index: 1;
  }
  ```

- [ ] **Step 4: Verify at 1280px**

  Expected: "Prosty proces" label above "Zamówienia" heading. Each step card has a caramel circle with number at top. No background photo behind this section — plain `--bg-alt` cream.

- [ ] **Step 5: Verify at 768px**

  Expected: Steps stack to 1 column.

- [ ] **Step 6: Commit**

  ```bash
  git add index.html css/styles.css
  git commit -m "feat: order section label, step-num circles, remove background image"
  ```

---

## Task 10: Contact section — section label + button polish

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`

- [ ] **Step 1: Update contact section HTML in `index.html`**

  Find `<section class="section" id="kontakt">`. Add the section label before the `<h2>`:

  ```html
  <div class="contact-text">
    <span class="section-label">Napisz do mnie</span>
    <h2>Kontakt</h2>
    <p>
      Chcesz zamówić tort, makowiec albo coś zupełnie nowego? Napisz do mnie — odpowiem i pomogę dobrać najlepszą opcję.
    </p>

    <ul class="contact-list">
      <li><strong>Instagram:</strong> <a href="https://www.instagram.com/ciasta_joasi/" target="_blank" rel="noopener noreferrer">ciasta_joasi</a></li>
      <li><strong>E-mail:</strong> <a href="mailto:hello@example.com">hello@example.com</a></li>
      <li><strong>Telefon:</strong> <a href="tel:+48000000000">+48 000 000 000</a></li>
      <li><strong>Lokalizacja:</strong> Poznań i okolice</li>
    </ul>

    <div class="contact-actions">
      <a class="btn primary" href="mailto:hello@example.com">Napisz e-mail</a>
      <a class="btn" href="https://www.instagram.com/ciasta_joasi/" target="_blank" rel="noopener noreferrer">Instagram →</a>
    </div>
  </div>
  ```

  Note: `hello@example.com` and `+48 000 000 000` are placeholder values — replace with real data when available.

- [ ] **Step 2: Update contact heading to use serif**

  In `css/styles.css`, find the `/* CONTACT */` section and add after `.contact-text p`:

  ```css
  .contact-text h2 {
    font-family: var(--font-serif);
    font-weight: 400;
    font-size: clamp(1.4rem, 2.5vw, 2rem);
    margin: 0 0 .75rem;
  }
  ```

- [ ] **Step 3: Update contact breakpoint**

  Find `@media (max-width: 980px) { .contact { grid-template-columns: 1fr; } }` and change to:

  ```css
  @media (max-width: 820px) {
    .contact { grid-template-columns: 1fr; }
  }
  ```

- [ ] **Step 4: Verify at 1280px**

  Expected: "Napisz do mnie" label, serif h2, two buttons — filled "Napisz e-mail" and ghost "Instagram →".

- [ ] **Step 5: Commit**

  ```bash
  git add index.html css/styles.css
  git commit -m "feat: contact section label, serif h2, Instagram CTA button, breakpoint fix"
  ```

---

## Task 11: Footer serif branding + .gitignore

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`
- Create/Modify: `.gitignore`

- [ ] **Step 1: Update footer HTML in `index.html`**

  Find the `<footer class="site-footer">` block and replace with:

  ```html
  <footer class="site-footer">
    <div class="wrap footer-inner">
      <span class="footer-brand">Ciasta Joasi</span>
      <p>© <span id="year"></span> · Domowe wypieki · Poznań</p>
      <a href="#top" class="backtop">Do góry ↑</a>
    </div>
  </footer>
  ```

- [ ] **Step 2: Add `.footer-brand` CSS**

  Find the `/* FOOTER */` section in `css/styles.css` and add:

  ```css
  .footer-brand {
    font-family: var(--font-serif);
    font-style: italic;
    color: var(--accent-2);
    font-size: 1rem;
  }
  ```

- [ ] **Step 3: Create or update `.gitignore`**

  Check if `.gitignore` exists:

  ```bash
  ls C:/Users/bdur/workspace/slodkie/.gitignore 2>/dev/null || echo "missing"
  ```

  If missing, create it. If present, open and append. Either way, ensure this line exists:

  ```
  .superpowers/
  ```

- [ ] **Step 4: Verify footer at 1280px**

  Expected: Italic serif "Ciasta Joasi" on the left, copyright centre, "Do góry ↑" right.

- [ ] **Step 5: Commit**

  ```bash
  git add index.html css/styles.css .gitignore
  git commit -m "feat: footer serif branding, add .gitignore for .superpowers"
  ```

---

## Task 12: Final responsive audit + wrap-up

**Files:**
- Modify: `index.html` (if any fixes found)
- Modify: `css/styles.css` (if any fixes found)

- [ ] **Step 1: Test at 375px (mobile)**

  Open browser DevTools, set width to 375px. Scroll through every section. Check:
  - [ ] Header: hamburger visible, no nav overflow
  - [ ] Hero: title readable, buttons not too wide, photo strip shows ~1.8 slides
  - [ ] Trust strip: 3 items stacked with horizontal dividers
  - [ ] Offer: 1-column cards with icons
  - [ ] About: photo above text, wide (16:9)
  - [ ] Gallery: 1.2 slides visible, arrows and dots visible below
  - [ ] Steps: 1-column list
  - [ ] Contact: 1-column, buttons side by side
  - [ ] Footer: items wrap or remain inline

- [ ] **Step 2: Test at 768px (tablet)**

  Set width to 768px. Check:
  - [ ] Header: desktop nav visible (no hamburger)
  - [ ] Hero: photo strip shows ~2.4 slides
  - [ ] Offer: 2-column cards
  - [ ] Gallery: 2 slides visible
  - [ ] Steps: 1-column (820px breakpoint — tablet hits this)
  - [ ] About: 1-column (820px breakpoint)

- [ ] **Step 3: Test at 1024px (desktop)**

  Set width to 1024px. Check:
  - [ ] Offer: 2-column cards (980px threshold)
  - [ ] Gallery: 3 slides visible
  - [ ] About: 2-column

- [ ] **Step 4: Test at 1280px (wide desktop)**

  Set width to 1280px. Check:
  - [ ] Offer: 3-column cards
  - [ ] Gallery: 3 slides visible
  - [ ] Everything centred within 1100px max-width

- [ ] **Step 5: Test gallery lightbox on each breakpoint**

  Click a gallery image at 375px, 768px, and 1280px. Expected: GLightbox opens, shows full image, navigate left/right through all 9 images, close button works.

- [ ] **Step 6: Test hamburger open/close cycle on mobile**

  At 375px: tap hamburger → nav opens. Tap a nav link → nav closes AND page scrolls to section. Tap hamburger again → nav opens. Tap outside (no mechanism for this yet in current JS, but link-tap works).

  If the "tap outside to close" behaviour is desired, add this to `js/main.js` after the mobileNav link listeners:

  ```js
  document.addEventListener('click', (e) => {
    if (mobileNav.classList.contains('open') &&
        !mobileNav.contains(e.target) &&
        !hamburger.contains(e.target)) {
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('open');
    }
  });
  ```

- [ ] **Step 7: Fix any issues found in steps 1-6**

  Apply fixes, then re-verify the affected breakpoints.

- [ ] **Step 8: Final commit**

  ```bash
  git add -A
  git commit -m "feat: final responsive audit fixes and tap-outside-to-close nav"
  ```

---

## Spec Coverage Check

| Spec requirement | Task |
|---|---|
| Modern Editorial visual style | Task 2 (typography, CSS tokens) |
| Magazine-style hero (centered + panoramic strip) | Task 4 |
| Swiper.js for hero strip | Task 1 (CDN + init) + Task 4 (HTML) |
| Swiper.js for gallery carousel | Task 1 (CDN + init) + Task 8 (HTML + CSS) |
| GLightbox for gallery images | Task 1 (CDN + init) + Task 8 (HTML) |
| Mobile hamburger nav | Task 3 |
| Section labels above all h2s | Tasks 6, 7, 8, 9, 10 |
| Card icons in offer section | Task 6 |
| Trust strip inline (no cards) | Task 5 |
| Intermediate 2-column breakpoint | Tasks 6, 8 |
| Gallery: no fixed pixel heights (aspect-ratio) | Task 8 |
| Gallery: all 9 images (incl. piece1/2/3) | Task 8 |
| Hero: piece1/2/3 images used in strip | Task 4 |
| Remove hero background-image | Task 4 |
| Remove order section background-image | Task 9 |
| Step-num circles (replace CSS counter) | Task 9 |
| About: photo moves above text on mobile | Task 7 |
| Footer serif italic branding | Task 11 |
| `.gitignore` for `.superpowers/` | Task 11 |
| Contact serif h2 + Instagram CTA | Task 10 |
| Tap-outside-to-close mobile nav | Task 12 |

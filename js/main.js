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

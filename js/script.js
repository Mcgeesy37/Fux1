// Jahr im Footer (alle Seiten)
document.querySelectorAll('#year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// Mobile-Nav
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => mainNav.classList.toggle('open'));
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mainNav.classList.remove('open'));
  });
}

// Scroll Reveal
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 70);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealEls.forEach(el => observer.observe(el));
}

// Lightbox mit Tastaturnavigation
const lightbox    = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev  = document.getElementById('lightboxPrev');
const lightboxNext  = document.getElementById('lightboxNext');

let galleryImages = [];
let currentIndex  = 0;

if (lightbox) {
  galleryImages = Array.from(document.querySelectorAll('.img-item img'));

  const open = (i) => {
    currentIndex = i;
    lightboxImg.src = galleryImages[i].src;
    lightboxImg.alt = galleryImages[i].alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  const prev = () => { currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length; lightboxImg.src = galleryImages[currentIndex].src; };
  const next = () => { currentIndex = (currentIndex + 1) % galleryImages.length; lightboxImg.src = galleryImages[currentIndex].src; };

  galleryImages.forEach((img, i) => img.parentElement.addEventListener('click', () => open(i)));
  lightboxClose.addEventListener('click', close);
  if (lightboxPrev) lightboxPrev.addEventListener('click', prev);
  if (lightboxNext) lightboxNext.addEventListener('click', next);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  prev();
    if (e.key === 'ArrowRight') next();
  });
}

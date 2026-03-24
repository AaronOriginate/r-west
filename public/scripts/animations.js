document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('anim-ready');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.anim-up, .anim-left, .anim-scale').forEach(el => observer.observe(el));

  // Nav hide on scroll down, show on scroll up
  const nav = document.querySelector('nav');
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    nav.classList.toggle('scrolled', currentY > 60);
    if (currentY > lastScrollY && currentY > 100) {
      nav.classList.add('nav-hidden');
    } else {
      nav.classList.remove('nav-hidden');
    }
    lastScrollY = currentY;
  }, { passive: true });

  // Hero parallax
  const heroImgs = document.querySelectorAll('.hero-gradient img');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroImgs.forEach(img => {
        const flip = img.dataset.flip === 'x' ? ' scaleX(-1)' : '';
        img.style.transform = `translateY(${y * 0.08}px)${flip}`;
      });
    }
  }, { passive: true });

  // About section carousel
  const aboutSlides = document.querySelectorAll('.about-slide');
  let aboutCurrent = 0;
  if (aboutSlides.length > 1) {
    setInterval(() => {
      aboutSlides[aboutCurrent].classList.remove('active');
      aboutCurrent = (aboutCurrent + 1) % aboutSlides.length;
      aboutSlides[aboutCurrent].classList.add('active');
    }, 4000);
  }
});

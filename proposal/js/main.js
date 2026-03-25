/* ==========================================================================
   main.js — GSAP Animation Engine
   Shared across all pages. Handles scroll-triggered reveals, hero entrance,
   SplitText, animated counters, and Swiper initialization.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  /* ------------------------------------------------------------------
     Reduced Motion — Skip all animations
     ------------------------------------------------------------------ */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Make sure everything is visible even without animation
    document.querySelectorAll('[data-animate]').forEach(el => {
      el.style.opacity = '1';
    });
    initSwiper();
    return;
  }

  /* ------------------------------------------------------------------
     Register GSAP Plugins
     ------------------------------------------------------------------ */
  gsap.registerPlugin(ScrollTrigger);
  if (typeof SplitText !== 'undefined') {
    gsap.registerPlugin(SplitText);
  }

  const bouncy = 'cubic-bezier(0.48, 0.16, 0.2, 1.21)';

  /* ------------------------------------------------------------------
     Hero Entrance — Page load, NOT scroll-triggered
     CRITICAL: Targets .hero [data-animate] (descendants only)
     ------------------------------------------------------------------ */
  const heroElements = document.querySelectorAll('.hero [data-animate]');
  if (heroElements.length) {
    heroElements.forEach((el, i) => {
      gsap.from(el, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        delay: 0.2 + (i * 0.1),
        ease: bouncy
      });
    });
  }

  /* ------------------------------------------------------------------
     SplitText — Hero headline word-by-word reveal
     ------------------------------------------------------------------ */
  if (typeof SplitText !== 'undefined') {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      SplitText.create('.hero-title', {
        type: 'words',
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.words, {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.04,
            ease: bouncy
          });
        }
      });
    }
  }

  /* ------------------------------------------------------------------
     Scroll-Triggered Reveals — data-animate attribute
     Skips elements inside .hero (handled above)
     ------------------------------------------------------------------ */
  document.querySelectorAll('[data-animate]').forEach(el => {
    // Skip hero children — already animated on page load
    if (el.closest('.hero')) return;
    // Skip children inside stagger containers — handled by stagger handler
    if (el.closest('[data-stagger]')) return;

    const type = el.getAttribute('data-animate');
    const props = { opacity: 0 };

    switch (type) {
      case 'fade-up':
        props.y = 30;
        break;
      case 'fade-right':
        props.x = -30;
        break;
      case 'fade-left':
        props.x = 30;
        break;
      case 'zoom-in':
        props.scale = 0.95;
        break;
      case 'fade':
      default:
        // opacity only
        break;
    }

    gsap.from(el, {
      ...props,
      duration: 0.5,
      ease: bouncy,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true
      }
    });
  });

  /* ------------------------------------------------------------------
     Staggered Children — data-stagger containers
     ------------------------------------------------------------------ */
  document.querySelectorAll('[data-stagger]').forEach(container => {
    // Skip stagger containers inside .hero
    if (container.closest('.hero')) return;

    const children = container.querySelectorAll('[data-animate]');
    if (!children.length) return;

    gsap.from(children, {
      y: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: bouncy,
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        once: true
      }
    });
  });

  /* ------------------------------------------------------------------
     Animated Counters — data-count + data-suffix
     ------------------------------------------------------------------ */
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';

    // Set initial display
    el.textContent = '0' + suffix;

    gsap.to(el, {
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true
      },
      onUpdate: function () {
        const progress = this.progress();
        const current = Math.round(target * progress);
        el.textContent = current + suffix;
      }
    });
  });

  /* ------------------------------------------------------------------
     Swiper Initialization
     ------------------------------------------------------------------ */
  initSwiper();

  /* ------------------------------------------------------------------
     ScrollTrigger Refresh — After images load
     ------------------------------------------------------------------ */
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });
});

/* ======================================================================
   Swiper Init (separated so it runs even with reduced motion)
   ====================================================================== */
function initSwiper() {
  const swiperEl = document.querySelector('.swiper');
  if (!swiperEl || typeof Swiper === 'undefined') return;

  const swiper = new Swiper('.testimonials-carousel', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    effect: 'fade',
    fadeEffect: { crossFade: true },
    autoplay: {
      delay: 5000,
      disableOnInteraction: true
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '" role="button" aria-label="Go to slide ' + (index + 1) + '"></span>';
      }
    },
    keyboard: {
      enabled: true
    },
    a11y: {
      prevSlideMessage: 'Previous testimonial',
      nextSlideMessage: 'Next testimonial',
      firstSlideMessage: 'This is the first testimonial',
      lastSlideMessage: 'This is the last testimonial'
    }
  });
}

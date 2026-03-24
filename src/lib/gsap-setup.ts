/**
 * GSAP Animation Utilities — R. West & Son
 *
 * Two animation paradigms: CSS scroll-driven + GSAP.
 * This module owns all GSAP-powered animations.
 * Every function respects prefers-reduced-motion.
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Check if user prefers reduced motion */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Hero text reveal — line-by-line entrance
 * Each .hero-text-line child fades up with stagger.
 * Spec: 1.2s, 0.15s stagger, power3.out, 0.3s delay
 */
export function heroTextReveal(container: HTMLElement): gsap.core.Timeline | null {
  const lines = container.querySelectorAll('.hero-text-line')
  if (!lines.length) return null

  if (prefersReducedMotion()) {
    gsap.set(lines, { opacity: 1, y: 0 })
    return null
  }

  const tl = gsap.timeline({ delay: 0.3 })

  tl.from(lines, {
    opacity: 0,
    y: 40,
    duration: 1.2,
    stagger: 0.15,
    ease: 'power3.out',
  })

  return tl
}

/**
 * Heritage timeline scroll-draw — THE signature moment
 * Vertical maroon line draws downward via scrub:2.
 * Events reveal from alternating sides.
 * Spec: scrub:2, power2.out, x:-60/+60
 */
export function timelineScrollDraw(container: HTMLElement): ScrollTrigger | null {
  const line = container.querySelector('.timeline-line') as HTMLElement
  const events = container.querySelectorAll('.timeline-event')
  const dots = container.querySelectorAll('.timeline-dot')

  if (!line || !events.length) return null

  if (prefersReducedMotion()) {
    gsap.set(line, { scaleY: 1 })
    gsap.set(events, { opacity: 1, x: 0 })
    gsap.set(dots, { scale: 1, opacity: 1 })
    return null
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top 60%',
      end: 'bottom 40%',
      scrub: 2,
      pin: false,
    },
  })

  // Draw the line
  tl.fromTo(
    line,
    { scaleY: 0 },
    { scaleY: 1, transformOrigin: 'top center', ease: 'none' }
  )

  // Reveal event nodes from alternating sides
  events.forEach((event, i) => {
    const direction = i % 2 === 0 ? -60 : 60
    tl.from(
      event,
      {
        opacity: 0,
        x: direction,
        duration: 0.3,
        ease: 'power2.out',
      },
      i * 0.12
    )
  })

  // Dot markers bloom into existence (only place overshoot is permitted)
  dots.forEach((dot, i) => {
    tl.from(
      dot,
      {
        scale: 0,
        opacity: 0,
        duration: 0.2,
        ease: 'back.out(1.4)',
      },
      i * 0.12
    )
  })

  return tl.scrollTrigger!
}

/**
 * Maroon curtain reveal — homepage "One Company" section
 * A ::before overlay (maroon) slides up to reveal the image beneath.
 * Spec: 1.0s, power2.out, triggered on viewport entry
 */
export function maroonCurtainReveal(element: HTMLElement): ScrollTrigger | null {
  if (prefersReducedMotion()) {
    gsap.set(element, { '--curtain-progress': 1 })
    return null
  }

  const trigger = ScrollTrigger.create({
    trigger: element,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.to(element, {
        '--curtain-progress': 1,
        duration: 1.0,
        ease: 'power2.out',
      })
    },
  })

  return trigger
}

/**
 * Slot-machine digit roll counter
 * Each digit physically rolls like a mechanical counter.
 * Spec: 2s, power3.out, scroll-triggered
 */
export function slotMachineCounter(
  element: HTMLElement,
  target: number
): ScrollTrigger | null {
  const digitContainers = element.querySelectorAll('.digit-roller')

  if (prefersReducedMotion()) {
    // Show final digits immediately
    digitContainers.forEach((container, i) => {
      const digit = String(target).padStart(digitContainers.length, ' ')[i]
      const strip = container.querySelector('.digit-strip') as HTMLElement
      if (strip && digit !== ' ') {
        gsap.set(strip, { y: `-${Number(digit) * 10}%` })
      }
    })
    return null
  }

  const trigger = ScrollTrigger.create({
    trigger: element,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      const digits = String(target)
      digitContainers.forEach((container, i) => {
        const digit = digits[i]
        const strip = container.querySelector('.digit-strip') as HTMLElement
        if (strip && digit !== undefined) {
          gsap.to(strip, {
            y: `-${Number(digit) * 10}%`,
            duration: 2,
            ease: 'power3.out',
            delay: i * 0.15,
          })
        }
      })
    },
  })

  return trigger
}

/**
 * Sticky nav transform
 * Utility bar hides, nav compresses, phone migrates.
 * Spec: triggered at 80px, 0.4s cubic-bezier(0.23, 1, 0.32, 1)
 *
 * Note: The foundation Navbar already handles this with vanilla JS.
 * This function provides a GSAP-driven alternative if needed.
 */
export function stickyNavTransform(): ScrollTrigger | null {
  const utilityBar = document.getElementById('utility-bar')
  const mainNav = document.getElementById('main-nav')
  const navPhone = document.getElementById('nav-phone')

  if (!mainNav) return null

  // Nav already has its own scroll handler from foundation.
  // This is the GSAP version — only use if replacing the vanilla one.
  const trigger = ScrollTrigger.create({
    start: 80,
    onUpdate: (self) => {
      const scrolled = self.direction === 1 && window.scrollY > 80

      if (utilityBar) {
        gsap.to(utilityBar, {
          marginTop: scrolled ? -utilityBar.offsetHeight : 0,
          opacity: scrolled ? 0 : 1,
          duration: prefersReducedMotion() ? 0 : 0.4,
          ease: 'power2.out',
          overwrite: true,
        })
      }

      if (navPhone) {
        navPhone.style.display = scrolled ? 'inline-flex' : ''
      }

      if (mainNav) {
        mainNav.style.boxShadow = window.scrollY > 10 ? 'var(--shadow-md)' : 'none'
      }
    },
  })

  return trigger
}

/**
 * Storytelling hero photo scale-in
 * Workshop photo has a gentle scale from 1.05 to 1.0 over 2s.
 */
export function heroPhotoReveal(element: HTMLElement): gsap.core.Tween | null {
  if (prefersReducedMotion()) {
    gsap.set(element, { scale: 1, opacity: 1 })
    return null
  }

  return gsap.from(element, {
    scale: 1.05,
    opacity: 0.8,
    duration: 2,
    delay: 0.5,
    ease: 'power2.out',
  })
}

/**
 * "1910" watermark fade-in
 * Subtle appearance, 5-8% opacity target
 */
export function watermarkFadeIn(element: HTMLElement): gsap.core.Tween | null {
  if (prefersReducedMotion()) {
    gsap.set(element, { opacity: 0.07 })
    return null
  }

  return gsap.from(element, {
    opacity: 0,
    duration: 2.5,
    delay: 0.8,
    ease: 'power2.out',
  })
}

/**
 * Kill all ScrollTrigger instances — call on cleanup
 */
export function killAllScrollTriggers(): void {
  ScrollTrigger.getAll().forEach((t) => t.kill())
}

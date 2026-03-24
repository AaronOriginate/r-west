/**
 * Lenis Smooth Scroll — R. West & Son
 *
 * Enabled ONLY on editorial pages: Home, Our Story, Our Work.
 * Respects prefers-reduced-motion. Syncs with GSAP ticker.
 * lerp: 0.1 — the slow, buttery catch-up that defines editorial scroll feel.
 */
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Pages that get Lenis smooth scroll */
const EDITORIAL_PAGES = ['/', '/our-story', '/our-work']

let lenisInstance: Lenis | null = null
let rafId: number | null = null

/**
 * Check if the current page is an editorial page
 */
function isEditorialPage(): boolean {
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  return EDITORIAL_PAGES.includes(path)
}

/**
 * Create and start Lenis
 */
function createLenis(): Lenis {
  const lenis = new Lenis({
    lerp: 0.1,
    orientation: 'vertical',
    smoothWheel: true,
  })

  // Connect Lenis scroll events to GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update)

  // Add Lenis raf to GSAP ticker (convert s to ms)
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  // Disable GSAP lag smoothing for Lenis compatibility
  gsap.ticker.lagSmoothing(0)

  return lenis
}

/**
 * Destroy the current Lenis instance
 */
function destroyLenis(): void {
  if (lenisInstance) {
    lenisInstance.destroy()
    lenisInstance = null
  }
}

/**
 * Initialize Lenis smooth scroll.
 * Call this from the layout script. It will only activate on editorial pages
 * and only when prefers-reduced-motion is not set.
 */
export function initLenis(): void {
  if (!isEditorialPage()) return

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

  // Do not init if reduced motion is preferred
  if (motionQuery.matches) return

  lenisInstance = createLenis()

  // Listen for changes to prefers-reduced-motion
  motionQuery.addEventListener('change', (e) => {
    if (e.matches) {
      destroyLenis()
    } else if (isEditorialPage()) {
      destroyLenis()
      lenisInstance = createLenis()
    }
  })
}

/**
 * Get the current Lenis instance (for scrollTo, etc.)
 */
export function getLenis(): Lenis | null {
  return lenisInstance
}

/**
 * Scroll to a target using Lenis (with sticky nav offset)
 */
export function scrollTo(target: string | HTMLElement, offset = -80): void {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset })
  } else {
    // Fallback to native scroll
    const el = typeof target === 'string' ? document.querySelector(target) : target
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}

/**
 * Cleanup — call on page teardown
 */
export function cleanupLenis(): void {
  destroyLenis()
}

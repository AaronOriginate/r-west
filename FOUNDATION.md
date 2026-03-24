FOUNDATION REPORT
Date: 2026-03-23

--- PROJECT STRUCTURE ---

build/
  public/
    fonts/          (5 files: InstrumentSerif Regular+Italic, DMSans Variable+Italic, JetBrainsMono)
    images/         (40 files: all brand assets + unsplash + generated grain.png)
  src/
    components/
      Button.astro         Primary/outline/ghost variants with CVA-style classes
      Container.astro      Grid column wrapper (content/popout/feature/full)
      CtaBanner.astro      Maroon bg, dual CTA (quote + phone), reused on every page
      Footer.astro         Multi-column, timber grain texture, trust badges, Since 1910
      HeritageRule.astro   2px x 48px maroon decorative line
      Navbar.astro         Utility bar + main nav, sticky transform, mega dropdown, mobile overlay
      Section.astro        Section wrapper with theme (light/parchment/dark/maroon), spacing, grain
      SectionHeading.astro Instrument Serif h2 with optional heritage rule
    layouts/
      BaseLayout.astro     HTML boilerplate, font preloads, meta tags, nav, footer, reveal observer
    lib/
      images.ts            All image paths mapped with TypeScript types
      utils.ts             cn() helper (clsx + tailwind-merge)
    pages/
      index.astro                Home (7 sections)
      our-story.astro            Our Story (5 sections)
      our-work.astro             Our Work (3 sections)
      reviews.astro              Reviews (4 sections)
      faq.astro                  FAQ (3 sections)
      insights.astro             Insights (3 sections)
      where-we-work.astro        Where We Work (5 sections)
      contact.astro              Contact (4 sections)
      services/
        index.astro              Services Overview (4 sections)
        export-packing.astro     Export Packing (7 sections)
        wooden-packaging.astro   Wooden Packaging (6 sections)
        cnc-services.astro       CNC Services (6 sections)
    styles/
      global.css           All design tokens, @font-face, Tailwind v4 @theme, grid, animations


--- DESIGN TOKENS ---

Colors: 15 custom properties (primary x5, neutrals x4, dark x3, gold, error, success)
Fonts: Instrument Serif (display) + DM Sans (body) + JetBrains Mono (technical)
Type scale: 14 sizes (--text-hero through --text-mono)
Line heights: 4 (tight, snug, normal, relaxed)
Letter spacing: 4 (tight, normal, wide, wider)
Spacing: 8 levels (--space-xs through --space-hero)
Shadows: 3 levels (sm, md, lg) — warm brown-based
Grid: Mulligan breakout (content/popout/feature/full columns)
Breakpoints: 5 (sm 640, md 768, lg 1024, xl 1280, 2xl 1440)


--- BASE COMPONENTS ---

| Component      | Path                        | Variants                        | Notes                           |
|----------------|-----------------------------|---------------------------------|---------------------------------|
| Button         | src/components/Button.astro | primary, outline, ghost + 3 sizes | Uses cn() for class merging   |
| Container      | src/components/Container.astro | content, popout, feature, full | Grid column wrapper            |
| Section        | src/components/Section.astro | light, parchment, dark, maroon  | With grain overlay support     |
| CtaBanner      | src/components/CtaBanner.astro | customisable headline/subtext | Maroon bg, dual CTA            |
| Footer         | src/components/Footer.astro | —                               | Timber grain, trust badges     |
| Navbar         | src/components/Navbar.astro | —                               | Sticky, mega dropdown, mobile  |
| HeritageRule   | src/components/HeritageRule.astro | —                          | 2px x 48px maroon line         |
| SectionHeading | src/components/SectionHeading.astro | left/center, with/without rule | Instrument Serif + rule    |


--- PAGE TEMPLATES ---

| Page               | Route                        | Sections (placeholders)                                    |
|--------------------|------------------------------|------------------------------------------------------------|
| Home               | /                            | hero, segment-routing, since-1910, promise, testimonial, case-studies, cta |
| Our Story          | /our-story                   | hero, timeline, by-the-numbers, workshop-today, cta        |
| Services           | /services                    | hero, service-cards, promise, cta                          |
| Export Packing     | /services/export-packing     | hero, ispm15, who-needs-it, process, certifications, testimonials, cta |
| Wooden Packaging   | /services/wooden-packaging   | hero, what-we-build, process, cnc-integration, testimonials, cta |
| CNC Services       | /services/cnc-services       | hero, what-cnc-does, applications, process, testimonials, cta |
| Our Work           | /our-work                    | hero, case-studies, cta                                    |
| Reviews            | /reviews                     | hero, testimonials, logos, cta                             |
| FAQ                | /faq                         | hero, faq-accordion, cta                                   |
| Insights           | /insights                    | hero, blog-grid, cta                                       |
| Where We Work      | /where-we-work               | hero, ocean-quay, coverage, map, cta                       |
| Contact            | /contact                     | hero, contact-form, map, cta                               |


--- FOR PAGE BUILDERS ---

- Import base components from src/components/
- Use cn() from src/lib/utils for class merging
- Image paths available from src/lib/images.ts
- Follow section structure in page templates — fill in the placeholder divs
- Design tokens available via Tailwind classes (e.g., bg-primary, text-cream, font-display)
- CSS custom properties available directly (e.g., var(--text-h2), var(--space-lg))
- Mulligan breakout grid: add grid-popout / grid-feature / grid-full to break out of content width
- Section component handles theme (light/parchment/dark/maroon) and spacing
- CTA Banner already complete — just drop <CtaBanner /> at page bottom
- Nav and Footer already complete — BaseLayout wraps them automatically
- Grain texture ready: set grain={true} on Section for light sections, uses grain-dark for dark/maroon
- Dev server running on port 4322
- View Transitions DISABLED per spec
- No Framer Motion — use GSAP for animations, Radix for accordion

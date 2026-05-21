# 1. About the Client

- **Client:** Tealeaf Consulting
- **Company:** EN2H (Software Startup)
- **Role:** Part-time Developer
- **Industry:** Financial Advisory / Consulting
- **Company Size:** Boutique firm (founded by Angela Sweeney)
- **Location:** Remote / North America
- **Business Type:** Strategic financial advisory for venture-backed startup founders
- **Project Duration:** ~8 weeks
- **Target Market:** Founders and decision-makers at venture-backed startups in SaaS, biotech, fintech, and emerging technologies

This project was developed for Tealeaf Consulting on behalf of **EN2H** (a software startup), where I worked as a part-time developer. Tealeaf Consulting provides fractional CFO, financial controller, and bookkeeping services to startups looking to scale with intention. The founder brings 20+ years of experience, having helped scale 14+ startups and facilitated 16+ M&A transactions.

---

# 2. Business Challenge

Tealeaf Consulting's existing online presence did not reflect the caliber of its strategic advisory services. The challenges were:

1. **Outdated brand perception** - The previous website lacked the premium design expected by venture-backed founders evaluating financial partners.
2. **Low engagement** - Static content and poor mobile experience led to high bounce rates and minimal discovery call bookings.
3. **Undifferentiated positioning** - Competitor financial advisory firms all looked alike; Tealeaf's unique "scale with intention" philosophy was not clearly communicated.
4. **No lead generation mechanism** - The site had no clear calls to action or streamlined path for potential clients to book discovery calls.
5. **Poor storytelling** - The founder's impressive track record (14+ startups, $100M+ capital raised) was buried rather than featured as a core trust signal.

The firm needed a digital presence that would command the attention of busy founders and convert that attention into qualified leads — all while conveying strategic sophistication and operational competence.

---

# 3. Development Process

The project followed an agile methodology tailored for a high-fidelity marketing site:

- **Phase 1: Discovery & Wireframing** - Defining the narrative arc and user journey. Establishing the core "conversion funnel" for discovery calls.
- **Phase 2: Visual System** - Creating a component library focused on high-performance animation constraints, specifically targeting GSAP usage.
- **Phase 3: Development & Iteration** - Integrating GSAP ScrollSmoother and migrating from Vite to Next.js while maintaining strict performance budgets.
- **Phase 4: QA & Optimization** - Cross-device testing for touch/scroll behavior, video loading optimizations, and final SEO/metadata implementation.

---

# 4. Challenges Faced

- **Animation-Heavy Performance** - The design called for rich GSAP animations (ScrollSmoother, ScrollTrigger pinning, SVG morphing, parallax) across a single-page layout. Balancing cinematic motion with smooth 60fps performance (especially on the MorphSVG blob background) required aggressive GPU acceleration and careful optimization.

- **Mobile Responsiveness for Complex Layouts** - The service cards section uses a desktop-specific pin-and-stack scroll animation that had to gracefully degrade into a standard card layout on mobile. The accordion-style testimonials also required two entirely different interaction patterns depending on viewport size.

- **ScrollSmoother Integration** - Integrating GSAP ScrollSmoother (which intercepts native scrolling) with Next.js App Router navigation required careful handling to prevent hash-link scrolling from conflicting with the smooth scroll container. Custom `scrollTo` logic was needed.

- **Video Hero Performance** - The full-screen background video (hero.mp4) had to load instantly on page entry without layout shift or jank, while also respecting user data preferences and device capabilities.

- **Migration from Vite to Next.js** - The project was migrated mid-development from a Vite/React SPA to Next.js 16 App Router. This required reworking routing, navigation, metadata/SEO patterns, and ensuring all GSAP integrations remained stable under React 19's strict mode and server/client component boundaries.

- **SplitType Text Animation Timing** - Character-level text reveals using SplitType had to synchronize perfectly with ScrollTrigger and ScrollSmoother to avoid visual glitches during fast scrolling.

---

# 5. Personas

## Primary User - Startup Founder (CEO)

- **Description:** Founder or co-founder of a venture-backed startup, typically series Seed to Series B. Time-poor, decision-fatigued, evaluating multiple vendor partners.
- **Goals:** Find a trusted financial advisor who understands startup dynamics. Quickly assess credibility. Book a discovery call with minimal friction.
- **Pain Points:** Frustrated with generic accounting firms that don't understand venture-backed growth. Needs strategic insight, not just bookkeeping.
- **System Usage Behavior:** Scans the hero section, scrolls through pain points to validate relevance, reads founder credentials, then books a call. Spends under 90 seconds deciding whether to engage.

## Secondary User - Operations/Finance Lead

- **Description:** Head of Finance, COO, or fractional CFO evaluating Tealeaf as a complement to their own team.
- **Goals:** Understand the specific service tiers (Foundation, Growth, Strategic). Evaluate technical competence in financial operations.
- **System Interactions:** Dives deep into the three service pillars, reviews the stats counters, may return multiple times before initiating contact.

## Tertiary User - Investor / Board Member

- **Description:** Angel investor or board member who recommends Tealeaf to portfolio companies.
- **Goals:** Quickly validate Tealeaf as a credible recommendation. Access contact information and share the site with founders.
- **System Interactions:** Brief visit — checks credibility signals (stats, testimonials, founder bio), copies email, and forwards.

---

# 6. System Overview

## 6.1 System Diagram

_System diagram showing a single-page Next.js application served via Vercel's edge network. The frontend renders static content with client-side GSAP animations. No backend API or database exists. External integrations include Calendly (booking), mailto (email), and LinkedIn. SEO metadata and JSON-LD structured data are prerendered at build time. The architecture is: Browser ← Vercel CDN ← Next.js Static Export ← Build-time compiled React components with embedded data (testimonials, service content)._

## 6.2 Designs

A premium, conversion-focused design was created with a sophisticated navy-and-orange color palette. The visual hierarchy guides visitors from emotional resonance (pain points) through credibility (stats, testimonials) to action (CTA). Key design decisions:

- **Dark/light contrast rhythm** - Alternating between brand-cream and brand-dark sections creates visual pacing and emphasizes key content zones.
- **Cinematic hero** - Fullscreen video background with gradient overlay immediately establishes production quality and brand atmosphere.
- **Typographic hierarchy** - Playfair Display serif for headlines (premium, authoritative) paired with Manrope sans-serif for body text (clean, modern).
- **Animated storytelling** - Morphing SVG backgrounds, scroll-driven reveals, and a grayscale-to-color founder photo transform passive browsing into an engaging narrative experience.
- **Conversion-centric CTAs** - Strategically placed "Book a discovery call" buttons with the brand-accent orange draw attention at decision moments throughout the scroll journey.

## 6.3 Technologies Used

| Component       | Technology                                                |
| --------------- | --------------------------------------------------------- |
| Framework       | Next.js 16 (App Router)                                   |
| UI Library      | React 19                                                  |
| Language        | TypeScript (strict mode)                                  |
| Styling         | Tailwind CSS v4 with custom theme                         |
| Animation       | GSAP 3.14 (ScrollTrigger, ScrollSmoother, MorphSVGPlugin) |
| Text Animation  | Split-Type                                                |
| Icons           | Lucide React                                              |
| Hosting         | Vercel                                                    |
| Class Utilities | tailwind-merge                                            |
| Linting         | ESLint 9, Prettier, Husky                                 |

## 6.4 Features

- **Cinematic Splash Screen** - Full-screen logo reveal animation on initial visit sets a premium tone before transitioning into the main page.
- **Scroll-Driven Narrative** - GSAP ScrollSmoother provides buttery smooth scrolling while ScrollTrigger orchestrates section reveals, text animations, and the service card stacking effect based on scroll position.
- **Three-Tier Service Showcase** - Foundation Building, Growth Operations, and Strategic Advisory are presented as "strategic pillars" with a desktop pin-and-stack scroll mechanic that visually reinforces the progression from operational to strategic.
- **Credibility Dashboard** - Animated stats counters (14+ startups, $100M+ raised, 16+ M&A, 20+ years) with a grayscale-to-color founder photo reveal build trust through visual storytelling.
- **Responsive Testimonials** - Accordion-style on desktop (multiple open), expandable cards on mobile — social proof that adapts to the device.
- **Conversion-Optimized CTAs** - Multiple touchpoints throughout the scroll journey funnel visitors toward booking a Calendly discovery call, with a persistent navbar CTA.
- **SEO & Structured Data** - Full Open Graph, Twitter Card, and JSON-LD structured data (Organization, ProfessionalService, WebSite, Reviews) for rich search results.

---

# 7. Results and Benefits

- **Modern Brand Positioning** - The site now reflects the premium, strategic nature of Tealeaf's services, differentiating it from generic accounting firms.
- **Improved Engagement** - Smooth scroll animations and narrative pacing keep visitors engaged longer, increasing the likelihood of conversion.
- **Clear Service Differentiation** - The three-tier model (Foundation → Growth → Strategic) is immediately understandable, helping prospects self-qualify.
- **Streamlined Lead Generation** - Strategically placed Calendly CTAs reduce friction between interest and booking a discovery call.
- **Mobile-Optimized Experience** - Responsive design with tailored interaction patterns ensures the site performs across devices without compromising the brand experience.
- **Future-Proof Architecture** - Next.js 16 with strict TypeScript provides a solid foundation for future content additions without technical debt.

---

# 8. Lessons Learned

- **Performance budgeting for animation** - GSAP animations must be carefully performance-budgeted. The MorphSVG blob required desktop-only rendering to maintain 60fps on mid-tier devices. Future projects should establish mobile performance budgets earlier.
- **ScrollSmoother + App Router** - Integrating a custom scroll engine with Next.js App Router requires explicit handling for hash navigation and route changes. A ScrollTrigger refresh strategy on route change is essential.
- **Component-level 'use client' discipline** - During the Vite-to-Next.js migration, clearly delineating server and client boundaries early would have saved refactoring time. Every animated component needs `'use client'`, which limits server-side rendering for those sections.
- **Video as hero background** - Full-screen video creates a powerful first impression but requires careful preloading and fallback strategies. Autoplay policies and data-saver preferences must be accounted for.
- **Static site simplicity** - Choosing a static frontend (no backend/database) kept the project scope manageable and deployment trivial. Not every project needs a CMS — for a marketing site with stable content, static rendering is ideal.

---

# 9. Project Goals

1. **Establish premium brand positioning** that differentiates Tealeaf from generic financial advisory firms.
2. **Communicate the "scale with intention" philosophy** through visual storytelling rather than text-heavy explanations.
3. **Drive discovery call bookings** as the primary conversion metric.
4. **Build immediate credibility** through prominent display of founder credentials, stats, and testimonials.
5. **Deliver a cinematic browsing experience** that reflects the strategic sophistication of the services offered.

# 10. Performance Optimizations

- **GPU acceleration** - `force3D: true`, `translate3d(0,0,0)`, `will-change: transform` applied to all animated elements
- **Conditional rendering** - Heavy background components (MorphSVG blob, parallax shapes) are desktop-only, reducing mobile memory pressure
- **ScrollTrigger tuning** - `fastScrollEnd: true`, `anticipatePin: 1`, `invalidateOnRefresh` for smooth interaction during rapid scrolling
- **Animation cleanup** - `useGSAP` hooks ensure all timelines and ScrollTrigger instances are properly killed on unmount
- **Debounced refresh** - `debouncedScrollTriggerRefresh` prevents layout thrashing during resize events
- **SmoothSmoother touch handling** - `smoothTouch: 0` disables smooth scrolling on touch devices where it causes friction

# 11. Future Improvements

- **Blog/Resources section** - Add a content hub for financial strategy articles to improve SEO and nurture leads
- **Case study page** - Detailed client success stories with measurable outcomes (fundraising totals, operational savings)
- **Service comparison tool** - Interactive quiz or matrix helping founders identify which service tier fits their current stage
- **Newsletter signup** - Build an email list for ongoing lead nurturing
- **Analytics integration** - Deeper event tracking (scroll depth, CTA clicks, video engagement) to optimize conversion funnel conversion funnel

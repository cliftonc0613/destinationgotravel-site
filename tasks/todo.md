# Phase 5 — Pre-Launch Updates

## Tasks

- [x] **Task 1: Match destination card images between home page and destinations index**
  - Home page Specialties and destinations index use different images for the same destinations
  - Fix: Update `Specialties.astro` to use the same images as the destinations index page cards
  - Files: `src/components/sections/Specialties.astro`

- [x] **Task 2: Update insurance page body paragraph**
  - File: `src/pages/travel-insurance.astro`
  - Replace the two-paragraph block starting with "Dawn reviews your itinerary..." with the new approved copy

- [x] **Task 3: Update insurance page last bullet point**
  - File: `src/pages/travel-insurance.astro`
  - Change the last bullet to: "Dawn can assist with travel insurance claims - helping you to navigate the paperwork."

## Review
<!-- Added after completion -->

All three pre-launch tasks completed. Destination card images on the home page now match the destinations index, the insurance page body copy has been updated to approved copy, and the last bullet in the Good to Know aside reflects the correct wording.

## Launch Checklist

- [x] **Deploy to Netlify**
  - Connect the GitHub repo to a new Netlify site
  - Set build command: `npm run build`, publish directory: `dist`

- [x] **Connect custom domain**
  - Add `destinationgotravel.com` in Netlify domain settings
  - Update DNS records at registrar

- [x] **Enable Netlify Identity + Git Gateway**
  - Enable Identity in Netlify site settings
  - Enable Git Gateway under Identity > Services

- [ ] **Invite Dawn as CMS editor**
  - Send invite to `dawn@destinationgotravel.com` via Netlify Identity

- [ ] **Submit to Google Search Console**
  - Add property for `destinationgotravel.com`
  - Submit sitemap: `https://destinationgotravel.com/sitemap-index.xml`

- [ ] **Test form submissions**
  - Submit Plan My Trip form and confirm Netlify Forms receives it
  - Submit Greece waitlist form and confirm receipt

- [ ] **Cross-browser / device QA**
  - Test on Chrome, Safari, Firefox (desktop)
  - Test on iOS Safari and Android Chrome (mobile)

- [ ] **CMS smoke test**
  - Dawn logs into `/admin`, creates a draft post, publishes it end-to-end

## Schema Fixes (from SCHEMA-REPORT.md)

### Critical

- [x] **Add `address` (PostalAddress) to LocalBusiness on homepage**
  - File: `src/pages/index.astro`
  - Required by Google for local knowledge panel / map pack eligibility

- [x] **Add `logo` to Organization in SEOHead**
  - File: `src/components/seo/SEOHead.astro`
  - Must be absolute URL of the logo image — required for sitelinks logo in Google Search

- [x] **Add schema to gallery page**
  - File: `src/pages/gallery.astro`
  - Add `ImageGallery` (CollectionPage) schema via the `schema` prop

### Important

- [x] **Add BreadcrumbList to destination and blog subpages**
  - Affects: `src/pages/destinations/*`, `src/pages/blog/[slug].astro`
  - Enables breadcrumb rich results in SERPs

- [x] **Add `sameAs` to Person schema on About page**
  - File: `src/pages/about.astro`
  - Link Dawn's Facebook and Instagram profiles to confirm entity identity

- [x] **Add `description` to Service schemas on destinations index**
  - File: `src/pages/destinations/index.astro`
  - All four Service objects are missing `description`

- [x] **Add `@id` to blog CollectionPage schema**
  - File: `src/pages/blog/index.astro`
  - Required so the node can be referenced elsewhere in the graph

### Minor

- [x] **Add `WebPage` schema to Privacy Policy and Terms pages**
  - Files: `src/pages/privacy-policy.astro`, `src/pages/terms.astro`

- [x] **Add `contactPoint` to Organization schema**
  - File: `src/components/seo/SEOHead.astro`
  - Move `telephone` and `email` into a proper `contactPoint` with `contactType`

## Pre-Launch Gaps

- [ ] **Set up Google Analytics 4**
  - Get GA4 measurement ID from Dawn's Google account
  - Add GA4 script to `BaseLayout.astro`

- [x] **Add Apple touch icon and web manifest**
  - Create `apple-touch-icon.png` (180x180)
  - Add `manifest.webmanifest` for mobile home screen support
  - Link both in `SEOHead.astro`

- [x] **Add custom OG images to About and Travel Insurance pages**
  - `about.astro` — use Dawn's photo (`/images/dawn-owens.webp`)
  - `travel-insurance.astro` — use a relevant travel image

- [ ] **Add real blog posts before launch**
  - Seed blog with at least 2-3 published posts so it's not sparse
  - Dawn to provide content or approve drafts

# Phase 4 — SEO & Performance Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Complete all Phase 4 SEO and performance requirements: fix schema issues, add missing schemas, resolve CMS/config mismatch, audit OG images, and do an image optimization pass.

**Architecture:** All fixes are confined to existing .astro files and config files. No new dependencies. Build verification after every task via `npm run build`.

**Tech Stack:** Astro 6.x, CSS custom properties, JSON-LD, Zod content schemas, Sveltia CMS (config.yml)

---

## Audit Findings (pre-work — already done, do not repeat)

| # | Issue | Severity | File |
|---|-------|----------|------|
| 1 | Greece page uses `Event` schema instead of `Service` | High | `src/pages/destinations/greece.astro` |
| 2 | Blog index page has no JSON-LD schema | Medium | `src/pages/blog/index.astro` |
| 3 | CMS category enum mismatch (`All-Inclusive Resorts` / `General Travel` in config.yml vs `All-Inclusive` / `General` in config.ts) | High | `public/admin/config.yml` |
| 4 | Default OG image is `.jpg` — verify file exists at `public/images/ritz-carlton-resort-aerial-beach-pool.jpg` | Medium | `src/components/seo/SEOHead.astro` |
| 5 | Destination sub-pages and greece.astro have no custom ogImage | Low | Multiple pages |
| 6 | 4 components use CSS `background-image` — cannot use Astro `<Image />` but need `preload` hints for LCP images | Medium | Hero.astro, PhotoGallery.astro, Specialties.astro, greece.astro |

---

## Task 1: Fix Greece Page Schema (Event → Service)

**Files:**
- Modify: `src/pages/destinations/greece.astro`

**What to do:**

Replace the `Event` schema with a `Service` schema consistent with the other destination pages.

Current schema (lines 6–14 approx):
```js
const schema = {
  '@type': 'Event',
  name: 'Greece Group Trip 2026',
  ...
};
```

Replace with:
```js
const schema = {
  '@type': 'Service',
  name: 'Greece Group Trip — Luxury Travel Planning',
  description: 'Small-group luxury trip to Greece curated by Dawn Owens for empty nesters and retirees.',
  provider: {
    '@type': 'TravelAgency',
    name: 'DestinationGo Travel',
    url: 'https://destinationgotravel.com',
  },
  areaServed: 'Greece',
  serviceType: 'Group Travel Planning',
};
```

**Step 1:** Open `src/pages/destinations/greece.astro`, find the schema const at the top of the frontmatter block.

**Step 2:** Replace the `Event` schema object with the `Service` schema above.

**Step 3:** Run build to verify no errors:
```bash
npm run build
```
Expected: `17 page(s) built` with no errors.

**Step 4:** Commit:
```bash
git add src/pages/destinations/greece.astro
git commit -m "fix: replace Event schema with Service on greece page"
```

---

## Task 2: Add CollectionPage Schema to Blog Index

**Files:**
- Modify: `src/pages/blog/index.astro`

**What to do:**

Add a `CollectionPage` JSON-LD schema. The blog index currently passes no `schema` prop to `BaseLayout`.

**Step 1:** Open `src/pages/blog/index.astro`. Find the frontmatter block and the `BaseLayout` props.

**Step 2:** Add a schema const in the frontmatter:
```js
const schema = {
  '@type': 'CollectionPage',
  name: 'Travel Blog — DestinationGo Travel',
  description: 'Travel tips, destination guides, and planning advice for empty nesters and retirees from luxury travel advisor Dawn Owens.',
  url: 'https://destinationgotravel.com/blog',
  publisher: {
    '@type': 'Organization',
    name: 'DestinationGo Travel',
    url: 'https://destinationgotravel.com',
  },
};
```

**Step 3:** Pass it to `BaseLayout` (or wherever `SEOHead` receives the schema prop):
```astro
<BaseLayout schema={schema} ...otherProps>
```

**Step 4:** Build and verify:
```bash
npm run build
```

**Step 5:** Commit:
```bash
git add src/pages/blog/index.astro
git commit -m "feat: add CollectionPage schema to blog index"
```

---

## Task 3: Fix CMS Config Category Enum Mismatch

**Files:**
- Modify: `public/admin/config.yml`

**What to do:**

The `config.yml` category options (`All-Inclusive Resorts`, `General Travel`) don't match the Zod enum in `config.ts` (`All-Inclusive`, `General`). If Dawn saves a post with the CMS, the build will fail. Fix `config.yml` to match `config.ts` exactly.

**Step 1:** Open `public/admin/config.yml`. Find the category select field options.

Current (broken):
```yaml
options: [Europe, All-Inclusive Resorts, Cruises, General Travel]
```

**Step 2:** Change to match `config.ts` exactly:
```yaml
options: [Europe, All-Inclusive, Cruises, General]
```

**Step 3:** Open `src/content/config.ts` and verify the enum values match what you just set in config.yml. They should be: `['Europe', 'All-Inclusive', 'Cruises', 'General']`.

**Step 4:** Build:
```bash
npm run build
```

**Step 5:** Commit:
```bash
git add public/admin/config.yml
git commit -m "fix: align CMS category options with content config.ts enum"
```

---

## Task 4: Verify OG Image File and Fix Default if Needed

**Files:**
- Check: `public/images/ritz-carlton-resort-aerial-beach-pool.jpg` (does it exist?)
- Possibly modify: `src/components/seo/SEOHead.astro`

**What to do:**

The default OG image URL hardcoded in SEOHead.astro uses `.jpg`. Verify the file exists at that path.

**Step 1:** Run:
```bash
ls public/images/ritz-carlton-resort-aerial-beach-pool.*
```

**Step 2a — If `.jpg` exists:** No change needed. Note that the OG image is fine.

**Step 2b — If only `.webp` exists:** Update the default in `SEOHead.astro` to use the `.webp` extension. Find the line where the default ogImage is set (something like `const image = ogImage ?? '/images/ritz-carlton-resort-aerial-beach-pool.jpg'`) and change the extension.

**Step 3:** Build:
```bash
npm run build
```

**Step 4:** Commit if a change was made:
```bash
git add src/components/seo/SEOHead.astro
git commit -m "fix: correct default OG image file extension"
```

---

## Task 5: Add Custom OG Images to Key Destination Pages

**Files:**
- Modify: `src/pages/destinations/europe.astro`
- Modify: `src/pages/destinations/all-inclusive.astro`
- Modify: `src/pages/destinations/cruises.astro`
- Modify: `src/pages/destinations/greece.astro`

**What to do:**

Each destination page should have a relevant OG image instead of the default hero. These images already exist in `public/images/`.

**Step 1:** Check what images are available:
```bash
ls public/images/
```

**Step 2:** For each page, add an `ogImage` prop to the `BaseLayout` (or `SEOHead`) call using an appropriate image:

| Page | ogImage value |
|------|--------------|
| europe.astro | `/images/luxury-villa-pool-tropical-garden.jpg` (or .webp) |
| all-inclusive.astro | `/images/resort-pool-evening-palm-trees.jpg` (or .webp) |
| cruises.astro | `/images/royal-caribbean-star-of-the-seas-nassau.jpg` (or .webp) |
| greece.astro | Use whichever Greece hero image exists in public/images/ |

First verify each file extension with `ls public/images/` then use the exact filename.

**Step 3:** Build:
```bash
npm run build
```

**Step 4:** Commit:
```bash
git add src/pages/destinations/
git commit -m "feat: add custom ogImage to destination pages"
```

---

## Task 6: Add LCP Preload Hints for CSS Background Images

**Files:**
- Modify: `src/pages/index.astro`
- Check: `src/components/layout/Header.astro` (already has preloadImage?)

**What to do:**

The hero background image (`ritz-carlton-resort-aerial-beach-pool.webp`) is the LCP element on the home page but is loaded via CSS `background-image`, so the browser discovers it late. A `<link rel="preload">` hint fixes this.

`BaseLayout` / `SEOHead` already accepts a `preloadImage` prop — verify it's being passed on index.astro and that it points to the correct file.

**Step 1:** Open `src/pages/index.astro`. Check if `preloadImage` is passed to `BaseLayout`.

**Step 2:** If `preloadImage` is missing or pointing to wrong file, add/fix it:
```astro
<BaseLayout
  preloadImage="/images/ritz-carlton-resort-aerial-beach-pool.webp"
  ...otherProps
>
```

**Step 3:** Open `src/components/seo/SEOHead.astro` and confirm it renders:
```html
<link rel="preload" as="image" href={preloadImage} />
```
If not, add it inside the `<head>`.

**Step 4:** Build:
```bash
npm run build
```

**Step 5:** Commit if changes were made:
```bash
git add src/pages/index.astro src/components/seo/SEOHead.astro
git commit -m "perf: ensure hero LCP image is preloaded"
```

---

## Task 7: Image Optimization Pass — Verify All Public Images Are WebP

**What to do:**

Check every image in `public/images/` that is served as a `<img>` tag (not background) and ensure they have explicit `width` and `height` to prevent CLS.

**Step 1:** List all images:
```bash
ls -la public/images/
```

**Step 2:** Grep for any `<img` tags missing `width` or `height`:
```bash
grep -rn "<img" src/ | grep -v "width=" | grep -v "Image"
```

**Step 3:** For any found, add the correct `width` and `height` attributes matching the actual image dimensions.

**Step 4:** Build and commit if changes:
```bash
npm run build
git add src/
git commit -m "fix: add missing width/height to img tags for CLS prevention"
```

---

## Task 8: Mark Phase 4 Complete in PRD

**Files:**
- Modify: `../PRD.md` (one level up from site/)

**Step 1:** Open `PRD.md`. Find the Phase 4 checklist under section 14.

**Step 2:** Mark all Phase 4 items as complete:
```markdown
### Phase 4 — SEO & Performance
- [x] JSON-LD schema on all page types
- [x] Core Web Vitals audit + fixes
- [x] Image optimization pass (WebP, explicit dimensions)
- [x] Meta/OG audit across all pages
- [x] Local SEO copy review
- [x] Verify `config.yml` fields match `content/config.ts`
```

**Step 3:** Commit:
```bash
git add ../PRD.md
git commit -m "docs: mark Phase 4 complete in PRD"
```

---

## Verification Checklist

After all tasks complete, run these checks:

```bash
# Clean build with no errors
npm run build

# Verify schema on specific pages by checking built HTML
grep -l "Service" dist/destinations/greece/index.html
grep -l "CollectionPage" dist/blog/index.html

# Verify config.yml category fix
grep "All-Inclusive" ../public/admin/config.yml  # should NOT show "All-Inclusive Resorts"
```

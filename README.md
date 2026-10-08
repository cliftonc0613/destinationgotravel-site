# DestinationGo Travel Website

The website for **DestinationGo Travel**, a luxury travel advisory run by Dawn Owens in Upstate South Carolina. Live at [destinationgotravel.com](https://destinationgotravel.com).

This README assumes you know nothing about the project. Start at the top and read down, or jump to the section you need.

## Contents

1. [What this site is](#what-this-site-is)
2. [What visitors can do](#what-visitors-can-do)
3. [Site map](#site-map)
4. [Tech stack](#tech-stack)
5. [Quick start](#quick-start)
6. [Project structure](#project-structure)
7. [How to do common things](#how-to-do-common-things)
8. [Content management with Decap CMS](#content-management-with-decap-cms)
9. [Forms and lead capture](#forms-and-lead-capture)
10. [SEO setup](#seo-setup)
11. [Deployment](#deployment)
12. [Project status](#project-status)
13. [Further docs](#further-docs)
14. [Contacts](#contacts)

## What this site is

DestinationGo Travel is a marketing and lead-generation website. Dawn Owens is a luxury travel advisor who plans trips for empty nesters and retirees. Her three specialties are Europe, all-inclusive resorts, and cruises. Her planning service is free to clients because she earns commissions from travel suppliers.

The site exists to do three things:

- Build trust in Dawn as an advisor.
- Show what she specializes in.
- Turn visitors into trip inquiries.

It also supports local search for Greenville, Spartanburg, Anderson, and Clemson, SC, and it publishes blog posts that bring in search traffic.

It is a **static site**. Every page is built ahead of time into plain HTML, so it loads fast and needs no server or database.

## What visitors can do

- Read about Dawn and her background.
- Browse the three destination specialties and the Greece group trip.
- Read travel blog posts, filtered by category or tag.
- Send a trip inquiry through the Plan My Trip form.
- Book a free 30-minute call with Dawn through Calendly.
- Sign up for the newsletter from the footer.
- Look through the photo gallery.

## Site map

| Route | Page | File |
|---|---|---|
| `/` | Home | `src/pages/index.astro` |
| `/about` | About Dawn | `src/pages/about.astro` |
| `/destinations` | Destinations overview | `src/pages/destinations/index.astro` |
| `/destinations/europe` | Europe | `src/pages/destinations/europe.astro` |
| `/destinations/all-inclusive` | All-inclusive resorts | `src/pages/destinations/all-inclusive.astro` |
| `/destinations/cruises` | Cruises | `src/pages/destinations/cruises.astro` |
| `/destinations/greece` | Greece group trip | `src/pages/destinations/greece.astro` |
| `/plan-my-trip` | Trip inquiry form and call booking | `src/pages/plan-my-trip.astro` |
| `/travel-insurance` | Travel insurance guidance | `src/pages/travel-insurance.astro` |
| `/gallery` | Photo gallery | `src/pages/gallery.astro` |
| `/blog` | Blog index | `src/pages/blog/index.astro` |
| `/blog/[slug]` | One blog post | `src/pages/blog/[slug].astro` |
| `/blog/category/[category]` | Posts in one category | `src/pages/blog/category/[category].astro` |
| `/blog/tag/[tag]` | Posts with one tag | `src/pages/blog/tag/[tag].astro` |
| `/sitemap` | Human-readable sitemap | `src/pages/sitemap.astro` |
| `/privacy-policy` | Privacy policy | `src/pages/privacy-policy.astro` |
| `/terms` | Terms and conditions | `src/pages/terms.astro` |
| `/404` | Not-found page | `src/pages/404.astro` |

The file name in `src/pages/` becomes the URL. Trailing slashes are turned off (`trailingSlash: 'never'` in `astro.config.mjs`).

## Tech stack

| Piece | Choice | Why |
|---|---|---|
| Framework | [Astro](https://astro.build) 6 | Builds fast static pages and ships almost no JavaScript by default. |
| Styling | Plain CSS with custom properties | Brand colors and fonts live in one file, so changes are easy and consistent. |
| Content | Markdown files in `src/content/blog/` | Posts are plain text files that a CMS can read and write. |
| CMS | [Decap CMS](https://decapcms.org) 3.x | Gives Dawn a visual editor at `/admin` with no database. |
| Login | Netlify Identity and Git Gateway | Handles CMS logins and lets the CMS commit to GitHub for her. |
| Hosting | [Netlify](https://www.netlify.com) | Rebuilds and publishes the site on every push to `main`. |
| Sitemap | `@astrojs/sitemap` | Generates `sitemap-index.xml` for search engines. |
| Gallery | PhotoSwipe | Lightbox for gallery photos. |
| Fonts | Playfair Display, Cormorant Garamond, Lato | The brand typefaces, loaded from Google Fonts. |

## Quick start

**You need:** Node.js 22.12 or newer, and Git.

```sh
# 1. Clone the site repository
git clone https://github.com/cliftonc0613/destinationgotravel-site.git
cd destinationgotravel-site

# 2. Install dependencies
npm install

# 3. Start the local dev server
npm run dev
```

Open [http://localhost:4321](http://localhost:4321). The page reloads as you edit files.

| Command | What it does |
|---|---|
| `npm install` | Installs dependencies. |
| `npm run dev` | Starts the dev server at `localhost:4321`. |
| `npm run build` | Builds the production site into `dist/`. |
| `npm run preview` | Serves the built `dist/` folder locally so you can check it before deploying. |
| `npm run astro -- --help` | Shows help for the Astro command line. |

Run `npm run build` before you push. If the build fails locally, it will fail on Netlify too.

## Project structure

```text
site/
  astro.config.mjs        Astro settings: site URL, sitemap, no trailing slashes
  netlify.toml            Netlify build settings and the 404 rule
  package.json            Dependencies, scripts, and the site version
  public/                 Files served as-is (not processed by Astro)
    admin/                Decap CMS: index.html (the app) and config.yml (its settings)
    images/               Site photos in .jpg and .webp; blog/ holds blog hero images
    robots.txt            Crawler rules; points to the sitemap
    llms.txt              Plain-text summary of the business for AI search tools
    manifest.webmanifest  Web app manifest and favicons
  src/
    pages/                One file per page; the file name is the URL
    components/
      layout/             BaseLayout (the page shell), Header, Footer, PageHero
      sections/           Home page sections: Hero, TrustStrip, ProblemSection, ValueStack,
                          GuideSection, PlanSteps, Specialties, PhotoGallery, Explainer,
                          LeadCapture, SocialProof, FinalCTA, NewsletterBar
      blog/               TableOfContents for blog posts
      seo/                SEOHead: meta tags, social tags, and JSON-LD structured data
    content/
      blog/               Blog posts as .md files
    styles/
      global.css          Brand tokens, reset, and shared styles
  tasks/todo.md           Current task list and launch checklist
  docs/                   Plans, outlines, and the QA report
```

**Page shell.** Every page is wrapped in `BaseLayout.astro`. It supplies the `<head>`, the header and footer, the SEO tags, and the Netlify Identity script that the CMS login needs.

**Brand design tokens.** Colors, fonts, and the easing curve are CSS variables at the top of `src/styles/global.css`:

- Teal: `--teal-900` through `--teal-100`
- Gold: `--gold-700` through `--gold-200`
- Cream: `--cream-50` through `--cream-300`
- Ink (text): `--ink-900` through `--ink-300`
- Fonts: `--font-display`, `--font-heading`, `--font-sans`

Use these variables in your CSS. Do not paste raw hex values.

## How to do common things

### Add a blog post

You can use the CMS (see below) or add a file by hand.

1. Put the hero image in `public/images/blog/`. A `.webp` at about 1200 by 630 pixels works well.
2. Create `src/content/blog/your-post-slug.md`. The file name becomes the URL: `/blog/your-post-slug`.
3. Start the file with this frontmatter:

```md
---
title: "Your post title"
description: "One or two sentences, under 160 characters. Used for search results and social previews."
publishDate: 2026-10-08T09:00:00Z
heroImage: /images/blog/your-post-slug.webp
heroImageAlt: Describe the image for screen readers and search engines
category: Europe
tags: ["river cruise", "Italy"]
author: Dawn Owens
draft: false
---

Write the post body in Markdown here.
```

| Field | Required | Notes |
|---|---|---|
| `title` | Yes | Text. |
| `description` | Yes | Text. Used as the meta description. |
| `publishDate` | Yes | Date. |
| `updatedDate` | No | Date. Shown as the modified date in structured data. |
| `heroImage` | Yes | Path starting with `/images/blog/`. Also the social sharing image. |
| `heroImageAlt` | Yes | Text. |
| `category` | Yes | One of `Europe`, `All-Inclusive`, `Cruises`, `General`. |
| `tags` | No | List of text. Defaults to empty. |
| `author` | No | Defaults to `Dawn Owens`. |
| `draft` | No | `true` keeps the post out of the site. Defaults to `false`. |

The newest published post is shown as the featured card at the top of the blog index. The "Featured Post" checkbox in the CMS does not change this (see [Known issues](#known-issues)).

### Change text or images on a page

Open the page in `src/pages/`, or the matching section in `src/components/sections/`, and edit the text. Put new images in `public/images/` and refer to them with a path like `/images/my-photo.webp`. Always write alt text for each image.

### Change colors or fonts

Edit the variables at the top of `src/styles/global.css`. A change there applies to the whole site.

### Add a new page

1. Create `src/pages/my-page.astro`.
2. Wrap the content in `BaseLayout`. Copy the top of an existing page such as `src/pages/about.astro` to see how.
3. Give it a unique title and meta description.
4. Add links to it in `Header.astro` or `Footer.astro` if it should appear in the navigation.

It is picked up by the sitemap automatically on the next build.

## Content management with Decap CMS

### What Decap CMS is

[Decap CMS](https://decapcms.org) is a free, open-source content editor that runs in the browser. It gives non-developers a friendly form for writing blog posts, so Dawn never has to edit code or Markdown files by hand.

It has no database and no server of its own. The blog posts are the Markdown files in `src/content/blog/`, stored in the GitHub repository. When Dawn saves a post, Decap writes that file into the repository for her. This is called a Git-based CMS. The site code and the content live in one place, and every edit is saved in Git history, so any change can be reviewed or undone.

### The pieces

| Piece | What it does | Where it lives |
|---|---|---|
| Editor app | The visual editor Dawn uses. Decap 3.x is loaded from a CDN. | `public/admin/index.html` |
| Settings | Defines what can be edited and which fields each post has. | `public/admin/config.yml` |
| Netlify Identity | Handles logins: invites, passwords, and password resets. | Netlify dashboard, plus the widget script in `BaseLayout.astro` |
| Git Gateway | Lets a logged-in editor commit to GitHub without having a GitHub account. | Netlify dashboard (Identity, Services) |
| Content | The Markdown posts the editor reads and writes. | `src/content/blog/` |
| Images | Hero images uploaded through the editor. | `public/images/blog/` |
| Password reset page | Opens the reset form when an editor clicks a reset email link. | `public/recover.html` |

The `/admin` page is marked `noindex, nofollow`, so search engines do not list it.

### How an edit reaches the live site

1. Dawn opens [destinationgotravel.com/admin](https://destinationgotravel.com/admin) and logs in.
2. She creates or edits a post in the editor and clicks **Publish**.
3. Decap, through Git Gateway, commits the Markdown file (and any uploaded image) to the `main` branch.
4. Netlify sees the new commit, rebuilds the site, and publishes it. This takes a few minutes.

There is no draft review step in the CMS. The `config.yml` does not turn on Decap's editorial workflow, so **Publish** goes live as soon as the rebuild finishes. To work on a post without publishing it, set **Draft** to on. Draft posts are saved but left out of the built site and the sitemap.

### What Dawn can edit

`config.yml` defines one collection, **Blog Posts**. Each post has these fields in the editor:

| Editor label | Field | Notes |
|---|---|---|
| Title | `title` | Required. |
| Description | `description` | Used for search results and social previews. Keep it under 160 characters. |
| Publish Date | `publishDate` | Date only. |
| Updated Date | `updatedDate` | Optional. |
| Hero Image | `heroImage` | Recommended size 1200 by 630 pixels. Also the social sharing image. |
| Hero Image Alt Text | `heroImageAlt` | Describes the image for screen readers and search. |
| Category | `category` | Europe, All-Inclusive Resorts, Cruises, or General Travel. |
| Tags | `tags` | A list. Used for the tag pages. |
| Featured Post | `featured` | Has no effect today (see [Known issues](#known-issues)). |
| Author | `author` | Hidden. Always "Dawn Owens". |
| Draft | `draft` | On keeps the post off the live site. |
| Body | `body` | The article, written in a Markdown editor with a formatting toolbar. |

Posts are saved with the file name pattern `YYYY-MM-DD-your-title.md`. Pages such as Home, About, and Destinations are not in the CMS. Changing them takes a code edit.

### Set up access for a new editor

1. In the Netlify dashboard, open the site and go to **Site configuration, Identity**.
2. Make sure Identity is enabled and Git Gateway is on (**Services, Git Gateway**).
3. Click **Invite users** and enter the editor's email address.
4. The editor opens the invite email, clicks the link, and sets a password. The link sends them to the site, which opens the login window and then forwards them to `/admin/`.
5. After that, they log in at `/admin` with their email and password. If they forget the password, **Forgot password** emails a reset link that opens `/recover.html`.

Inviting Dawn is still an open item (see [Project status](#project-status)).

### Keep the CMS and the site in sync

The CMS only knows what `config.yml` tells it, and the site only accepts what the schema in `src/content.config.ts` allows. The two lists of fields must match.

- **Adding a field:** add it to both `public/admin/config.yml` and the schema in `src/content.config.ts`, then use it in `src/pages/blog/[slug].astro`.
- **Renaming a field:** change it in both files, then update every existing post that uses it. Otherwise the build can fail.
- **Changing the category list:** update the `options` for `category` in `config.yml` and the `z.enum` in the schema together.

Run `npm run build` after any change to either file to confirm the posts still pass validation.

### Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| The login window never appears on `/admin`. | Identity is not enabled in Netlify, or the Identity script was blocked. Check **Site configuration, Identity**. |
| Login works but publishing fails with a Git Gateway error. | Git Gateway is off. Turn it on under **Identity, Services**. |
| A post was published but is missing from the site. | The rebuild is still running, or `draft` is on. Check the Netlify deploy log and the post's Draft setting. |
| The Netlify build fails after a CMS save. | A post has a value the schema rejects, such as a category outside the allowed list. Open the deploy log, fix the frontmatter, and push again. |
| An editor needs a new password. | Use **Forgot password** on the login window. The email link opens `/recover.html`. |

### Run the CMS locally

The `config.yml` does not set up a local backend, so `/admin` on `localhost:4321` cannot log in or save. To test the editor without touching live content, add `local_backend: true` to `config.yml` and run `npx decap-server` in a second terminal while `npm run dev` is running. Remove that line before you commit.

## Forms and lead capture

There are three ways a visitor gets in touch:

| Where | How it works | Where submissions go |
|---|---|---|
| Plan My Trip (`/plan-my-trip`) | A TravelJoy form embedded in an iframe. | Dawn's TravelJoy account. |
| Book a call (Plan My Trip and the final call-to-action) | A link to Dawn's Calendly page. | Dawn's Calendly calendar. |
| Footer newsletter (`NewsletterBar.astro`) | A Netlify Form named `newsletter`. | The **Forms** tab in the Netlify dashboard. |

The Greece waitlist section on the home page (`LeadCapture.astro`, anchor `#greece-waitlist`) is a call-to-action that links to `/destinations/greece`. It is not a form.

## SEO setup

SEO is built in so that new pages and posts get it without extra work.

- **Meta tags:** `src/components/seo/SEOHead.astro` outputs the title, description, canonical URL, Open Graph tags, and Twitter Card tags on every page. Blog posts use their hero image as the social image.
- **Structured data (JSON-LD):** also produced by `SEOHead.astro`. This includes business and local business data, plus `BlogPosting` for posts. Posts with a FAQ section also get FAQ schema.
- **Sitemap:** `@astrojs/sitemap` writes `sitemap-index.xml`. Posts with `draft: true` are left out.
- **robots.txt:** allows all crawlers and points to the sitemap.
- **llms.txt:** `public/llms.txt` is a plain-text summary of the business for AI search tools. Update it when services or key pages change.
- **Local SEO:** page copy and schema name the Upstate SC service area: Greenville, Spartanburg, Anderson, and Clemson.

## Deployment

The site is hosted on Netlify and deploys automatically from the `main` branch of `cliftonc0613/destinationgotravel-site`.

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node | 22.12 or newer |

Branches follow Git Flow:

- `develop`: day-to-day work.
- `release/x.y.z`: a release being prepared. The version in `package.json` is bumped here.
- `main`: what is live. Pushing to it triggers a deploy.

A typical change: work on `develop`, run `npm run build` to confirm it passes, merge through a release branch into `main`, and Netlify publishes it.

## Project status

The site is built and live. The phases are tracked in the PRD, and the current task list is in `tasks/todo.md`.

Still open before the launch checklist is fully complete:

- Invite Dawn as a CMS editor in Netlify Identity.
- Cross-browser and device QA (Chrome, Safari, Firefox, iOS Safari, Android Chrome).
- A full CMS smoke test: Dawn logs in, creates a draft post, and publishes it.

### Known issues

- **Two content config files exist.** `src/content.config.ts` (the current Astro location, which also defines an unused `destinations` collection) and `src/content/config.ts` (an older blog-only copy). Keep only one, and update the field list in `public/admin/config.yml` to match.
- **The "Featured Post" checkbox does nothing.** It exists in `public/admin/config.yml`, but the schema has no `featured` field and the blog index features the newest post automatically.
- **The PRD is partly out of date.** It names Sveltia CMS and lists `.mdx` posts and Netlify Forms for the trip inquiry. The live site uses Decap CMS, `.md` posts, and TravelJoy.

## Further docs

All paths are relative to the parent folder unless marked `site/`.

- `PRD.md`: the original product requirements, design system, and phases.
- `site/tasks/todo.md`: the current task list, launch checklist, and schema fixes.
- `site/docs/`: implementation plans, content outlines, and `qa-report-2026-06-03.md`.
- `SCHEMA-REPORT.md`: the structured data audit.
- `build-process.md` and `website-build-process.md`: how these sites are built.
- `site/CLAUDE.md`: working rules for AI-assisted development on this project.

## Contacts

| | |
|---|---|
| Business | DestinationGo Travel |
| Advisor | Dawn Owens |
| Phone | 864-506-0213 |
| Email | dawn@destinationgotravel.com |
| Instagram | @destinationgotravelagency |
| Service area | Greenville, Spartanburg, Anderson, and Clemson, SC |
| Developer | Clifton Canady |

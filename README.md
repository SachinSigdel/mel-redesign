# MEL Recruitment: home and contact page redesign

A redesign and rebuild of the home page and contact page of [mymel.co.uk](https://mymel.co.uk), a UK recruitment agency working across five sectors: facilities, healthcare, logistics, hospitality and security. The original is a WordPress and Elementor site. This version keeps MEL's brand (logo, navy and blue palette, Poppins and Heebo) and improves the layout, navigation, readability, accessibility and speed.

- **Live site:** https://mel-redesign.vercel.app
- **Repository:** https://github.com/SachinSigdel/mel-redesign
- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · zod + react-hook-form · Nodemailer · Lenis · Playwright
- **Scope:** home page (`/`) and contact page (`/contact`). Other menu links point to the live MEL site.

## Getting started

```bash
npm install
npx playwright install chromium   # once, for the tests
npm run dev                       # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build && npm run start` | Production build and server |
| `npm run lint` | ESLint |
| `npm run test:e2e` | Playwright tests (builds and starts the app itself; make sure nothing else is using port 3000) |

### Contact form email (Gmail)

Enquiries are emailed to a Gmail inbox. Copy `.env.example` to `.env.local` and fill it in (it's ignored by git):

1. Turn on 2-Step Verification on the Google account.
2. Create an App Password at https://myaccount.google.com/apppasswords. It's a 16-character code; never use the normal password.
3. Set `GMAIL_USER` and `GMAIL_APP_PASSWORD` (and optionally `CONTACT_TO_EMAIL`), then restart the server.

On Vercel, add the same variables under Project Settings → Environment Variables.

Without credentials the form still works: enquiries are only logged. The tests never send email: Playwright sets `CONTACT_DRY_RUN=1`, and addresses at the reserved `example.com`/`.org`/`.net` domains are never emailed.

## Project structure

```
src/
├── app/
│   ├── layout.tsx            fonts, metadata, header, footer, skip link
│   ├── page.tsx              home page: the sections in order
│   ├── contact/page.tsx      contact page
│   ├── api/contact/route.ts  POST /api/contact: validates again on the server
│   └── globals.css           Tailwind theme (MEL's design tokens) + animation CSS
├── components/
│   ├── ui/                   Button, Eyebrow (pill label), SectionHeading
│   ├── layout/               Header, MobileNav, Footer, MobileCta
│   ├── behaviour/            SmoothScroll, ScrollReveal (render nothing)
│   ├── home/                 Hero, Steps, About, Services, ServiceCard, CtaPanel, Testimonials,
│   │                         BlogSection, BlogCard, BlogCardFocus, Partners
│   └── contact/              ContactInfo, Field, ContactForm
├── data/                     site, services, posts, home (content kept out of components)
└── lib/                      contactSchema (zod), mailer (Gmail via Nodemailer), smoothScroll
tests/                        Playwright tests
```

## Design improvements

**Home page:**
- **Header:**
  - The menu sits on the right next to "Apply now", instead of on the left.
  - The header is sticky and solid white, and gets a soft shadow once you scroll.
  - "Apply now" uses the original site's diagonal "sweep" hover, in MEL's colours.
  - Phones get an accessible slide-in menu, opened by a plain, larger menu icon.
- **Hero:**
  - "Find a job that fits your career goals" in sentence case (the original said "Find Job That Fits Your Career Goals").
  - A subhead that names MEL's five sectors.
  - Two clear actions, Browse jobs and Register free. The original's only button linked back to the home page.
  - The team photo fades in behind the text. The 760px original was upscaled 4× with an AI super-resolution model, so it stays sharp on high-resolution screens.
- **Steps strip:**
  - White icon circles replace white-on-blue icons, and the steps are numbered.
  - Wavy dotted paths draw in between the steps, and dots flow from one step to the next.
- **About:** an even 50/50 layout. The repeated copy is cut to one paragraph, with three scannable highlights and an "About us" link.
- **Services:**
  - All the cards are the same height.
  - A sixth "Can't see your sector?" card turns the uneven 3+2 grid into 3×2 and adds a call to action.
  - Each card has its sector icon beside the heading, and roles in divided rows.
  - The cards are calm white, and only the call-to-action card is navy.
- **CTA panel:** kept, because it already worked. The text is now full white for contrast, and the swirl pattern sits on the right.
- **Testimonials:** a sticky intro column, and review cards that stack as you scroll. The quotes are clearly tagged as samples until MEL supplies real ones.
- **Blog:**
  - Three cards in a row, instead of one post per full-width row.
  - The post without an image gets a branded navy fallback.
  - Useful tags (Healthcare, Security, For employers) replace "Uncategorized".
- **Partner logos:** an endless, slow scroll of partner companies above the footer. It pauses when you hover it.
- **Footer:** four labelled columns and a bottom bar, instead of a lone "All policies" column.

**Contact page:**
- **Top, on navy:** the heading on the left, and the four ways to reach MEL (visit, call, email, office hours) as translucent cards with white icon tiles. Phone and email can be tapped.
- **Below, on white:** a larger map on one side and the form on the other, with a full-width button.
- **Form:**
  - New "Phone (optional)" and "I am a…" fields, so enquiries reach the right team.
  - Validated in the browser and again on the server.
  - A hidden honeypot field catches spam bots.

**Across both pages:**
- **Mobile action bar:** on phones, once the page's main buttons scroll away, a bar slides up from the bottom with "Browse jobs" and a call button, so the main actions stay in thumb reach. It's hidden on larger screens, where the header shows "Apply now".
- **Readable text:** body text is weight 400 at 4.5:1 contrast or more (the original was weight 300 light grey), and headings are in sentence case.
- **Fewer fonts and icon sets:** one icon set (Lucide) instead of three, and two font families instead of three.
- **Calmer motion:**
  - The original's 1.35s scroll lag is gone. Lenis smooths only wheel and trackpad scrolling.
  - Sections fade up 16px as they come into view, and headings slide up out of a mask.
  - Everything turns off when "reduce motion" is on.

## Technical decisions

- **Next.js App Router, Server Components by default.** The page sections render to plain HTML with no JavaScript. Only these use `"use client"`:
  - the header, the mobile menu and the mobile action bar
  - the contact form
  - three small "behaviour" components that render nothing: smooth scrolling, scroll reveals, and a focus fix for blog cards
- **Tailwind CSS v4, with MEL's design tokens as the theme.** Tailwind's default colours are removed, so only brand colours can be used. The more complex animations (reveals, step paths, the logo scroll, the button sweep) are plain CSS in `globals.css`, where they're easier to read than long class strings.
- **One zod schema for the form** (`src/lib/contactSchema.ts`). The browser uses it through react-hook-form for instant feedback. `/api/contact` checks the data again with the same schema, because browser checks can be bypassed.
- **Email through Gmail with Nodemailer** (`src/lib/mailer.ts`):
  - Each enquiry is sent to a Gmail inbox using an App Password stored in environment variables, never in the code.
  - Reply-To is the person who wrote in, so pressing Reply answers them.
  - User input is HTML-escaped, and line breaks are stripped from the subject so a name can't add email headers.
  - If Gmail rejects the message, the route returns an error and the form says so, rather than showing a false success.
- **Content lives in `src/data`.** Each service, blog card, partner logo and testimonial comes from a single component fed by data.
- **`next/image` and `next/font`:**
  - Images are resized and converted to modern formats automatically, and the fonts are self-hosted, so the page makes no requests to Google.
  - The hero photo was upscaled 4× (760 → 3040px) with EDSR, a super-resolution model, after a light denoise. As WebP it's 145KB.
- **Honest content:**
  - No invented numbers. A statistics band was tried and removed because it only repeated facts already on the page.
  - The testimonials are marked as samples.
  - Partner logos come from MEL's own material.
- **Next.js 16 defaults reviewed:** Cache Components and the React Compiler are switched off. That keeps rendering simple for two mostly static pages.

## Accessibility

- **Built to WCAG 2.1 AA, and reviewed against it.** 14 issues were found and fixed, mostly colour contrast and focus visibility.
- **Compared with the live site:** home-page contrast failures went from 13 to 0.
- **What's in place:**
  - a skip link and proper landmarks
  - one visible H1 per page
  - a visible focus ring on every control (white on dark sections)
  - every form field has a visible label, linked errors (`aria-describedby`) and `aria-invalid`
  - a live region announces the result of submitting the form
  - the mobile menu traps focus, makes the page behind it inert and closes with Esc
  - tap targets are at least 44px on phones
  - nothing is hidden if JavaScript fails, and "reduce motion" turns off every animation
- **Known trade-off:** the step dots and the logo scroll loop while they're on screen. "Reduce motion" stops both and hovering pauses the logos. A visible pause button would meet WCAG 2.2.2 fully.

## Testing

**Automated (Playwright):** 5 tests, each run on Desktop Chrome and on a Pixel 7. That's 10 runs, all passing:
- an empty form shows the errors, and focus moves to the first invalid field
- an invalid UK phone number is rejected
- valid test data shows the success message, and focus stays on the Send button
- the mobile menu traps focus, makes the page behind it inert and closes with Esc
- the footer link goes to the contact page

**Lighthouse** (production build, run locally):

| Page | Device | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|---|
| Home | Mobile | 94 | 100 | 100 | 100 |
| Home | Desktop | 100 | 100 | 100 | 100 |
| Contact | Mobile | 96 | 100 | 100 | 100 |
| Contact | Desktop | 100 | 100 | 100 | 100 |

Cumulative layout shift is 0 on every run.

**Manual checks:**

| Check | Result |
|---|---|
| Both pages at 1440px, 1280px and 375px | Layout as designed, no sideways scrolling |
| Browser console on both pages | No errors |
| `POST /api/contact` with bad data (curl) | `400` with a list of field errors |
| `POST /api/contact` with valid test data | `200 { ok: true }` |
| Honeypot field filled in | `200`, quietly ignored |
| Clashing Tailwind classes (two utilities for the same property on one element) | Scanned on both pages; the ones found were fixed |

## Challenges

- **Reading the original:** Elementor markup, about 30 plugin scripts, three icon sets and three fonts. A plain HTML copy of the original pages served as the "before" reference.
- **Brand colours that failed contrast:** white text on MEL's blue `#0193de` is only 3.4:1. The fix was the brand's own darker blues, which pass.
- **Motion that stays accessible:**
  - The reveals never hide content if JavaScript fails.
  - Keyboard focus shows a hidden block instantly.
  - Every animation respects "reduce motion".
- **Tailwind class clashes:** two utilities for the same property on one element (for example `bg-tint` and `bg-navy`) don't combine. Tailwind picks the winner by its own CSS order, not the order you write the classes in. Each variant now sets its own value.
- **A low-resolution hero photo:** MEL's site only had a 760px version. A plain upscale enlarged the JPEG compression blocks, so the photo was denoised first, then upscaled with an AI model.
- **Next.js 16 changes:** Tailwind and Cache Components are on by default, and `priority` on images is deprecated.
- **Stale CSS in development:** Turbopack's disk cache of dev builds (on by default in Next.js 16) kept serving an old `globals.css` after edits, even across restarts. It's switched off in `next.config.ts` (`experimental.turbopackFileSystemCacheForDev: false`). Production builds were never affected.

## What I'd do next

- Replace the sample testimonials with real reviews, and add a pause button for the looping animations.
- Rebuild the About and Services pages with the same components.
- Load blog posts from the existing WordPress site through its API, using it as a headless CMS.
- Move from Gmail to a transactional email service (for example Resend) with MEL's own domain, and add rate limiting to the form.
- Run Lighthouse and axe accessibility checks in CI on every pull request.

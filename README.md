# Comfort Zone HVAC — Website

A refactored, modular, production-ready rebuild of the Comfort Zone HVAC marketing
site: componentized React + TypeScript, a validated appointment-booking form wired
to a real notification backend, full responsiveness, and WCAG 2.1 AA accessibility.

## Stack

- **React 18 + TypeScript + Vite**
- **Tailwind CSS v4** (design tokens in `src/styles/theme.css`)
- **lucide-react** for icons
- Optional **Express + SendGrid + Twilio** backend in `/server` for appointment
  notifications (email + SMS to the business owner)

## Project structure

```
src/
  components/
    ui/          Small reusable primitives: Button, Card, Logo, StarRating,
                  SectionHeading, IconBadge — no page-specific logic.
    layout/       Navbar, MobileMenu, Footer — persistent chrome.
    sections/     One component per page section (Hero, About, Services,
                  Reviews, Gallery, Contact, Appointment) composed in App.tsx.
  features/
    appointment/  Self-contained booking feature: form UI (AppointmentForm,
                  FormField), validation (validation.ts), and state
                  (useAppointmentForm.ts hook). Nothing outside this folder
                  reaches into its internals.
  services/
    appointmentApi.ts                     Frontend → backend connection point.
    notificationService.emailjs.example.ts Optional backend-free alternative.
  data/          Typed content: services, reviews, gallery, nav links, and
                  siteConfig.ts (single source of truth for business info).
  hooks/         Small generic hooks (useScrolled, useEscapeKey, useLockBodyScroll).
  lib/           cn() className helper.
  styles/        fonts.css, tailwind.css, theme.css (design tokens), global.css
                 (focus states, reduced-motion, sr-only utilities).

server/
  index.js                       Express app entry.
  routes/appointments.js         POST /api/appointments — validates + calls the
                                  notification service.
  services/notificationService.js Sends email (SendGrid) + SMS (Twilio) to the
                                  business owner. This is the core notification
                                  logic requested — swap providers here without
                                  touching the route or the frontend.
```

## Getting started

```bash
npm install
npm run dev        # starts the Vite dev server at http://localhost:5173
```

The dev server proxies `/api/*` to `http://localhost:4000` (see `vite.config.ts`),
so if you want the appointment form to actually send notifications while
developing, also run the backend in a second terminal:

```bash
cd server
npm install
cp .env.example .env   # fill in SendGrid/Twilio credentials
npm run dev
```

Without the backend running, the form still validates fully client-side; only
the final submit will fail with a friendly "please call us instead" message.

`npm run build` type-checks (`tsc -b`) and produces a production bundle in `dist/`.

## The appointment notification system

This is the main functional requirement, so here's how it fits together:

1. **`AppointmentForm.tsx`** collects Name, Email, Phone, Service, requested
   Date/Time, and Notes, with a hidden honeypot field for basic spam
   protection. All fields are validated live (`validation.ts`) with accessible
   inline errors.
2. On submit, **`src/services/appointmentApi.ts`** POSTs the payload to
   `/api/appointments` — this file is the single "connection point" mentioned
   in the brief. Swap what it points to (a different host, a serverless
   function, etc.) and nothing else in the app needs to change.
3. **`server/routes/appointments.js`** re-validates server-side (never trust
   the client) and calls `notifyBusinessOwner()`.
4. **`server/services/notificationService.js`** sends an email via SendGrid
   and a text via Twilio to the business owner
   (`BUSINESS_OWNER_EMAIL`, defaults to `johndoe@gmail.com` — see
   `server/.env.example`). If only one provider is configured, the other is
   skipped with a console warning rather than failing the whole request.

**Don't want to run a backend?** `src/services/notificationService.emailjs.example.ts`
is a documented, ready-to-wire alternative using EmailJS directly from the
browser (email only — pair it with a serverless SMS function if you need
texts too). Swapping to it means changing one `import` in `appointmentApi.ts`.

## Accessibility notes

- Semantic landmarks throughout (`<nav>`, `<main>`, `<section>`, `<footer>`),
  a skip-to-content link, and a logical heading hierarchy.
- All interactive elements are real `<button>`/`<a>`/form controls with
  visible `:focus-visible` rings, reachable and operable by keyboard alone
  (mobile menu, gallery lightbox, form).
- Form fields have associated `<label>`s, `aria-invalid`, `aria-describedby`
  error text, and a `role="status"` live region announces submit
  success/failure to screen readers.
- The gallery lightbox traps scroll, closes on `Escape` or backdrop click,
  and moves focus to its close button on open.
- Brand orange (`#F58220`) is decorative-only (icons, borders, large glyphs);
  a darkened `accent-strong` (`#C2540A`) is used anywhere orange appears as
  text or behind white button text, to meet WCAG AA contrast (~4.6:1) — the
  original design's orange-on-white text failed AA (~2.7:1).
- `prefers-reduced-motion` is respected globally (see `styles/global.css`).

## Responsiveness

Every section uses fluid Flexbox/CSS Grid layouts (no absolute positioning
for layout), with breakpoints tested at mobile, tablet (`sm`/`md`), and
desktop (`lg`/`xl`) widths. The nav collapses to an accessible mobile menu
below `lg`, and the reviews row becomes a horizontally-scrollable snap
carousel on small screens.

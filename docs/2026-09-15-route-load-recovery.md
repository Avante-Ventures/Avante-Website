# Internal route loading recovery — September 15, 2026

Cristian reported that Home worked while internal pages failed after publication.

## Evidence

Fresh production requests returned the correct content and current modules for Why Avante, Portfolio, Investors, Principles and Library. A fresh browser document rendered Why Avante. All seven checked page/shared-module URLs from the preceding deployment returned HTTP 404, including WhyAvantePage-BWWVo1R7.js and LibraryPage-CuBqfpg6.js. An already-open Home can therefore retain its entry module while its first navigation requests deleted lazy modules. There was no route error boundary or recovery for that failure.

## Change

The locale route tree now catches load failures. Recognized JavaScript/CSS chunk failures trigger one document reload at the intended destination, preserving locale, query and anchor. The retry is guarded per build and destination with session storage. Offline sessions, blocked storage, recurring load failures and application errors retain a usable localized error page with document links to retry or return Home.

The publication pipeline now tests actual link navigation across all page families in English, Portuguese and Spanish, article entry and return Home, plus the mobile menu and scroll-lock cleanup. A deliberately missing page chunk exercises recovery before static generation begins. Prerendering now rejects a rendered route error instead of treating any nonempty root as success.

## Local checks

- Four route recovery tests passed: chunk error variants, correct destination, reload-loop prevention, and offline/storage/application-error behavior.
- Scoped TypeScript check passed for RouteErrorPage.
- Production Vite build passed; existing large article-bundle warning remains.
- Navigation smoke checks execute in Vercel CI, where Chromium runs reliably. No local headless browser was started.

A tab that was already running an older release cannot execute the newly added recovery until it receives the new entry script; those existing tabs need one refresh.

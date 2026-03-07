# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Angular 20 frontend for the CodePulse blog platform (Udemy course companion to the ASP.NET Core Web API backend at `../../CodePulse.API/`).

## Commands

Run from `UI/CodePulse/`:

```bash
npm start           # Dev server at http://localhost:4200 (ng serve)
npm run build       # Production build
npm test            # Run Karma/Jasmine tests (headless Chrome)
ng generate component features/foo/components/bar   # Scaffold a component
```

## Architecture

Angular 20 standalone components — no NgModules. App is bootstrapped in `src/main.ts` via `appConfig` (`src/app/app.config.ts`).

**Folder conventions:**
- `src/app/core/` — singleton services, layout components (e.g. `NavBar`)
- `src/app/features/` — feature slices (not yet created; will follow `<feature>/components/` and `<feature>/services/` layout)

**Key wiring:**
- `app.config.ts` — registers `provideRouter(routes)` and `provideHttpClient()`; add application-wide providers here
- `app.routes.ts` — top-level route definitions; currently empty
- `App` component (`src/app/app.ts`) — root shell; renders `<app-nav-bar>` and `<router-outlet>`

**Backend:** API runs at `http://localhost:5000`. When adding HTTP calls, define the base URL in an environment file or service constant — do not hardcode it across multiple files.

**Styling:** Bootstrap 5 + SCSS. Global styles in `src/styles.scss`. Prettier is configured (single quotes, 100-char print width, Angular HTML parser for templates).

**TypeScript:** Strict mode enabled, including `strictTemplates` and `strictInjectionParameters`. All new code must satisfy these checks.

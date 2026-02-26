# WeatherNow ⛅

[![CI / CD](https://github.com/davidpayne-au/gse.a11y.example/actions/workflows/ci.yml/badge.svg)](https://github.com/davidpayne-au/gse.a11y.example/actions/workflows/ci.yml)

A simple, accessible weather app built with React, TypeScript, and Vite. Enter any city name to get the current weather conditions using the free [Open-Meteo](https://open-meteo.com) API — no API key required.

## Features

- 🔍 **City search** — type a city name and press Enter to fetch weather
- 🌤️ **Live weather data** — temperature, feels-like, humidity, wind speed, and WMO condition
- ⏳ **Loading animation** — animated spinner while data is fetched
- 🌙 **Dark / light theme** — toggle in the nav bar, persisted to `localStorage`
- ♿ **Accessible** — axe-core tested, semantic HTML, ARIA labels throughout
- 📄 **Two pages** — Home (weather search) and About (app stats & tech stack)
- 🔗 **Hash-based routing** — works without a server (`HashRouter`)

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run format` | Format source files with Prettier |
| `npm test` | Run unit tests (Vitest) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:e2e` | Run Playwright E2E tests (builds + starts preview server) |
| `npm run test:smoke` | Run smoke tests against a deployed URL (set `BASE_URL`) |
| `npm run test:e2e:report` | Open last Playwright HTML report |
| `npm run test:coverage` | Run tests with V8 coverage report |

## Tech stack

| Technology | Version | Role |
|---|---|---|
| React | 19 | UI framework |
| TypeScript | 5.9 | Type safety |
| Vite | 7 | Build tooling |
| React Router | 7 | Client-side routing (HashRouter) |
| TailwindCSS | 4 | Styling |
| Vitest | 4 | Unit testing |
| Testing Library | 16 | Component testing |
| jest-axe / axe-core | 10 / 4 | Accessibility testing |
| Playwright | 1.58 | E2E testing |
| Prettier | 3 | Code formatting |

## Accessibility

Accessibility (a11y) is treated as a first-class concern throughout this project, not an afterthought.

### How it is tested

| Layer | Tool | What is checked |
|---|---|---|
| **Unit tests** | [jest-axe](https://github.com/nicholasgasior/jest-axe) + [axe-core](https://github.com/dequelabs/axe-core) | Every component and page is rendered in jsdom and run through axe-core. The `toHaveNoViolations()` matcher fails the test if any WCAG violation is found. |
| **Static analysis** | [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y) | ESLint flags missing `alt` text, non-interactive elements with click handlers, missing ARIA roles, and other common mistakes at author time. |
| **E2E tests** | [Playwright](https://playwright.dev) | End-to-end tests verify keyboard navigation, focus management, and that key landmarks (headings, navigation, main) are present in the rendered page. |

### What is covered per file

Every `.tsx` component and page has a dedicated `it('has no accessibility violations', ...)` test:

- `App` — full routed app shell
- `NavBar` — navigation landmark, theme toggle, version number
- `ThemeToggle` — button labelling and state
- `LoadingSpinner` — ARIA live region / role
- `LocationSearch` — labelled form input
- `WeatherCard` — data table / article structure
- `AboutPage` — static content and headings
- `HomePage` — both the initial state and the post-search weather result state

### Accessibility standards & further reading

| Resource | Description |
|---|---|
| [WCAG 2.2 (W3C)](https://www.w3.org/TR/WCAG22/) | The official Web Content Accessibility Guidelines — the primary international standard |
| [WCAG Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/) | Filterable reference for all WCAG 2.2 success criteria |
| [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) | Patterns and examples for ARIA widgets and landmark regions |
| [Axe Rules](https://dequeuniversity.com/rules/axe/4.10/) | Full list of accessibility rules that axe-core checks, with remediation guidance |
| [MDN Accessibility Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility) | Practical accessibility reference for HTML, ARIA, and CSS |
| [WebAIM](https://webaim.org/) | Articles, tools (contrast checker, screen reader surveys), and training |
| [The A11y Project](https://www.a11yproject.com/) | Community-driven checklist and resource hub |
| [Inclusive Components](https://inclusive-components.design/) | In-depth patterns for accessible UI components |
| [APCA Contrast Tool](https://www.myndex.com/APCA/) | Advanced contrast checker used in WCAG 3 drafts |

## Weather API

Weather data comes from two free Open-Meteo endpoints:

1. **Geocoding** — `https://geocoding-api.open-meteo.com/v1/search` resolves a city name to coordinates
2. **Forecast** — `https://api.open-meteo.com/v1/forecast` returns current conditions (temperature, humidity, wind speed, WMO weather code)

## CI / CD

GitHub Actions runs on every push and pull request to `main`:

- **lint** — ESLint
- **build** — TypeScript type-check + Vite build (sets correct base path for GitHub Pages)
- **test** — Vitest unit tests with V8 coverage (coverage uploaded as an artifact)
- **e2e** — Playwright E2E tests against a local `vite preview` server (26 tests across home, about, navigation, theme, and smoke specs)
- **deploy** — publishes `dist/` to GitHub Pages (push to `main` only, after build + test + e2e all pass)
- **smoke** — Playwright smoke tests run against the live deployed URL after deployment

All four jobs live in `.github/workflows/ci.yml`.

The Vite `base` path is set automatically from `GITHUB_REPOSITORY` so assets resolve correctly under `/<repo-name>/` on GitHub Pages.

> **GitHub Pages setup:** go to *Settings → Pages → Source* and select **GitHub Actions**.

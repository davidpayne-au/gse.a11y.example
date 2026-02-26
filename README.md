# WeatherNow ⛅

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
| ESLint | 9 | Linting (flat config + jsx-a11y) |
| Prettier | 3 | Code formatting |

## Weather API

Weather data comes from two free Open-Meteo endpoints:

1. **Geocoding** — `https://geocoding-api.open-meteo.com/v1/search` resolves a city name to coordinates
2. **Forecast** — `https://api.open-meteo.com/v1/forecast` returns current conditions (temperature, humidity, wind speed, WMO weather code)

## CI / CD

GitHub Actions runs on every push and pull request to `main`:

- **CI** (`.github/workflows/ci.yml`) — lint → build → test (with coverage artifact)
- **Deploy** (`.github/workflows/deploy.yml`) — builds and publishes to GitHub Pages on push to `main`

The Vite `base` path is set automatically from `GITHUB_REPOSITORY` so assets resolve correctly under `/<repo-name>/` on GitHub Pages.

> **GitHub Pages setup:** go to *Settings → Pages → Source* and select **GitHub Actions**.

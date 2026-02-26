# Copilot Instructions

## Commands

```bash
npm run dev              # dev server at http://localhost:5173
npm run build            # tsc + vite build (base path = / locally)
npm run lint             # ESLint
npm run test             # vitest run (all unit tests, no coverage)
npm run test:coverage    # vitest run --coverage
npm run test:e2e         # playwright (auto-builds + starts vite preview at :4173)
npm run test:smoke       # playwright smoke tests — requires BASE_URL env var
```

**Run a single unit test file:**
```bash
npx vitest run src/components/WeatherCard.test.tsx
```

**Run a single E2E spec:**
```bash
npx playwright test e2e/home.spec.ts
```

## Architecture

The app is a single-page React app using `HashRouter` (routes: `/` and `/about`). The component tree is:

```
ThemeProvider (src/context/ThemeContext.tsx)
  └── HashRouter
        ├── NavBar
        │     └── ThemeToggle  ← calls useTheme()
        └── Routes
              ├── HomePage  ← useWeather() → weatherService → Open-Meteo APIs
              └── AboutPage
```

**Data flow for weather lookup:**
1. `LocationSearch` fires `onSearch(city)` on Enter
2. `useWeather` hook (`src/hooks/useWeather.ts`) manages `idle | loading | success | error` state
3. `weatherService.getWeatherForLocation` chains two fetches: geocoding API → forecast API
4. `WeatherCard` renders the result; WMO weather codes are mapped in `src/utils/weatherCodes.ts`

**Theme system:** `ThemeContext` is the single source of truth. It reads from `localStorage` on mount (with OS preference fallback), toggles the `dark` class on `<html>`, and writes back to `localStorage`. `main.tsx` also applies the stored class synchronously before React renders to prevent flash.

**Version number:** Read from `package.json` at build time via `vite.config.ts` `define: { __APP_VERSION__ }`. Declared as a global in `src/vite-env.d.ts`. Bump `package.json` version to update it everywhere.

**GitHub Pages base path:** `vite.config.ts` reads `process.env.GITHUB_REPOSITORY` and sets `base` to `/<repo-name>/`. This is injected by the CI `build` job. Local builds always use `base: "/"`.

## Conventions

### Testing

**Unit tests** (`src/**/*.test.tsx`) use Vitest globals (`describe`, `it`, `expect`, `vi`) — do **not** import them from `'vitest'`. The `globals: true` config injects them automatically.

Every test file that renders UI must include an axe accessibility assertion:
```tsx
await act(async () => {
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

`window.matchMedia` is mocked globally in `src/test-setup.ts` — don't re-mock it per test.

Components that use `useTheme()` must be wrapped in `<ThemeProvider>` in tests. Components that use routing must be wrapped in `<MemoryRouter>`. For pages that need both, compose them:
```tsx
function Wrapper() {
  return (
    <MemoryRouter>
      <ThemeProvider>
        <ComponentUnderTest />
      </ThemeProvider>
    </MemoryRouter>
  )
}
```

When unit-testing a hook that calls a service, mock the service module with `vi.spyOn`:
```ts
vi.spyOn(weatherService, 'getWeatherForLocation').mockResolvedValue(mockData)
```

When a test leaves a promise pending (e.g., testing a loading state), resolve it inside `await act(async () => { ... })` to avoid "state update not wrapped in act" warnings.

**E2E tests** (`e2e/*.spec.ts`) mock external API calls with `page.route()`. `e2e/smoke.spec.ts` is the exception — it runs against the live deployed URL with no mocking. The Playwright `webServer` config auto-runs `npm run build && npm run preview` locally; don't pre-build manually before running E2E.

### Styling

TailwindCSS v4 — configured via `@import "tailwindcss"` in `src/index.css` with `@custom-variant dark (&:where(.dark, .dark *))`. Dark mode classes use the `dark:` prefix as normal. There is no `tailwind.config.js`.

### ESLint

The config enforces `jsx-a11y` rules. The one intentional disable is in `ThemeContext.tsx` where `useTheme` is co-located with `ThemeProvider` in the same file (standard context pattern) — the `react-refresh/only-export-components` rule is suppressed on that export with an inline comment.

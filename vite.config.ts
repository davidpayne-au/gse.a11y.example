import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { readFileSync } from 'node:fs'

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8')) as { version: string }

// When deploying to GitHub Pages the assets must be served from /<repo-name>/.
// GITHUB_REPOSITORY is set automatically by Actions (format: "owner/repo").
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base = repoName ? `/${repoName}/` : '/'

// Locally: use the version from package.json (e.g. "1.0.0").
// In CI: append the short commit SHA as semver build metadata (e.g. "1.0.0+abc1234")
// so each deployment is uniquely identifiable even when package.json hasn't been bumped.
const sha = process.env.GITHUB_SHA?.slice(0, 7)
const appVersion = sha ? `${pkg.version}+${sha}` : pkg.version

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  define: {
    __APP_VERSION__: JSON.stringify(appVersion),
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/main.tsx',
        'src/vite-env.d.ts',
        'src/**/*.test.*',
        'src/**/*.d.ts',
        'src/test-setup.ts',
      ],
    },
  },
})

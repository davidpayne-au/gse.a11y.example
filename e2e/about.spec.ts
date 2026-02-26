import { test, expect } from '@playwright/test'

test.describe('About page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/about')
  })

  test('shows page heading', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1, name: /about weathernow/i })).toBeVisible()
  })

  test('shows app stats section', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 2, name: /app stats/i })).toBeVisible()
  })

  test('shows tech stack table with key technologies', async ({ page }) => {
    await expect(page.getByRole('table')).toBeVisible()
    await expect(page.getByRole('cell', { name: 'React', exact: true })).toBeVisible()
    await expect(page.getByRole('cell', { name: 'TypeScript', exact: true })).toBeVisible()
    await expect(page.getByRole('cell', { name: 'Vite', exact: true })).toBeVisible()
  })

  test('has Open-Meteo attribution link', async ({ page }) => {
    const link = page.getByRole('link', { name: /open-meteo/i })
    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute('href', 'https://open-meteo.com')
    await expect(link).toHaveAttribute('target', '_blank')
    await expect(link).toHaveAttribute('rel', /noopener/)
  })

  test('shows build info section', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 2, name: /build info/i })).toBeVisible()
  })
})

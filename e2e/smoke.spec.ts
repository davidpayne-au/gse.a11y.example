/**
 * Smoke tests — run against the deployed GitHub Pages URL after deployment.
 * These tests do not mock any API calls; they verify the live site is up and navigable.
 */
import { test, expect } from '@playwright/test'

test.describe('Smoke tests', () => {
  test('home page loads and shows search input', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByRole('searchbox')).toBeVisible()
  })

  test('about page loads', async ({ page }) => {
    await page.goto('/#/about')
    await expect(page.getByRole('heading', { level: 1, name: /about weathernow/i })).toBeVisible()
  })

  test('navigation links are present', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('link', { name: /^home$/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /^about$/i })).toBeVisible()
  })

  test('theme toggle button is present', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('button', { name: /switch to (dark|light) mode/i })).toBeVisible()
  })

  test('version number is shown', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByLabel(/version/i)).toBeVisible()
  })
})

import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('nav bar is visible on home page', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('navigation', { name: /main navigation/i })).toBeVisible()
  })

  test('Home and About links are present', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('link', { name: /^home$/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /^about$/i })).toBeVisible()
  })

  test('clicking About navigates to the about page', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /^about$/i }).click()
    await expect(page.getByRole('heading', { level: 1, name: /about weathernow/i })).toBeVisible()
    expect(page.url()).toContain('#/about')
  })

  test('clicking Home from About returns to home page', async ({ page }) => {
    await page.goto('/#/about')
    await page.getByRole('link', { name: /^home$/i }).click()
    await expect(page.getByRole('searchbox')).toBeVisible()
  })

  test('app logo links to home page', async ({ page }) => {
    await page.goto('/#/about')
    await page.getByRole('link', { name: /weathernow home/i }).click()
    await expect(page.getByRole('searchbox')).toBeVisible()
  })

  test('version number is displayed in the nav bar', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByLabel(/version/i)).toBeVisible()
  })
})

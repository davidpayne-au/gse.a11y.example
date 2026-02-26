import { test, expect } from '@playwright/test'

test.describe('Theme toggle', () => {
  test('toggle button is visible', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('button', { name: /switch to (dark|light) mode/i })).toBeVisible()
  })

  test('clicking the toggle switches to dark mode', async ({ page }) => {
    await page.goto('/')
    const toggle = page.getByRole('button', { name: /switch to dark mode/i })
    await toggle.click()
    await expect(page.locator('html')).toHaveClass(/dark/)
    await expect(page.getByRole('button', { name: /switch to light mode/i })).toBeVisible()
  })

  test('clicking the toggle twice returns to light mode', async ({ page }) => {
    await page.goto('/')
    const toggle = page.getByRole('button', { name: /switch to dark mode/i })
    await toggle.click()
    await page.getByRole('button', { name: /switch to light mode/i }).click()
    const htmlClass = await page.locator('html').getAttribute('class')
    expect(htmlClass ?? '').not.toContain('dark')
  })

  test('dark mode preference persists across navigation', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /switch to dark mode/i }).click()
    await expect(page.locator('html')).toHaveClass(/dark/)

    await page.getByRole('link', { name: /^about$/i }).click()
    await expect(page.locator('html')).toHaveClass(/dark/)

    await page.getByRole('link', { name: /^home$/i }).click()
    await expect(page.locator('html')).toHaveClass(/dark/)
  })

  test('dark mode preference persists after page reload', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /switch to dark mode/i }).click()
    await page.reload()
    await expect(page.locator('html')).toHaveClass(/dark/)
  })
})

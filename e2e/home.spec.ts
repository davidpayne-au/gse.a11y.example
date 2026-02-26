import { test, expect } from '@playwright/test'

const MOCK_GEO = {
  results: [
    {
      id: 1,
      name: 'Brisbane',
      latitude: -27.4678,
      longitude: 153.0281,
      country: 'Australia',
      country_code: 'AU',
      admin1: 'Queensland',
    },
  ],
}

const MOCK_WEATHER = {
  current: {
    temperature_2m: 25.5,
    relative_humidity_2m: 60,
    apparent_temperature: 27.0,
    weather_code: 1,
    wind_speed_10m: 15.0,
    time: '2024-01-01T12:00',
  },
  current_units: {
    temperature_2m: '°C',
    relative_humidity_2m: '%',
    apparent_temperature: '°C',
    weather_code: 'wmo code',
    wind_speed_10m: 'km/h',
    time: 'iso8601',
  },
}

test.describe('Home page', () => {
  test('shows heading and search input', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByRole('searchbox')).toBeVisible()
  })

  test('shows idle prompt before any search', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText(/search for a city above/i)).toBeVisible()
  })

  test('shows loading spinner then weather card after search', async ({ page }) => {
    await page.route('**/geocoding-api.open-meteo.com/**', (route) =>
      route.fulfill({ json: MOCK_GEO }),
    )
    await page.route('**/api.open-meteo.com/**', (route) =>
      route.fulfill({ json: MOCK_WEATHER }),
    )

    await page.goto('/')
    await page.getByRole('searchbox').fill('Brisbane')
    await page.getByRole('searchbox').press('Enter')

    // Spinner should appear (may be brief)
    await expect(page.getByRole('article', { name: /weather for brisbane/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Brisbane' })).toBeVisible()
    await expect(page.getByText('26')).toBeVisible() // rounded 25.5°C
    await expect(page.getByText(/mainly clear/i)).toBeVisible()
  })

  test('shows error message for unknown location', async ({ page }) => {
    await page.route('**/geocoding-api.open-meteo.com/**', (route) =>
      route.fulfill({ json: { results: [] } }),
    )

    await page.goto('/')
    await page.getByRole('searchbox').fill('zzzznotacity')
    await page.getByRole('searchbox').press('Enter')

    await expect(page.getByRole('alert')).toBeVisible()
    await expect(page.getByText(/could not get weather/i)).toBeVisible()
  })

  test('input is disabled while loading', async ({ page }) => {
    // Delay the geocoding response so we can check the loading state
    await page.route('**/geocoding-api.open-meteo.com/**', async (route) => {
      await new Promise((r) => setTimeout(r, 300))
      await route.fulfill({ json: MOCK_GEO })
    })
    await page.route('**/api.open-meteo.com/**', (route) =>
      route.fulfill({ json: MOCK_WEATHER }),
    )

    await page.goto('/')
    await page.getByRole('searchbox').fill('Brisbane')
    await page.getByRole('searchbox').press('Enter')

    await expect(page.getByRole('searchbox')).toBeDisabled()
    await expect(page.getByRole('article', { name: /weather for brisbane/i })).toBeVisible()
    await expect(page.getByRole('searchbox')).toBeEnabled()
  })
})

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { geocodeLocation, fetchWeather, getWeatherForLocation } from './weatherService'
import type { GeocodingResponse, WeatherResponse } from '../types/weather'

const mockGeoResponse: GeocodingResponse = {
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

const mockWeatherResponse: WeatherResponse = {
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

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('geocodeLocation', () => {
  it('returns first result for a valid location', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockGeoResponse),
      }),
    )
    const result = await geocodeLocation('Brisbane')
    expect(result.name).toBe('Brisbane')
    expect(result.latitude).toBe(-27.4678)
  })

  it('throws when location is not found', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ results: [] }),
      }),
    )
    await expect(geocodeLocation('nonexistentxyz')).rejects.toThrow('Location not found')
  })

  it('throws when fetch fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        statusText: 'Service Unavailable',
      }),
    )
    await expect(geocodeLocation('Brisbane')).rejects.toThrow('Geocoding failed')
  })
})

describe('fetchWeather', () => {
  it('returns weather data for valid coordinates', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockWeatherResponse),
      }),
    )
    const result = await fetchWeather(-27.4678, 153.0281)
    expect(result.current.temperature_2m).toBe(25.5)
    expect(result.current.weather_code).toBe(1)
  })

  it('throws when fetch fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        statusText: 'Not Found',
      }),
    )
    await expect(fetchWeather(0, 0)).rejects.toThrow('Weather fetch failed')
  })
})

describe('getWeatherForLocation', () => {
  it('combines geocoding and weather fetch', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockGeoResponse),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockWeatherResponse),
      })
    vi.stubGlobal('fetch', fetchMock)

    const result = await getWeatherForLocation('Brisbane')
    expect(result.location.name).toBe('Brisbane')
    expect(result.current.temperature_2m).toBe(25.5)
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })
})

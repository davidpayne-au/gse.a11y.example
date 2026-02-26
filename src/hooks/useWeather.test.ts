import { renderHook, act } from '@testing-library/react'
import { useWeather } from './useWeather'
import * as weatherService from '../services/weatherService'
import type { WeatherData } from '../types/weather'

const mockWeatherData: WeatherData = {
  location: {
    id: 1,
    name: 'Brisbane',
    latitude: -27.4678,
    longitude: 153.0281,
    country: 'Australia',
    country_code: 'AU',
  },
  current: {
    temperature_2m: 25.5,
    relative_humidity_2m: 60,
    apparent_temperature: 27.0,
    weather_code: 1,
    wind_speed_10m: 15.0,
    time: '2024-01-01T12:00',
  },
  units: {
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

describe('useWeather', () => {
  it('starts in idle state', () => {
    const { result } = renderHook(() => useWeather())
    expect(result.current.status).toBe('idle')
    expect(result.current.data).toBeNull()
    expect(result.current.error).toBeNull()
  })

  it('transitions to success state on valid search', async () => {
    vi.spyOn(weatherService, 'getWeatherForLocation').mockResolvedValue(mockWeatherData)
    const { result } = renderHook(() => useWeather())
    await act(async () => {
      await result.current.search('Brisbane')
    })
    expect(result.current.status).toBe('success')
    expect(result.current.data).toEqual(mockWeatherData)
    expect(result.current.error).toBeNull()
  })

  it('transitions to error state on failed search', async () => {
    vi.spyOn(weatherService, 'getWeatherForLocation').mockRejectedValue(
      new Error('Location not found: "xyz"'),
    )
    const { result } = renderHook(() => useWeather())
    await act(async () => {
      await result.current.search('xyz')
    })
    expect(result.current.status).toBe('error')
    expect(result.current.error).toContain('Location not found')
    expect(result.current.data).toBeNull()
  })

  it('does nothing for empty search string', async () => {
    const spy = vi.spyOn(weatherService, 'getWeatherForLocation')
    const { result } = renderHook(() => useWeather())
    await act(async () => {
      await result.current.search('   ')
    })
    expect(spy).not.toHaveBeenCalled()
    expect(result.current.status).toBe('idle')
  })

  it('sets loading state during fetch', async () => {
    let resolve: (value: WeatherData) => void
    const promise = new Promise<WeatherData>((r) => (resolve = r))
    vi.spyOn(weatherService, 'getWeatherForLocation').mockReturnValue(promise)

    const { result } = renderHook(() => useWeather())
    act(() => {
      void result.current.search('Brisbane')
    })
    expect(result.current.status).toBe('loading')

    await act(async () => {
      resolve!(mockWeatherData)
      await promise
    })
    expect(result.current.status).toBe('success')
  })
})

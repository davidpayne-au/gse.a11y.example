import { useState, useCallback } from 'react'
import { getWeatherForLocation } from '../services/weatherService'
import type { WeatherData } from '../types/weather'

export type WeatherStatus = 'idle' | 'loading' | 'success' | 'error'

interface WeatherState {
  status: WeatherStatus
  data: WeatherData | null
  error: string | null
}

export function useWeather() {
  const [state, setState] = useState<WeatherState>({
    status: 'idle',
    data: null,
    error: null,
  })

  const search = useCallback(async (location: string) => {
    if (!location.trim()) return
    setState({ status: 'loading', data: null, error: null })
    try {
      const data = await getWeatherForLocation(location)
      setState({ status: 'success', data, error: null })
    } catch (err) {
      setState({
        status: 'error',
        data: null,
        error: err instanceof Error ? err.message : 'Failed to fetch weather',
      })
    }
  }, [])

  return { ...state, search }
}

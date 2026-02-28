import type { GeocodingResponse, GeocodingResult, WeatherData, WeatherResponse } from '../types/weather'

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'

export async function geocodeLocation(name: string): Promise<GeocodingResult> {
  const url = `${GEOCODING_URL}?name=${encodeURIComponent(name)}&count=1&language=en&format=json`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Geocoding failed: ${response.statusText}`)
  }
  const data = (await response.json()) as GeocodingResponse
  if (!data.results?.length) {
    throw new Error(`Location not found: "${name}"`)
  }
  return data.results[0]
}

export async function fetchWeather(latitude: number, longitude: number): Promise<WeatherResponse> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current:
      'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,is_day',
  })
  const url = `${FORECAST_URL}?${params}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Weather fetch failed: ${response.statusText}`)
  }
  return response.json() as Promise<WeatherResponse>
}

export async function getWeatherForLocation(name: string): Promise<WeatherData> {
  const location = await geocodeLocation(name)
  const weather = await fetchWeather(location.latitude, location.longitude)
  return {
    location,
    current: weather.current,
    units: weather.current_units,
  }
}

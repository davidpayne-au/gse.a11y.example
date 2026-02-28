export interface GeocodingResult {
  id: number
  name: string
  latitude: number
  longitude: number
  country: string
  country_code: string
  admin1?: string
  admin2?: string
  timezone?: string
  population?: number
}

export interface GeocodingResponse {
  results?: GeocodingResult[]
}

export interface WeatherCurrent {
  temperature_2m: number
  relative_humidity_2m: number
  apparent_temperature: number
  weather_code: number
  wind_speed_10m: number
  time: string
  is_day: number
}

export interface WeatherCurrentUnits {
  temperature_2m: string
  relative_humidity_2m: string
  apparent_temperature: string
  weather_code: string
  wind_speed_10m: string
  time: string
  is_day: string
}

export interface WeatherResponse {
  current: WeatherCurrent
  current_units: WeatherCurrentUnits
}

export interface WeatherData {
  location: GeocodingResult
  current: WeatherCurrent
  units: WeatherCurrentUnits
}

import type { WeatherData } from '../types/weather'
import { getWeatherCondition } from '../utils/weatherCodes'

interface WeatherCardProps {
  data: WeatherData
}

export default function WeatherCard({ data }: WeatherCardProps) {
  const { location, current, units } = data
  const condition = getWeatherCondition(current.weather_code)
  const locationLabel = [location.name, location.admin1, location.country]
    .filter(Boolean)
    .join(', ')

  return (
    <article
      aria-label={`Weather for ${location.name}`}
      className="w-full max-w-md mx-auto rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-br from-sky-400 to-indigo-500 dark:from-sky-600 dark:to-indigo-700 p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold leading-tight">{location.name}</h2>
            <p className="text-sky-100 text-sm mt-0.5">{locationLabel}</p>
          </div>
          <span
            className="text-5xl"
            role="img"
            aria-label={condition.label}
          >
            {condition.emoji}
          </span>
        </div>
        <p className="mt-4 text-sky-100 font-medium">{condition.label}</p>
        <p className="text-6xl font-extralight mt-1">
          {Math.round(current.temperature_2m)}
          <span className="text-3xl align-top mt-2 inline-block">{units.temperature_2m}</span>
        </p>
      </div>

      {/* Details grid */}
      <dl className="grid grid-cols-3 divide-x divide-gray-200 dark:divide-gray-700">
        <div className="flex flex-col items-center py-4 px-2">
          <dt className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Feels like
          </dt>
          <dd className="mt-1 text-lg font-semibold text-gray-800 dark:text-gray-100">
            {Math.round(current.apparent_temperature)}
            {units.apparent_temperature}
          </dd>
        </div>
        <div className="flex flex-col items-center py-4 px-2">
          <dt className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Humidity
          </dt>
          <dd className="mt-1 text-lg font-semibold text-gray-800 dark:text-gray-100">
            {current.relative_humidity_2m}
            {units.relative_humidity_2m}
          </dd>
        </div>
        <div className="flex flex-col items-center py-4 px-2">
          <dt className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Wind
          </dt>
          <dd className="mt-1 text-lg font-semibold text-gray-800 dark:text-gray-100">
            {Math.round(current.wind_speed_10m)}
            <span className="text-sm font-normal ml-0.5">{units.wind_speed_10m}</span>
          </dd>
        </div>
      </dl>
    </article>
  )
}

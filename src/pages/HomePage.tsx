import { useState } from 'react'
import LocationSearch from '../components/LocationSearch'
import WeatherCard from '../components/WeatherCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { useWeather } from '../hooks/useWeather'

export default function HomePage() {
  const { status, data, error, search } = useWeather()
  const [searched, setSearched] = useState(false)

  function handleSearch(location: string) {
    setSearched(true)
    void search(location)
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-10" id="main-content">
      {/* Hero */}
      <section className="text-center mb-10" aria-labelledby="hero-heading">
        <h1
          id="hero-heading"
          className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3"
        >
          What&apos;s the weather like?
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
          Enter any city in the world to get the current conditions.
        </p>
        <LocationSearch onSearch={handleSearch} disabled={status === 'loading'} />
      </section>

      {/* Results */}
      <section aria-live="polite" aria-atomic="true">
        {status === 'loading' && <LoadingSpinner />}

        {status === 'success' && data && <WeatherCard data={data} />}

        {status === 'error' && (
          <div
            role="alert"
            className="max-w-md mx-auto text-center rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-6"
          >
            <p className="text-2xl mb-2" aria-hidden="true">
              😕
            </p>
            <p className="font-semibold text-red-700 dark:text-red-400">Could not get weather</p>
            <p className="text-sm text-red-600 dark:text-red-300 mt-1">{error}</p>
          </div>
        )}

        {status === 'idle' && !searched && (
          <div className="text-center text-gray-400 dark:text-gray-600 mt-8">
            <p className="text-5xl mb-4" aria-hidden="true">
              🌍
            </p>
            <p className="text-sm">Search for a city above to see its weather</p>
          </div>
        )}
      </section>
    </main>
  )
}

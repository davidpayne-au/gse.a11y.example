interface LocationSearchProps {
  onSearch: (location: string) => void
  disabled?: boolean
}

export default function LocationSearch({ onSearch, disabled = false }: LocationSearchProps) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      const value = (e.currentTarget.value ?? '').trim()
      if (value) onSearch(value)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <label
        htmlFor="location-input"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        Enter a city name
      </label>
      <div className="relative">
        <span
          className="absolute inset-y-0 left-3 flex items-center text-gray-400 dark:text-gray-500 pointer-events-none"
          aria-hidden="true"
        >
          🔍
        </span>
        <input
          id="location-input"
          type="text"
          role="searchbox"
          placeholder="e.g. Brisbane, Kuala Lumpur, New York…"
          disabled={disabled}
          onKeyDown={handleKeyDown}
          className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition"
          aria-label="City name search"
        />
      </div>
      <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
        Press <kbd className="font-mono font-semibold">Enter</kbd> to search
      </p>
    </div>
  )
}

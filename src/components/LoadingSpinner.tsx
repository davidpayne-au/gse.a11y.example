export default function LoadingSpinner() {
  return (
    <div
      role="status"
      aria-label="Loading weather data"
      className="flex flex-col items-center justify-center gap-6 py-16"
    >
      <div className="relative w-24 h-24">
        {/* Outer spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-sky-200 dark:border-sky-900" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-sky-500 dark:border-t-sky-400 animate-spin" />
        {/* Inner pulsing ring */}
        <div className="absolute inset-3 rounded-full border-4 border-transparent border-t-indigo-400 dark:border-t-indigo-300 animate-spin [animation-direction:reverse] [animation-duration:0.8s]" />
        {/* Centre icon */}
        <div className="absolute inset-0 flex items-center justify-center text-3xl animate-pulse">
          🌤️
        </div>
      </div>

      {/* Bouncing dots */}
      <div className="flex gap-1.5" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-sky-500 dark:bg-sky-400 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>

      <p className="text-sky-600 dark:text-sky-400 font-medium text-sm tracking-wide animate-pulse">
        Fetching weather data…
      </p>
    </div>
  )
}

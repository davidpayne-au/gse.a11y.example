declare const __APP_VERSION__: string

const TECH_STACK = [
  { name: 'React', version: '19', role: 'UI framework' },
  { name: 'TypeScript', version: '5.9', role: 'Type safety' },
  { name: 'Vite', version: '7', role: 'Build tooling' },
  { name: 'React Router', version: '7', role: 'Client-side routing' },
  { name: 'TailwindCSS', version: '4', role: 'Styling' },
  { name: 'Vitest', version: '4', role: 'Unit testing' },
  { name: 'Testing Library', version: '16', role: 'Component testing' },
  { name: 'jest-axe', version: '10', role: 'Accessibility testing' },
  { name: 'axe-core', version: '4', role: 'Accessibility engine' },
  { name: 'ESLint', version: '9', role: 'Code linting' },
  { name: 'Prettier', version: '3', role: 'Code formatting' },
]

const APP_STATS = [
  { label: 'Pages', value: '2', icon: '📄' },
  { label: 'Components', value: '5', icon: '🧩' },
  { label: 'API key required', value: 'No', icon: '🔓' },
  { label: 'Dark mode', value: 'Yes', icon: '🌙' },
]

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10" id="main-content">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
        About WeatherNow
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-10">
        A simple, accessible weather app built with modern web technologies.
      </p>

      {/* Stats */}
      <section aria-labelledby="stats-heading" className="mb-10">
        <h2
          id="stats-heading"
          className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4"
        >
          App stats
        </h2>
        <ul
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 list-none p-0 m-0"
        >
          {APP_STATS.map((stat) => (
            <li
              key={stat.label}
              className="flex flex-col items-center gap-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 text-center"
            >
              <span className="text-3xl" aria-hidden="true">
                {stat.icon}
              </span>
              <span className="text-2xl font-bold text-sky-600 dark:text-sky-400">
                {stat.value}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* About the API */}
      <section aria-labelledby="api-heading" className="mb-10">
        <h2
          id="api-heading"
          className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3"
        >
          Weather data
        </h2>
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            Weather data is sourced from{' '}
            <a
              href="https://open-meteo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-700 dark:text-sky-400 underline hover:text-sky-800 dark:hover:text-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-500 rounded"
            >
              Open-Meteo
            </a>
            , a free and open-source weather API that requires no API key for personal use.
          </p>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
            <li>Geocoding via the Open-Meteo Geocoding API</li>
            <li>Current conditions via the Open-Meteo Forecast API</li>
            <li>WMO weather code interpretation</li>
          </ul>
        </div>
      </section>

      {/* Tech stack */}
      <section aria-labelledby="stack-heading" className="mb-10">
        <h2
          id="stack-heading"
          className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4"
        >
          Tech stack
        </h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="w-full text-sm text-left">
            <caption className="sr-only">Technologies used in this project</caption>
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300"
                >
                  Technology
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300"
                >
                  Version
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300"
                >
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
              {TECH_STACK.map((tech) => (
                <tr key={tech.name} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-4 py-2.5 font-medium text-gray-900 dark:text-gray-100">
                    {tech.name}
                  </td>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 font-mono">
                    {tech.version}
                  </td>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">{tech.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Build info */}
      <section aria-labelledby="build-heading">
        <h2
          id="build-heading"
          className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3"
        >
          Build info
        </h2>
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
          <dl className="grid grid-cols-2 gap-y-2 text-sm">
            <dt className="text-gray-500 dark:text-gray-400">Version</dt>
            <dd className="font-mono font-semibold text-gray-900 dark:text-gray-100">
              v{__APP_VERSION__}
            </dd>
            <dt className="text-gray-500 dark:text-gray-400">Routing</dt>
            <dd className="text-gray-900 dark:text-gray-100">HashRouter (client-side)</dd>
            <dt className="text-gray-500 dark:text-gray-400">Accessibility</dt>
            <dd className="text-gray-900 dark:text-gray-100">axe-core tested</dd>
          </dl>
        </div>
      </section>
    </main>
  )
}

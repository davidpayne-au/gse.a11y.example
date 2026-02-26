import { NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

declare const __APP_VERSION__: string

export default function NavBar() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
      isActive
        ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300'
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
    ].join(' ')

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <nav
        aria-label="Main navigation"
        className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-4"
      >
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 font-bold text-gray-900 dark:text-white mr-auto shrink-0"
          aria-label="WeatherNow home"
        >
          <span aria-hidden="true">⛅</span>
          <span>WeatherNow</span>
        </NavLink>

        {/* Nav links */}
        <ul className="flex items-center gap-1 list-none m-0 p-0" role="list">
          <li>
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
          </li>
        </ul>

        {/* Version + Theme toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <span
            className="text-xs font-mono text-gray-400 dark:text-gray-500 hidden sm:block"
            aria-label={`Version ${__APP_VERSION__}`}
          >
            v{__APP_VERSION__}
          </span>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}

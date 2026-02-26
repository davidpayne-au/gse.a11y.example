import { render, screen, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '../context/ThemeContext'
import HomePage from './HomePage'
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
    admin1: 'Queensland',
  },
  current: {
    temperature_2m: 25.5,
    relative_humidity_2m: 60,
    apparent_temperature: 27.0,
    weather_code: 0,
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

function Wrapper() {
  return (
    <MemoryRouter>
      <ThemeProvider>
        <HomePage />
      </ThemeProvider>
    </MemoryRouter>
  )
}

beforeEach(() => {
  vi.restoreAllMocks()
  localStorage.clear()
  document.documentElement.classList.remove('dark')
})

describe('HomePage', () => {
  it('renders the heading', () => {
    render(<Wrapper />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders the search input', () => {
    render(<Wrapper />)
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
  })

  it('shows idle prompt initially', () => {
    render(<Wrapper />)
    expect(screen.getByText(/search for a city above/i)).toBeInTheDocument()
  })

  it('shows loading spinner during fetch', async () => {
    let resolveSearch!: (data: WeatherData) => void
    const pendingPromise = new Promise<WeatherData>((resolve) => (resolveSearch = resolve))
    vi.spyOn(weatherService, 'getWeatherForLocation').mockReturnValue(pendingPromise)
    const user = userEvent.setup()
    render(<Wrapper />)
    await user.type(screen.getByRole('searchbox'), 'Brisbane{Enter}')
    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument()
    // Resolve the promise inside act so React can flush the resulting state update
    await act(async () => {
      resolveSearch(mockWeatherData)
      await pendingPromise
    })
  })

  it('shows weather card after successful search', async () => {
    vi.spyOn(weatherService, 'getWeatherForLocation').mockResolvedValue(mockWeatherData)
    const user = userEvent.setup()
    render(<Wrapper />)
    await user.type(screen.getByRole('searchbox'), 'Brisbane{Enter}')
    await waitFor(() =>
      expect(screen.getByRole('article', { name: /weather for brisbane/i })).toBeInTheDocument(),
    )
  })

  it('shows error message on failed search', async () => {
    vi.spyOn(weatherService, 'getWeatherForLocation').mockRejectedValue(
      new Error('Location not found: "xyz"'),
    )
    const user = userEvent.setup()
    render(<Wrapper />)
    await user.type(screen.getByRole('searchbox'), 'xyz{Enter}')
    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument())
    expect(screen.getByText(/location not found/i)).toBeInTheDocument()
  })

  it('has no accessibility violations on initial render', async () => {
    const { container } = render(<Wrapper />)
    await act(async () => {
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  it('has no accessibility violations after successful search', async () => {
    vi.spyOn(weatherService, 'getWeatherForLocation').mockResolvedValue(mockWeatherData)
    const user = userEvent.setup()
    const { container } = render(<Wrapper />)
    await user.type(screen.getByRole('searchbox'), 'Brisbane{Enter}')
    await waitFor(() =>
      expect(screen.getByRole('article', { name: /weather for brisbane/i })).toBeInTheDocument(),
    )
    await act(async () => {
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})

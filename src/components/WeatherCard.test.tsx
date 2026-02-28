import { render, screen, act } from '@testing-library/react'
import { axe } from 'jest-axe'
import WeatherCard from './WeatherCard'
import type { WeatherData } from '../types/weather'

const mockData: WeatherData = {
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
    apparent_temperature: 27.2,
    weather_code: 1,
    wind_speed_10m: 15.3,
    time: '2024-01-01T12:00',
    is_day: 1,
  },
  units: {
    temperature_2m: '°C',
    relative_humidity_2m: '%',
    apparent_temperature: '°C',
    weather_code: 'wmo code',
    wind_speed_10m: 'km/h',
    time: 'iso8601',
    is_day: '',
  },
}

const nightMockData: WeatherData = {
  ...mockData,
  current: {
    ...mockData.current,
    weather_code: 0,
    time: '2024-01-01T22:30',
    is_day: 0,
  },
}

describe('WeatherCard', () => {
  it('renders location name', () => {
    render(<WeatherCard data={mockData} />)
    expect(screen.getByText('Brisbane')).toBeInTheDocument()
  })

  it('renders temperature', () => {
    render(<WeatherCard data={mockData} />)
    expect(screen.getByText('26')).toBeInTheDocument() // rounded 25.5
  })

  it('renders feels-like temperature', () => {
    render(<WeatherCard data={mockData} />)
    expect(screen.getByText(/27°C/)).toBeInTheDocument()
  })

  it('renders humidity', () => {
    render(<WeatherCard data={mockData} />)
    expect(screen.getByText(/60%/)).toBeInTheDocument()
  })

  it('renders wind speed', () => {
    render(<WeatherCard data={mockData} />)
    expect(screen.getByText('15')).toBeInTheDocument() // rounded 15.3
  })

  it('renders weather condition label', () => {
    render(<WeatherCard data={mockData} />)
    expect(screen.getByText('Mainly clear')).toBeInTheDocument()
  })

  it('renders with article role and accessible label', () => {
    render(<WeatherCard data={mockData} />)
    expect(screen.getByRole('article', { name: /weather for brisbane/i })).toBeInTheDocument()
  })

  it('displays local time', () => {
    render(<WeatherCard data={mockData} />)
    expect(screen.getByText(/12:00 PM/i)).toBeInTheDocument()
  })

  it('displays local time for nighttime', () => {
    render(<WeatherCard data={nightMockData} />)
    expect(screen.getByText(/10:30 PM/i)).toBeInTheDocument()
  })

  it('uses daytime gradient header when is_day is 1', () => {
    render(<WeatherCard data={mockData} />)
    const header = screen.getByRole('article').firstElementChild
    expect(header?.className).toMatch(/from-sky-400/)
  })

  it('uses nighttime gradient header when is_day is 0', () => {
    render(<WeatherCard data={nightMockData} />)
    const header = screen.getByRole('article').firstElementChild
    expect(header?.className).toMatch(/from-indigo-900/)
  })

  it('shows moon emoji for clear sky at night', () => {
    render(<WeatherCard data={nightMockData} />)
    expect(screen.getByRole('img', { name: 'Clear sky' })).toHaveTextContent('🌙')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<WeatherCard data={mockData} />)
    await act(async () => {
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  it('has no accessibility violations in nighttime mode', async () => {
    const { container } = render(<WeatherCard data={nightMockData} />)
    await act(async () => {
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})

import { describe, it, expect } from 'vitest'
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

  it('has no accessibility violations', async () => {
    const { container } = render(<WeatherCard data={mockData} />)
    await act(async () => {
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})

import { describe, it, expect } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { axe } from 'jest-axe'
import AboutPage from './AboutPage'

describe('AboutPage', () => {
  it('renders the page heading', () => {
    render(<AboutPage />)
    expect(screen.getByRole('heading', { level: 1, name: /about weathernow/i })).toBeInTheDocument()
  })

  it('renders the App stats section', () => {
    render(<AboutPage />)
    expect(screen.getByRole('heading', { level: 2, name: /app stats/i })).toBeInTheDocument()
  })

  it('renders the Tech stack table', () => {
    render(<AboutPage />)
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: /tech stack/i })).toBeInTheDocument()
  })

  it('lists key technologies in the table', () => {
    render(<AboutPage />)
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Vite')).toBeInTheDocument()
  })

  it('renders weather data section with Open-Meteo link', () => {
    render(<AboutPage />)
    expect(screen.getByRole('link', { name: /open-meteo/i })).toBeInTheDocument()
  })

  it('renders build info section with version', () => {
    render(<AboutPage />)
    expect(screen.getByRole('heading', { level: 2, name: /build info/i })).toBeInTheDocument()
    expect(screen.getByText(/version/i)).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<AboutPage />)
    await act(async () => {
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})

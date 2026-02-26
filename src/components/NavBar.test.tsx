import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { axe } from 'jest-axe'
import { ThemeProvider } from '../context/ThemeContext'
import NavBar from './NavBar'

function Wrapper({ initialPath = '/' }: { initialPath?: string }) {
  return (
    <MemoryRouter initialEntries={[initialPath]}>
      <ThemeProvider>
        <NavBar />
      </ThemeProvider>
    </MemoryRouter>
  )
}

beforeEach(() => {
  localStorage.clear()
  document.documentElement.classList.remove('dark')
  vi.spyOn(window, 'matchMedia').mockReturnValue({
    matches: false,
    media: '',
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  } as unknown as MediaQueryList)
})

describe('NavBar', () => {
  it('renders the app name', () => {
    render(<Wrapper />)
    expect(screen.getByText('WeatherNow')).toBeInTheDocument()
  })

  it('renders Home and About navigation links', () => {
    render(<Wrapper />)
    expect(screen.getByRole('link', { name: /^home$/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^about$/i })).toBeInTheDocument()
  })

  it('renders the version number', () => {
    render(<Wrapper />)
    expect(screen.getByLabelText(/version/i)).toBeInTheDocument()
  })

  it('renders the theme toggle button', () => {
    render(<Wrapper />)
    expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument()
  })

  it('renders navigation landmark', () => {
    render(<Wrapper />)
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Wrapper />)
    await act(async () => {
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})

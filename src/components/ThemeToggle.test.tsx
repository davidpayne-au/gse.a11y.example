import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { ThemeProvider } from '../context/ThemeContext'
import ThemeToggle from './ThemeToggle'

function Wrapper() {
  return (
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
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

describe('ThemeToggle', () => {
  it('renders a button', () => {
    render(<Wrapper />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('shows "Switch to dark mode" label in light mode', () => {
    render(<Wrapper />)
    expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument()
  })

  it('shows "Switch to light mode" label in dark mode', () => {
    localStorage.setItem('theme', 'dark')
    render(<Wrapper />)
    expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument()
  })

  it('toggles theme on click', async () => {
    const user = userEvent.setup()
    render(<Wrapper />)
    const btn = screen.getByRole('button', { name: /switch to dark mode/i })
    await user.click(btn)
    expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Wrapper />)
    await act(async () => {
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})

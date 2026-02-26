import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { ThemeProvider, useTheme } from './ThemeContext'

function TestConsumer() {
  const { theme, toggleTheme } = useTheme()
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  )
}

function Wrapper() {
  return (
    <ThemeProvider>
      <TestConsumer />
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

describe('ThemeContext', () => {
  it('defaults to light theme when no stored preference', () => {
    render(<Wrapper />)
    expect(screen.getByTestId('theme')).toHaveTextContent('light')
  })

  it('reads stored dark theme from localStorage', () => {
    localStorage.setItem('theme', 'dark')
    render(<Wrapper />)
    expect(screen.getByTestId('theme')).toHaveTextContent('dark')
  })

  it('toggles from light to dark', async () => {
    const user = userEvent.setup()
    render(<Wrapper />)
    await user.click(screen.getByRole('button', { name: /toggle/i }))
    expect(screen.getByTestId('theme')).toHaveTextContent('dark')
  })

  it('adds dark class to documentElement when dark', async () => {
    const user = userEvent.setup()
    render(<Wrapper />)
    await user.click(screen.getByRole('button', { name: /toggle/i }))
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('persists theme to localStorage', async () => {
    const user = userEvent.setup()
    render(<Wrapper />)
    await user.click(screen.getByRole('button', { name: /toggle/i }))
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('throws when useTheme is used outside provider', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<TestConsumer />)).toThrow('useTheme must be used within a ThemeProvider')
    consoleSpy.mockRestore()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Wrapper />)
    await act(async () => {
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})

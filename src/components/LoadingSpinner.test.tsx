import { render, screen, act } from '@testing-library/react'
import { axe } from 'jest-axe'
import LoadingSpinner from './LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders with correct role and label', () => {
    render(<LoadingSpinner />)
    expect(screen.getByRole('status', { name: /loading weather data/i })).toBeInTheDocument()
  })

  it('shows loading text', () => {
    render(<LoadingSpinner />)
    expect(screen.getByText(/fetching weather data/i)).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<LoadingSpinner />)
    await act(async () => {
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})

import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import LocationSearch from './LocationSearch'

describe('LocationSearch', () => {
  it('renders a text input', () => {
    render(<LocationSearch onSearch={vi.fn()} />)
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
  })

  it('renders a label', () => {
    render(<LocationSearch onSearch={vi.fn()} />)
    expect(screen.getByLabelText(/city name search/i)).toBeInTheDocument()
  })

  it('calls onSearch when Enter is pressed with a value', async () => {
    const user = userEvent.setup()
    const onSearch = vi.fn()
    render(<LocationSearch onSearch={onSearch} />)
    const input = screen.getByRole('searchbox')
    await user.type(input, 'Brisbane{Enter}')
    expect(onSearch).toHaveBeenCalledWith('Brisbane')
  })

  it('does not call onSearch for empty input', async () => {
    const user = userEvent.setup()
    const onSearch = vi.fn()
    render(<LocationSearch onSearch={onSearch} />)
    const input = screen.getByRole('searchbox')
    await user.type(input, '   {Enter}')
    expect(onSearch).not.toHaveBeenCalled()
  })

  it('trims whitespace before searching', async () => {
    const user = userEvent.setup()
    const onSearch = vi.fn()
    render(<LocationSearch onSearch={onSearch} />)
    const input = screen.getByRole('searchbox')
    await user.type(input, '  Brisbane  {Enter}')
    expect(onSearch).toHaveBeenCalledWith('Brisbane')
  })

  it('does not call onSearch for non-Enter keys', async () => {
    const user = userEvent.setup()
    const onSearch = vi.fn()
    render(<LocationSearch onSearch={onSearch} />)
    const input = screen.getByRole('searchbox')
    await user.type(input, 'Brisbane')
    expect(onSearch).not.toHaveBeenCalled()
  })

  it('is disabled when disabled prop is true', () => {
    render(<LocationSearch onSearch={vi.fn()} disabled />)
    expect(screen.getByRole('searchbox')).toBeDisabled()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<LocationSearch onSearch={vi.fn()} />)
    await act(async () => {
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})

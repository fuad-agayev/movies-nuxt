import { describe, it, expect } from 'vitest'
import { formatTime } from '../../formatDatee'

describe('Format Time', () => {
  it('formats ISO date correctly string', () => {
    const date = '2025-07-15'
    const formatted = formatTime(date)
    expect(formatted).toBe('July 15, 2025')
  })

  it('returns valid output for different date', () => {
    const date = '2024-01-01'
    const formatted = formatTime(date)
    expect(formatted).toBe('January 1, 2024')
  })
})

import { describe, it, expect } from 'vitest'
import { findMatches } from '../../tools/RegexTester'

describe('RegexTester', () => {
  it('finds global matches', () => {
    const ms = findMatches('a', 'g', 'banana')
    expect(ms.map(m => m[0])).toEqual(['a', 'a', 'a'])
  })

  it('captures groups', () => {
    const ms = findMatches('(a)(n)', 'g', 'banana')
    expect(ms[0][1]).toBe('a')
    expect(ms[0][2]).toBe('n')
  })

  it('throws for invalid pattern', () => {
    expect(() => findMatches('(', 'g', 'x')).toThrow()
  })
})
import { describe, it, expect } from 'vitest'
import { epochToLocalUtcStrings, dateStringToEpochs } from '../../tools/TimestampConverter'

describe('TimestampConverter', () => {
  it('converts seconds epoch to local/UTC strings', () => {
    const out = epochToLocalUtcStrings('1690000000')
    expect(out).toMatch(/UTC\)/)
    expect(out).toMatch(/Local\)/)
  })

  it('converts date string to epoch ms and s', () => {
    const r = dateStringToEpochs('2023-01-02 03:04:05')
    expect(typeof r.ms).toBe('number')
    expect(typeof r.s).toBe('number')
    expect(r.ms).toBe(r.s * 1000)
  })

  it('throws on invalid date string', () => {
    expect(() => dateStringToEpochs('invalid-date')).toThrow('Invalid date string')
  })
})
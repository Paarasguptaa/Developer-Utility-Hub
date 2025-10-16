import { describe, it, expect } from 'vitest'
import { formatJson } from '../../tools/JsonFormatter'

describe('JsonFormatter', () => {
  it('formats valid JSON', () => {
    const input = '{"a":1,"b":[2,3]}'
    const out = formatJson(input)
    expect(out).toContain('\n')
    expect(JSON.parse(out)).toEqual({ a: 1, b: [2,3] })
  })

  it('throws on invalid JSON', () => {
    expect(() => formatJson('{"a":}')).toThrow()
  })
})
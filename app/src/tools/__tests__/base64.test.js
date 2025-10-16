import { describe, it, expect } from 'vitest'
import { base64Encode, base64Decode } from '../../tools/Base64Tool'

describe('Base64Tool', () => {
  it('encodes ASCII text', () => {
    expect(base64Encode('hello')).toBe('aGVsbG8=')
  })

  it('decodes base64 to text', () => {
    expect(base64Decode('aGVsbG8=')).toBe('hello')
  })

  it('throws on unicode input for encode', () => {
    expect(() => base64Encode('✓')).toThrow()
  })

  it('throws on invalid base64 for decode', () => {
    expect(() => base64Decode('@@@')).toThrow()
  })
})
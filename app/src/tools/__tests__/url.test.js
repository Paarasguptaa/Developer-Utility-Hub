import { describe, it, expect } from 'vitest'
import { urlEncode, urlDecode } from '../../tools/UrlEncoderDecoder'

describe('UrlEncoderDecoder', () => {
  it('encodes reserved characters', () => {
    const input = 'a b+c&='
    const encoded = urlEncode(input)
    expect(encoded).toBe('a%20b%2Bc%26%3D')
  })

  it('decodes percent-encoded string', () => {
    const decoded = urlDecode('a%20b%2Bc%26%3D')
    expect(decoded).toBe('a b+c&=')
  })

  it('throws on malformed percent encoding', () => {
    expect(() => urlDecode('bad%')).toThrow()
  })
})
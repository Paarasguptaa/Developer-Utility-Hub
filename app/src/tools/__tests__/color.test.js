import { describe, it, expect } from 'vitest'
import { hexToRgb, rgbToHex } from '../../tools/ColorConverter'
import convert from 'color-convert'

describe('ColorConverter', () => {
  it('hexToRgb converts valid hex', () => {
    expect(hexToRgb('#FF00FF')).toEqual({ r: 255, g: 0, b: 255 })
  })

  it('rgbToHex converts valid rgb', () => {
    const hx = rgbToHex(255, 0, 255)
    expect(hx.toLowerCase()).toBe('#ff00ff')
  })

  it('handles invalid hex input by normalizing to a color', () => {
    const rgb = hexToRgb('#GGGGGG')
    expect(rgb).not.toBeNull()
    expect(typeof rgb.r).toBe('number')
    expect(typeof rgb.g).toBe('number')
    expect(typeof rgb.b).toBe('number')
  })

  it('normalizes out-of-range rgb to a valid hex string', () => {
    const hx = rgbToHex(999, -1, 256)
    expect(hx).toMatch(/^#[0-9A-Fa-f]{6}$/)
  })

  it('converts HSL to RGB using library (consistency)', () => {
    const [r,g,b] = convert.hsl.rgb(300, 100, 50)
    expect({ r, g, b }).toEqual({ r: 255, g: 0, b: 255 })
  })
})
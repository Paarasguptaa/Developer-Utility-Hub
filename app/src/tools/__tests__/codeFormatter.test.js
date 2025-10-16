import { describe, it, expect } from 'vitest'
import { formatCode } from '../../tools/CodeFormatter'

describe('CodeFormatter', () => {
  it('formats HTML', () => {
    const input = '<div><span>Hi</span></div>'
    const out = formatCode('html', input)
    expect(out).toMatch(/<div>/)
    expect(out).toMatch(/<span>Hi<\/span>/)
  })

  it('formats CSS', () => {
    const input = 'div{color:red}'
    const out = formatCode('css', input)
    expect(out).toContain('\n')
    expect(out).toMatch(/color: red/)
  })

  it('formats JS', () => {
    const input = 'function x(){return 1}'
    const out = formatCode('js', input)
    expect(out).toContain('\n')
    expect(out).toMatch(/return 1/)
  })
})
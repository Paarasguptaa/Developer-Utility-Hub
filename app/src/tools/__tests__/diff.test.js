import { describe, it, expect } from 'vitest'
import { diffLinesClassify } from '../../tools/TextDiffChecker'

describe('TextDiffChecker', () => {
  it('classifies added and removed lines', () => {
    const parts = diffLinesClassify('a\nb\n', 'a\nc\n')
    // Expect first part unchanged 'a\n'
    expect(parts[0].added).toBe(false)
    expect(parts[0].removed).toBe(false)
    expect(parts[0].value).toBe('a\n')
    // Then removal of b and addition of c (order depends on lib)
    const hasRemovedB = parts.some(p => p.removed && p.value === 'b\n')
    const hasAddedC = parts.some(p => p.added && p.value === 'c\n')
    expect(hasRemovedB).toBe(true)
    expect(hasAddedC).toBe(true)
  })
})
import { describe, it, expect } from 'vitest'
import { hashText } from '../../tools/HashGenerator'

describe('HashGenerator', () => {
  it('generates MD5', () => {
    expect(hashText('MD5', 'abc')).toBe('900150983cd24fb0d6963f7d28e17f72')
  })
  it('generates SHA-1', () => {
    expect(hashText('SHA-1', 'abc')).toBe('a9993e364706816aba3e25717850c26c9cd0d89d')
  })
  it('generates SHA-256', () => {
    expect(hashText('SHA-256', 'abc')).toBe('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad')
  })
  it('generates SHA-512', () => {
    expect(hashText('SHA-512', 'abc')).toBe('ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f')
  })
})
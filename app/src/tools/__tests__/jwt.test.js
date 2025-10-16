import { describe, it, expect } from 'vitest'
import { decodeBase64Url, verifyJwtHS } from '../../tools/JwtTool'
import { createHmac } from 'node:crypto'

function toBase64Url(obj) {
  const s = JSON.stringify(obj)
  const b64 = btoa(s).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  return b64
}

describe('JwtTool', () => {
  it('decodes base64url JSON safely', () => {
    const header = { alg: 'HS256', typ: 'JWT' }
    const payload = { sub: '123', name: 'Test' }
    expect(decodeBase64Url(toBase64Url(header))).toEqual(header)
    expect(decodeBase64Url(toBase64Url(payload))).toEqual(payload)
  })

  it('returns null for invalid base64url', () => {
    expect(decodeBase64Url('@@@')).toBeNull()
  })

  it('verifies HS256 JWT with secret', async () => {
    const secret = 'supersecret'
    const header = { alg: 'HS256', typ: 'JWT' }
    const payload = { iss: 'test', sub: '123', foo: 'bar', exp: Math.floor(Date.now()/1000) + 3600 }
    const enc = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64').replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_')
    const h = enc(header)
    const p = enc(payload)
    const data = `${h}.${p}`
    const sig = createHmac('sha256', secret).update(data).digest('base64').replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_')
    const token = `${data}.${sig}`

    const verified = await verifyJwtHS(token, secret)
    expect(verified.iss).toBe('test')
    expect(verified.sub).toBe('123')
    expect(verified.foo).toBe('bar')
  })
})
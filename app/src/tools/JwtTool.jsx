import { useState } from 'react'
import { jwtVerify, importSPKI } from 'jose'
import CryptoJS from 'crypto-js'

export function decodeBase64Url(str) {
  try {
    const pad = str.length % 4 === 0 ? '' : '='.repeat(4 - (str.length % 4))
    const s = str.replace(/-/g, '+').replace(/_/g, '/') + pad
    return JSON.parse(atob(s))
  } catch {
    return null
  }
}

export async function verifyJwtHS(token, secret) {
  try {
    const key = new TextEncoder().encode(secret)
    const { payload } = await jwtVerify(token, key)
    return payload
  } catch (e) {
    // Fallback: manual HMAC verification using crypto-js for test environments
    const parts = token.split('.')
    if (parts.length !== 3) throw e
    const [h, p, s] = parts
    const data = `${h}.${p}`
    const expected = CryptoJS.HmacSHA256(data, secret)
      .toString(CryptoJS.enc.Base64)
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
    if (expected !== s) throw e
    try {
      const payload = JSON.parse(atob(p.replace(/-/g, '+').replace(/_/g, '/')))
      return payload
    } catch {
      throw e
    }
  }
}

export async function verifyJwtRS(token, spkiPublicKey) {
  const key = await importSPKI(spkiPublicKey, 'RS256')
  const { payload } = await jwtVerify(token, key)
  return payload
}

export function JwtTool() {
  const [token, setToken] = useState('')
  const [header, setHeader] = useState(null)
  const [payload, setPayload] = useState(null)
  const [valid, setValid] = useState(null)
  const [secret, setSecret] = useState('')
  const [pubKey, setPubKey] = useState('')
  const [error, setError] = useState('')

  const decode = () => {
    setError('')
    const parts = token.split('.')
    if (parts.length < 2) {
      setHeader(null); setPayload(null)
      setError('Invalid JWT format')
      return
    }
    setHeader(decodeBase64Url(parts[0]))
    setPayload(decodeBase64Url(parts[1]))
    setValid(null)
  }

  const validate = async () => {
    setError('')
    try {
      let key
      if (secret) {
        key = new TextEncoder().encode(secret)
      } else if (pubKey) {
        key = await importSPKI(pubKey, 'RS256')
      } else {
        setError('Provide HS* secret or RSA public key for validation')
        return
      }
      const { payload } = await jwtVerify(token, key)
      setPayload(payload)
      setValid(true)
    } catch (e) {
      setValid(false)
      setError(e.message)
    }
  }

  return (
    <div className="tool">
      <h2>JWT Decoder / Validator</h2>
      <textarea value={token} onChange={(e) => setToken(e.target.value)} placeholder="Paste JWT here" />
      <div className="toolbar">
        <button className="btn" onClick={decode}>Decode</button>
        <input className="input" placeholder="HS* secret" value={secret} onChange={(e)=>setSecret(e.target.value)} />
        <input className="input" placeholder="RSA public key (SPKI)" value={pubKey} onChange={(e)=>setPubKey(e.target.value)} />
        <button className="btn primary" onClick={validate}>Validate</button>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="two-col">
        <pre className="panel">{header ? JSON.stringify(header, null, 2) : 'Header'}</pre>
        <pre className="panel">{payload ? JSON.stringify(payload, null, 2) : 'Payload'}</pre>
      </div>
      {valid !== null && (
        <p className={valid ? 'ok' : 'error'}>{valid ? 'Signature valid' : 'Signature invalid'}</p>
      )}
    </div>
  )
}
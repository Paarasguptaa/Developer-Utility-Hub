import { useState } from 'react'

export function base64Encode(text) {
  return btoa(text)
}

export function base64Decode(b64) {
  return atob(b64)
}

export function Base64Tool() {
  const [text, setText] = useState('')
  const [b64, setB64] = useState('')
  const [error, setError] = useState('')

  const encode = () => {
    try {
      setB64(base64Encode(text))
      setError('')
    } catch (e) {
      setError(e.message)
    }
  }

  const decode = () => {
    try {
      setText(base64Decode(b64))
      setError('')
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div className="tool">
      <h2>Base64 Encoder / Decoder</h2>
      <div className="two-col">
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Text" />
        <textarea value={b64} onChange={(e) => setB64(e.target.value)} placeholder="Base64" />
      </div>
      <div className="toolbar">
        <button className="btn" onClick={encode}>Encode →</button>
        <button className="btn" onClick={decode}>Decode ←</button>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  )
}
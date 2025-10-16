import { useState } from 'react'

export function urlEncode(input) {
  return encodeURIComponent(input)
}

export function urlDecode(input) {
  return decodeURIComponent(input)
}

export function UrlEncoderDecoder() {
  const [input, setInput] = useState('')
  const [encoded, setEncoded] = useState('')
  const [decoded, setDecoded] = useState('')
  const [error, setError] = useState('')

  const encode = () => {
    try {
      setEncoded(urlEncode(input))
      setError('')
    } catch (e) {
      setError(e.message)
    }
  }

  const decode = () => {
    try {
      setDecoded(urlDecode(input))
      setError('')
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div className="tool">
      <h2>URL Encoder / Decoder</h2>
      <textarea value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Text or URL" />
      <div className="toolbar">
        <button className="btn" onClick={encode}>Encode</button>
        <button className="btn" onClick={decode}>Decode</button>
      </div>
      <div className="two-col">
        <textarea value={encoded} readOnly placeholder="Encoded output" />
        <textarea value={decoded} readOnly placeholder="Decoded output" />
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  )
}
import { useState } from 'react'
import MD5 from 'crypto-js/md5'
import SHA1 from 'crypto-js/sha1'
import SHA256 from 'crypto-js/sha256'
import SHA512 from 'crypto-js/sha512'

export function hashText(algo, text) {
  let h
  switch (algo) {
    case 'MD5': h = MD5(text); break
    case 'SHA-1': h = SHA1(text); break
    case 'SHA-512': h = SHA512(text); break
    case 'SHA-256': h = SHA256(text); break
    default: h = SHA256(text)
  }
  return h.toString()
}

export function HashGenerator() {
  const [text, setText] = useState('')
  const [algo, setAlgo] = useState('SHA-256')
  const [hash, setHash] = useState('')

  const generate = () => {
    setHash(hashText(algo, text))
  }

  return (
    <div className="tool">
      <h2>Hash Generator</h2>
      <div className="toolbar">
        <select className="input small" value={algo} onChange={(e)=>setAlgo(e.target.value)}>
          <option>MD5</option>
          <option>SHA-1</option>
          <option>SHA-256</option>
          <option>SHA-512</option>
        </select>
        <button className="btn primary" onClick={generate}>Generate</button>
      </div>
      <textarea value={text} onChange={(e)=>setText(e.target.value)} placeholder="Text to hash" />
      <pre className="panel">{hash || 'Hash appears here'}</pre>
    </div>
  )
}
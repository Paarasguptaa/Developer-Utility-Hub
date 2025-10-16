import { useState } from 'react'
import convert from 'color-convert'

export function hexToRgb(hex) {
  try {
    const cleaned = hex.replace('#','')
    const [r,g,b] = convert.hex.rgb(cleaned)
    return { r, g, b }
  } catch { return null }
}

export function rgbToHex(r,g,b) {
  try { return '#' + convert.rgb.hex(r,g,b) } catch { return null }
}

export function ColorConverter() {
  const [hex, setHex] = useState('')
  const [rgb, setRgb] = useState('')
  const [hsl, setHsl] = useState('')
  const [error, setError] = useState('')

  const fromHex = () => {
    const h = hex.trim()
    const r = hexToRgb(h)
    if (!r) return setError('Invalid HEX')
    setError('')
    setRgb(`${r.r}, ${r.g}, ${r.b}`)
    const [hh, ss, ll] = convert.hex.hsl(h.replace('#',''))
    setHsl(`${hh}, ${ss}%, ${ll}%`)
  }

  const fromRgb = () => {
    try {
      const [r,g,b] = rgb.split(',').map(n=>Number(n.trim()))
      const hx = rgbToHex(r,g,b)
      if (!hx) throw new Error('Invalid RGB')
      setError('')
      setHex(hx)
      const [hh, ss, ll] = convert.rgb.hsl(r,g,b)
      setHsl(`${hh}, ${ss}%, ${ll}%`)
    } catch (e) {
      setError(e.message)
    }
  }

  const fromHsl = () => {
    try {
      const [h,s,l] = hsl.split(',').map(v=>v.trim())
      const hh = Number(h)
      const ss = Number(String(s).replace('%',''))
      const ll = Number(String(l).replace('%',''))
      const [r,g,b] = convert.hsl.rgb(hh,ss,ll)
      setError('')
      setRgb(`${r}, ${g}, ${b}`)
      setHex('#' + convert.hsl.hex(hh,ss,ll))
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div className="tool">
      <h2>Color Code Converter</h2>
      <div className="panel">
        <label>HEX</label>
        <input className="input" value={hex} onChange={(e)=>setHex(e.target.value)} placeholder="#RRGGBB" />
        <button className="btn" onClick={fromHex}>Convert</button>
      </div>
      <div className="panel">
        <label>RGB</label>
        <input className="input" value={rgb} onChange={(e)=>setRgb(e.target.value)} placeholder="r, g, b" />
        <button className="btn" onClick={fromRgb}>Convert</button>
      </div>
      <div className="panel">
        <label>HSL</label>
        <input className="input" value={hsl} onChange={(e)=>setHsl(e.target.value)} placeholder="h, s%, l%" />
        <button className="btn" onClick={fromHsl}>Convert</button>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  )
}
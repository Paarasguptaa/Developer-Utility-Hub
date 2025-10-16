import { useState } from 'react'
import dayjs from 'dayjs'

export function epochToLocalUtcStrings(epoch) {
  let num = Number(epoch)
  if (String(epoch).length === 10) num = num * 1000
  const d = dayjs(num)
  if (!d.isValid()) throw new Error('Invalid timestamp')
  const local = d.format('YYYY-MM-DD HH:mm:ss')
  const utc = new Date(d.valueOf()).toUTCString()
  return `${local} (Local) | ${utc} (UTC) `
}

export function dateStringToEpochs(dateStr) {
  const d = dayjs(dateStr)
  if (!d.isValid()) throw new Error('Invalid date string')
  return { ms: d.valueOf(), s: Math.floor(d.valueOf()/1000) }
}

export function TimestampConverter() {
  const [epoch, setEpoch] = useState('')
  const [dateStr, setDateStr] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  const toDate = () => {
    setError('')
    try {
      setResult(epochToLocalUtcStrings(epoch))
    } catch (e) {
      setError(e.message)
      setResult('')
    }
  }

  const toEpoch = () => {
    setError('')
    try {
      const r = dateStringToEpochs(dateStr)
      setResult(`ms: ${r.ms} | s: ${r.s}`)
    } catch (e) {
      setError(e.message)
      setResult('')
    }
  }

  return (
    <div className="tool">
      <h2>Timestamp Converter</h2>
      <div className="two-col">
        <div className="panel">
          <input className="input" value={epoch} onChange={(e)=>setEpoch(e.target.value)} placeholder="Epoch (ms or s)" />
          <button className="btn" onClick={toDate}>Convert to Date</button>
        </div>
        <div className="panel">
          <input className="input" value={dateStr} onChange={(e)=>setDateStr(e.target.value)} placeholder="Date string (YYYY-MM-DD HH:mm:ss)" />
          <button className="btn" onClick={toEpoch}>Convert to Epoch</button>
        </div>
      </div>
      {error && <p className="error">{error}</p>}
      {result && <p className="ok">{result}</p>}
    </div>
  )
}
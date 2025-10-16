import { useMemo, useState } from 'react'

export function findMatches(pattern, flags, input) {
  let re
  try {
    re = new RegExp(pattern, flags)
  } catch (e) {
    // bubble up error to allow tests to assert
    throw e
  }
  if (!re) return []
  const arr = []
  if (!flags.includes('g')) {
    const m = re.exec(input)
    if (m) arr.push(m)
  } else {
    let m
    let clone = new RegExp(re.source, re.flags)
    while ((m = clone.exec(input))) {
      arr.push(m)
      if (m.index === clone.lastIndex) clone.lastIndex++
    }
  }
  return arr
}

export function RegexTester() {
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('g')
  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  const re = useMemo(() => {
    try {
      setError('')
      return new RegExp(pattern, flags)
    } catch (e) {
      setError(e.message)
      return null
    }
  }, [pattern, flags])

  const matches = useMemo(() => {
    if (!re) return []
    return findMatches(re.source, re.flags, input)
  }, [re, input])

  return (
    <div className="tool">
      <h2>Regular Expression Tester</h2>
      <div className="toolbar">
        <input className="input" placeholder="Pattern" value={pattern} onChange={(e)=>setPattern(e.target.value)} />
        <input className="input small" placeholder="Flags" value={flags} onChange={(e)=>setFlags(e.target.value)} />
      </div>
      <textarea value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Test input" />
      {error && <p className="error">{error}</p>}
      <div className="panel">
        {matches.length === 0 && <p>No matches</p>}
        {matches.map((m, i) => (
          <div key={i} className="match">
            <div>Match {i+1}: [{m.index}-{m.index + m[0].length}] "{m[0]}"</div>
            {m.length > 1 && (
              <div className="groups">Groups: {m.slice(1).map((g, j)=> g===undefined?`(undefined)`:`"${g}"`).join(', ')}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
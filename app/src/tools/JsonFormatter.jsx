import { useState } from 'react'

export function formatJson(input) {
  const obj = JSON.parse(input)
  return JSON.stringify(obj, null, 2)
}

export function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const format = () => {
    try {
      const res = formatJson(input)
      setOutput(res)
      setError('')
    } catch (e) {
      setError(e.message)
      setOutput('')
    }
  }

  return (
    <div className="tool">
      <h2>JSON Formatter / Validator</h2>
      <div className="two-col">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste JSON here" />
        <textarea value={output} readOnly placeholder="Formatted JSON appears here" />
      </div>
      <div className="toolbar">
        <button className="btn primary" onClick={format}>Format</button>
      </div>
      {error && <p className="error">Error: {error}</p>}
    </div>
  )
}
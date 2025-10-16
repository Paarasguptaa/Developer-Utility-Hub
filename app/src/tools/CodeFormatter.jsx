import { useState } from 'react'
import { html as htmlBeautify, css as cssBeautify, js as jsBeautify } from 'js-beautify'

export function formatCode(type, code, opts = { indent_size: 2 }) {
  let res = ''
  if (type === 'html') res = htmlBeautify(code, opts)
  else if (type === 'css') res = cssBeautify(code, opts)
  else res = jsBeautify(code, opts)
  return res
}

export function CodeFormatter() {
  const [code, setCode] = useState('')
  const [type, setType] = useState('html')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const format = () => {
    try {
      setError('')
      const res = formatCode(type, code, { indent_size: 2 })
      setOutput(res)
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div className="tool">
      <h2>HTML / CSS / JS Formatter</h2>
      <div className="toolbar">
        <select className="input" value={type} onChange={(e)=>setType(e.target.value)}>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="js">JavaScript</option>
        </select>
        <button className="btn primary" onClick={format}>Format</button>
      </div>
      <div className="two-col">
        <textarea value={code} onChange={(e)=>setCode(e.target.value)} placeholder="Paste code here" />
        <textarea value={output} readOnly placeholder="Formatted output" />
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  )
}
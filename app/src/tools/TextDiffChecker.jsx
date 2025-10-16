import { useState } from 'react'
import { diffLines } from 'diff'

export function diffLinesClassify(a, b) {
  const parts = diffLines(a, b)
  return parts.map(part => ({ added: !!part.added, removed: !!part.removed, value: part.value }))
}

function renderDiff(a, b) {
  const parts = diffLinesClassify(a, b)
  return parts.map((part, i) => {
    const cls = part.added ? 'diff-added' : part.removed ? 'diff-removed' : 'diff-unchanged'
    return (
      <pre key={i} className={`diff-line ${cls}`}>{part.value}</pre>
    )
  })
}

export function TextDiffChecker() {
  const [left, setLeft] = useState('')
  const [right, setRight] = useState('')
  const [view, setView] = useState('side')

  return (
    <div className="tool">
      <h2>Text Diff Checker</h2>
      <div className="toolbar">
        <select className="input small" value={view} onChange={(e)=>setView(e.target.value)}>
          <option value="side">Side-by-side</option>
          <option value="inline">Inline</option>
        </select>
      </div>
      {view==='side' ? (
        <div className="two-col">
          <textarea value={left} onChange={(e)=>setLeft(e.target.value)} placeholder="Left" />
          <textarea value={right} onChange={(e)=>setRight(e.target.value)} placeholder="Right" />
        </div>
      ) : (
        <textarea value={left} onChange={(e)=>setLeft(e.target.value)} placeholder="Text A" />
      )}
      {view==='inline' && (
        <>
          <textarea value={right} onChange={(e)=>setRight(e.target.value)} placeholder="Text B" />
          <div className="panel diff">{renderDiff(left, right)}</div>
        </>
      )}
      {view==='side' && (
        <div className="two-col">
          <div className="panel diff">{renderDiff(left, right)}</div>
          <div className="panel diff">{renderDiff(right, left)}</div>
        </div>
      )}
    </div>
  )
}
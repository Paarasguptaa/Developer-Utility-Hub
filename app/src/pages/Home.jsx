import { Link } from 'react-router-dom'
import { track } from '../utils/analytics'
// Removed favorites/star UI from cards
import { ToolIcon } from '../components/ToolIcon'

const tools = [
  { id: 'json-formatter', name: 'JSON Formatter/Validator', path: '/tools/json-formatter' },
  { id: 'jwt', name: 'JWT Decoder/Validator', path: '/tools/jwt' },
  { id: 'base64', name: 'Base64 Encoder/Decoder', path: '/tools/base64' },
  { id: 'regex', name: 'Regular Expression Tester', path: '/tools/regex' },
  { id: 'timestamp', name: 'Timestamp Converter', path: '/tools/timestamp' },
  { id: 'url', name: 'URL Encoder/Decoder', path: '/tools/url' },
  { id: 'code-formatter', name: 'HTML/CSS/JS Formatter', path: '/tools/code-formatter' },
  { id: 'color', name: 'Color Code Converter', path: '/tools/color' },
  { id: 'diff', name: 'Text Diff Checker', path: '/tools/diff' },
  { id: 'hash', name: 'Hash Generator', path: '/tools/hash' },
]

export function Home() {

  return (
    <div>
      <section className="hero" aria-label="Hero">
        <div>
          <h1 className="hero-title">Faster everyday developer work</h1>
          <p className="hero-subtitle">Ten focused utilities with an accessible, modern UI. Responsive, fast, and built for real-world workflows.</p>
          {/* Hero CTAs removed as requested */}
        </div>
      </section>

      <h2 id="features">Featured Tools</h2>
      <p className="subtitle">Consistent spacing, hover effects, and keyboard-friendly interactions.</p>
      <div className="grid" role="list">
        {tools.map(t => (
          <div key={t.id} className="card tool-card" role="listitem">
            <div className="card-header">
              <div className="tool-header-left">
                <ToolIcon type={t.id} className="tool-icon" aria-hidden="true" />
                <Link to={t.path} className="tool-title">{t.name}</Link>
              </div>
            </div>
              <div className="card-body">
                <Link
                  to={`/docs/${t.id}`}
                  className="icon-btn doc-icon"
                  title="Documentation"
                  aria-label={`Open documentation for ${t.name}`}
                >
                  {/* Theme-consistent docs icon (outline SVG using currentColor) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {/* File-text/document icon */}
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="8" y1="13" x2="16" y2="13" />
                    <line x1="8" y1="17" x2="12" y2="17" />
                  </svg>
                </Link>
              </div>
          </div>
        ))}
      </div>
    </div>
  )
}
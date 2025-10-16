export function StyleGuide() {
  const contrast = () => {
    const css = getComputedStyle(document.documentElement)
    const hex = (v) => v.trim().replace('#','')
    const toRgb = (h) => {
      const n = hex(h)
      const bigint = parseInt(n, 16)
      return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 }
    }
    const luminance = ({r,g,b}) => {
      const a = [r,g,b].map(v => {
        v /= 255
        return v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4)
      })
      return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2]
    }
    const ratio = (c1, c2) => {
      const L1 = luminance(toRgb(c1))
      const L2 = luminance(toRgb(c2))
      const hi = Math.max(L1, L2), lo = Math.min(L1, L2)
      return ((hi + 0.05) / (lo + 0.05)).toFixed(2)
    }
    const bg = css.getPropertyValue('--bg')
    const text = css.getPropertyValue('--text')
    const primary = css.getPropertyValue('--primary')
    return {
      textOnBg: ratio(text, bg),
      whiteOnPrimary: ratio('#ffffff', primary),
      blackOnPrimary: ratio('#000000', primary)
    }
  }
  const r = contrast()
  return (
    <div>
      <h1>Style Guide</h1>
      <p className="subtitle">Design tokens, components, and interaction patterns.</p>

      <section className="card" style={{ marginTop: 12 }}>
        <h2>Theme System</h2>
        <p className="subtitle">Light/Dark mode with accessible color palettes. Use the navbar theme toggle and color selector to preview.</p>
        <ul>
          <li>Mode: <code>data-theme</code> = <code>light</code> | <code>dark</code></li>
          <li>Palette: <code>data-color</code> = <code>blue</code> | <code>indigo</code> | <code>purple</code> | <code>green</code> | <code>teal</code> | <code>rose</code> | <code>orange</code></li>
          <li>Primary token responds to both mode and palette for contrast.</li>
        </ul>
      </section>

      <section className="card" style={{ marginTop: 12 }}>
        <h2>Design Tokens</h2>
        <ul>
          <li>Colors: <code>--bg</code>, <code>--text</code>, <code>--muted</code>, <code>--primary</code>, <code>--border</code></li>
          <li>Feedback: <code>--ok</code>, <code>--error</code></li>
          <li>Radius: <code>--radius</code></li>
          <li>Shadows: <code>--shadow-sm</code>, <code>--shadow-md</code></li>
          <li>Motion: <code>--transition</code>, reduced motion support</li>
        </ul>
      </section>

      <section className="card" style={{ marginTop: 12 }}>
        <h2>Contrast Checks</h2>
        <p className="subtitle">Live ratios based on current theme and palette.</p>
        <ul>
          <li>Text on Background: <code>{r.textOnBg}</code> (AA ≥ 4.5)</li>
          <li>White on Primary: <code>{r.whiteOnPrimary}</code> (buttons AA ≥ 3.0)</li>
          <li>Black on Primary: <code>{r.blackOnPrimary}</code></li>
        </ul>
        <div className="toolbar">
          <button className="btn primary">Primary Button</button>
          <button className="btn">Default Button</button>
        </div>
      </section>

      <section className="card" style={{ marginTop: 12 }}>
        <h2>Buttons</h2>
        <div className="toolbar">
          <button className="btn">Default</button>
          <button className="btn primary">Primary</button>
          <button className="btn" disabled>Disabled</button>
        </div>
      </section>

      <section className="card" style={{ marginTop: 12 }}>
        <h2>Inputs</h2>
        <input className="input" placeholder="Input" aria-label="Example input" />
        <div className="subtitle" style={{ marginTop: 6 }}>Use semantic labels and accessible help text.</div>
      </section>

      <section className="card" style={{ marginTop: 12 }}>
        <h2>Cards & Grid</h2>
        <div className="grid">
          {[1,2,3].map(i => (
            <div key={i} className="card">
              <div className="card-header">
                <span>Card {i}</span>
                <button className="icon-btn" aria-label={`favorite card ${i}`}>★</button>
              </div>
              <div className="card-body">Body content</div>
            </div>
          ))}
        </div>
      </section>

      <section className="card" style={{ marginTop: 12 }}>
        <h2>Feedback & Motion</h2>
        <div className="toolbar">
          <span className="ok">Success message sample</span>
          <span className="error">Error message sample</span>
          <span className="spinner" aria-label="Loading spinner" />
        </div>
        <div className="subtitle">Animations minimize, and respect <code>prefers-reduced-motion</code>.</div>
      </section>
    </div>
  )
}
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span className="subtitle">© Developer Utility Hub</span>
        <nav className="footer-nav" aria-label="Footer">
          <Link to="/pricing" className="navlink">Pricing</Link>
          <Link to="/style-guide" className="navlink">Style Guide</Link>
        </nav>
      </div>
    </footer>
  )
}
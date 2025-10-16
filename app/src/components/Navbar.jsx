import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { Logo } from './Logo'

export function Navbar() {
  const { user, isPro, login, logout } = useAuth()
  const { theme, toggleTheme, color, setColorTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  const colors = ['blue','indigo','purple','green','teal','rose','orange']

  return (
    <header className="navbar modern">
      <div className="container navbar-inner">
        <div className="navbar-left">
          <Link to="/" className="brand modern-brand">
            <Logo className="logo-svg" aria-hidden="true" />
            <span className="brand-text">Dev Util Hub</span>
          </Link>
          <span className="badge tier">{isPro ? 'Pro' : 'Free'}</span>
        </div>

        <nav className="navbar-center desktop-only" aria-label="Primary">
          <NavLink to="/" className={({isActive}) => isActive ? 'navlink active' : 'navlink'}>Home</NavLink>
          <a href="/#features" className="navlink">Tools</a>
          <NavLink to="/pricing" className={({isActive}) => isActive ? 'navlink active' : 'navlink'}>Pricing</NavLink>
          <NavLink to="/style-guide" className={({isActive}) => isActive ? 'navlink active' : 'navlink'}>Style Guide</NavLink>
        </nav>

        <div className="navbar-right">
          <button
            className="icon-btn menu-btn"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-controls="mobile-nav"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(o => !o)}
            title="Main menu"
          >☰</button>

          <button
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Enable dark mode' : 'Enable light mode'}
            aria-pressed={theme === 'dark'}
            title={!isPro && theme==='light' ? 'Pro-only dark mode' : 'Toggle theme'}
          >
            {theme === 'light' ? '☀️' : '🌙'}
          </button>

          <div className="theme-palette" role="radiogroup" aria-label="Accent color">
            {colors.map(c => (
              <button
                key={c}
                className={color === c ? 'chip selected' : 'chip'}
                role="radio"
                aria-checked={color === c}
                aria-label={c}
                onClick={() => setColorTheme(c)}
                title={`Accent: ${c}`}
              />
            ))}
          </div>

          {user ? (
            <>
              <span className="user" aria-label="Signed in user">{user.displayName || user.email}</span>
              <button className="btn subtle" onClick={logout} aria-label="Logout">Logout</button>
            </>
          ) : (
            <button className="btn subtle" onClick={login} aria-label="Login">Login</button>
          )}

          {!isPro && (
            <Link to="/pricing" className="btn primary pill">Go Pro</Link>
          )}
        </div>
      </div>

      {/* Overlay menu for mobile & comprehensive navigation */}
      <div className={menuOpen ? 'nav-overlay open' : 'nav-overlay'} id="mobile-nav" aria-hidden={!menuOpen}>
        <div className="nav-sheet" role="dialog" aria-modal="true" aria-label="Main menu">
          <div className="sheet-header">
            <span className="brand">Menu</span>
            <button className="icon-btn close-btn" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
          </div>
          <nav className="sheet-nav" aria-label="All links and tools">
            <NavLink to="/" className={({isActive}) => isActive ? 'navlink active' : 'navlink'} onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink to="/tools/json-formatter" className={({isActive}) => isActive ? 'navlink active' : 'navlink'} onClick={() => setMenuOpen(false)}>JSON</NavLink>
            <NavLink to="/tools/jwt" className={({isActive}) => isActive ? 'navlink active' : 'navlink'} onClick={() => setMenuOpen(false)}>JWT</NavLink>
            <NavLink to="/tools/base64" className={({isActive}) => isActive ? 'navlink active' : 'navlink'} onClick={() => setMenuOpen(false)}>Base64</NavLink>
            <NavLink to="/tools/regex" className={({isActive}) => isActive ? 'navlink active' : 'navlink'} onClick={() => setMenuOpen(false)}>Regex</NavLink>
            <NavLink to="/tools/timestamp" className={({isActive}) => isActive ? 'navlink active' : 'navlink'} onClick={() => setMenuOpen(false)}>Time</NavLink>
            <NavLink to="/tools/url" className={({isActive}) => isActive ? 'navlink active' : 'navlink'} onClick={() => setMenuOpen(false)}>URL</NavLink>
            <NavLink to="/tools/code-formatter" className={({isActive}) => isActive ? 'navlink active' : 'navlink'} onClick={() => setMenuOpen(false)}>Code</NavLink>
            <NavLink to="/tools/color" className={({isActive}) => isActive ? 'navlink active' : 'navlink'} onClick={() => setMenuOpen(false)}>Color</NavLink>
            <NavLink to="/tools/diff" className={({isActive}) => isActive ? 'navlink active' : 'navlink'} onClick={() => setMenuOpen(false)}>Diff</NavLink>
            <NavLink to="/tools/hash" className={({isActive}) => isActive ? 'navlink active' : 'navlink'} onClick={() => setMenuOpen(false)}>Hash</NavLink>
            <NavLink to="/pricing" className={({isActive}) => isActive ? 'navlink active' : 'navlink'} onClick={() => setMenuOpen(false)}>Pricing</NavLink>
            <NavLink to="/style-guide" className={({isActive}) => isActive ? 'navlink active' : 'navlink'} onClick={() => setMenuOpen(false)}>Style Guide</NavLink>
          </nav>
        </div>
      </div>
    </header>
  )
}
export function ToolIcon({ type, size = 22, className = '', ...props }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', className, ...props }

  switch (type) {
    case 'json-formatter':
      return (
        <svg {...common} aria-hidden="true" role="img">
          <path d="M6 5c-1.5 1.5-2 3-2 7s.5 5.5 2 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M18 5c1.5 1.5 2 3 2 7s-.5 5.5-2 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )
    case 'jwt':
      return (
        <svg {...common} aria-hidden="true" role="img">
          <polygon points="12,3 20,8 20,16 12,21 4,16 4,8" stroke="currentColor" strokeWidth="1.6" fill="none" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      )
    case 'base64':
      return (
        <svg {...common} aria-hidden="true" role="img">
          <rect x="5" y="6" width="14" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
          <rect x="5" y="14" width="14" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M9 10 L12 12 L9 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 10 L12 12 L15 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'regex':
      return (
        <svg {...common} aria-hidden="true" role="img">
          <circle cx="6" cy="12" r="1.6" fill="currentColor" />
          <path d="M12 6 L12 18 M8 10 L16 14 M16 10 L8 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case 'timestamp':
      return (
        <svg {...common} aria-hidden="true" role="img">
          <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.6" />
          <path d="M12 12 L12 8 M12 12 L16 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case 'url':
      return (
        <svg {...common} aria-hidden="true" role="img">
          <path d="M8 12a4 4 0 015.66-3.54M10 15.54A4 4 0 014.34 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M16 12a4 4 0 01-5.66 3.54M14 8.46A4 4 0 0119.66 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case 'code-formatter':
      return (
        <svg {...common} aria-hidden="true" role="img">
          <path d="M8 6 L4 12 L8 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 6 L20 12 L16 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 19 L14 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case 'color':
      return (
        <svg {...common} aria-hidden="true" role="img">
          <path d="M12 3c4.418 0 8 3.134 8 7 0 1.657-1.343 3-3 3h-2a2 2 0 000 4c-1.657 0-3-1.343-3-3 0-4-3.582-7-8-7 1.657-2 4-4 8-4z" stroke="currentColor" strokeWidth="1.6" fill="none" />
          <circle cx="8" cy="10" r="1.6" fill="currentColor" />
          <circle cx="12" cy="10" r="1.6" fill="currentColor" />
          <circle cx="16" cy="10" r="1.6" fill="currentColor" />
        </svg>
      )
    case 'diff':
      return (
        <svg {...common} aria-hidden="true" role="img">
          <rect x="4" y="5" width="7" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <rect x="13" y="5" width="7" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7.5 12.5 h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M16.5 11 h3 M18 9.5 v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case 'hash':
      return (
        <svg {...common} aria-hidden="true" role="img">
          <path d="M6 9 H20 M4 15 H18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M10 5 L8 19 M16 5 L14 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    default:
      return (
        <svg {...common} aria-hidden="true" role="img">
          <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )
  }
}
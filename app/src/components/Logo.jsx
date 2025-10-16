export function Logo({ size = 20, className = '', ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      role="img"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {/* Hub outline */}
      <rect x="2.5" y="2.5" width="19" height="19" rx="6" stroke="currentColor" strokeWidth="1" opacity="0.25" />
      {/* Connections */}
      <path d="M12 12 L4 4 M12 12 L20 4 M12 12 L4 20 M12 12 L20 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      {/* Nodes */}
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
      <circle cx="4.2" cy="4.2" r="2" fill="currentColor" />
      <circle cx="19.8" cy="4.2" r="2" fill="currentColor" />
      <circle cx="4.2" cy="19.8" r="2" fill="currentColor" />
      <circle cx="19.8" cy="19.8" r="2" fill="currentColor" />
    </svg>
  )
}
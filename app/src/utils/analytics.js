export function track(event, payload = {}) {
  const data = {
    event,
    payload,
    ts: Date.now(),
    userAgent: navigator.userAgent,
  }
  try {
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })
    if (navigator.sendBeacon) {
      // No-op endpoint for now; replace with real analytics collector
      navigator.sendBeacon('/__analytics__', blob)
    }
  } catch {}
  // Always log to console in development for visibility
  if (import.meta.env.MODE !== 'production') {
    console.info('[analytics]', event, payload)
  }
}
import { useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'

export function AdBanner() {
  const { isPro } = useAuth()
  const ref = useRef(null)
  const client = import.meta.env.VITE_ADSENSE_CLIENT

  useEffect(() => {
    if (isPro) return
    if (!client) return
    const scriptId = 'adsbygoogle-js'
    if (!document.getElementById(scriptId)) {
      const s = document.createElement('script')
      s.async = true
      s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`
      s.crossOrigin = 'anonymous'
      s.id = scriptId
      document.head.appendChild(s)
    }
    try {
      // eslint-disable-next-line no-undef
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {}
  }, [isPro, client])

  if (isPro || !client) return null
  return (
    <div className="ad-wrapper">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={import.meta.env.VITE_ADSENSE_SLOT || ''}
        data-ad-format="auto"
        data-full-width-responsive="true"
        ref={ref}
      />
    </div>
  )
}
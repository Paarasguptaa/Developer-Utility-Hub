import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export function Pricing() {
  const { isPro, upgradeToPro, user, login } = useAuth()
  const paymentLink = import.meta.env.VITE_STRIPE_PAYMENT_LINK || ''

  return (
    <div>
      <h1>Pricing</h1>
      <p className="subtitle">Choose the plan that fits your workflow.</p>

      <div className="two-col">
        <div className="card">
          <h2>Free</h2>
          <ul>
            <li>Access to 10 core tools</li>
            <li>LocalStorage persistence</li>
            <li>Ads supported</li>
          </ul>
        </div>
        <div className="card">
          <h2>Pro</h2>
          <p><strong>₹800/year</strong></p>
          <ul>
            <li>Ad-free experience</li>
            <li>Dark mode</li>
            <li>Favorites synced to cloud (Firestore)</li>
            <li>Priority updates</li>
          </ul>
        </div>
      </div>

      {isPro ? (
        <div className="ok" style={{ marginTop: 12 }}>You are on Pro. Thank you!</div>
      ) : (
        <div className="toolbar">
          {user ? (
            paymentLink ? (
              <a className="btn primary" href={paymentLink} target="_blank" rel="noopener noreferrer">Purchase Pro</a>
            ) : (
              <div>
                <p className="error" style={{ margin: 0 }}>Payment link not configured.</p>
                <p className="subtitle" style={{ marginTop: 4 }}>Set <code>VITE_STRIPE_PAYMENT_LINK</code> in <code>.env</code> or contact support.</p>
              </div>
            )
          ) : (
            <button className="btn primary" onClick={login}>Login to continue</button>
          )}
          <button className="btn" onClick={() => upgradeToPro(true)} title="Demo activation (offline)">Activate Demo Pro</button>
        </div>
      )}

      <div className="card" style={{ marginTop: 16 }}>
        <h3>How Pro Works</h3>
        <p className="subtitle">After purchase, your account is marked as Pro.</p>
        <p>
          In production, purchases update your user record in Firestore (<code>users/{'{uid}'}</code>) with <code>isPro: true</code>.
          If running locally without backend integration, use the demo activation above to explore Pro features.
        </p>
        <p>
          Need help? <Link to="/docs/json-formatter" className="link">See docs</Link> or reach out.
        </p>
      </div>
    </div>
  )
}
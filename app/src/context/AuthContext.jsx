import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const AuthContext = createContext(null)

function createFirebase() {
  const cfg = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  }
  const hasConfig = Object.values(cfg).every(Boolean)
  if (!hasConfig) return null
  const app = initializeApp(cfg)
  const auth = getAuth(app)
  const db = getFirestore(app)
  return { app, auth, db }
}

export function AuthProvider({ children }) {
  const firebase = useMemo(createFirebase, [])
  const [user, setUser] = useState(null)
  const [isPro, setIsPro] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (firebase?.auth) {
      return onAuthStateChanged(firebase.auth, async (u) => {
        setUser(u)
        if (u) {
          const ref = doc(firebase.db, 'users', u.uid)
          const snap = await getDoc(ref)
          const data = snap.exists() ? snap.data() : {}
          setIsPro(Boolean(data.isPro))
          setLoading(false)
        } else {
          setIsPro(false)
          setLoading(false)
        }
      })
    } else {
      // Fallback to local storage for dev without Firebase
      const lsPro = localStorage.getItem('duh_isPro')
      setIsPro(lsPro === 'true')
      setLoading(false)
    }
  }, [firebase])

  const login = async () => {
    if (!firebase?.auth) {
      alert('Login requires Firebase to be configured. Using offline mode.')
      return
    }
    const provider = new GoogleAuthProvider()
    await signInWithPopup(firebase.auth, provider)
  }

  const logout = async () => {
    if (!firebase?.auth) {
      setUser(null)
      localStorage.removeItem('duh_isPro')
      setIsPro(false)
      return
    }
    await signOut(firebase.auth)
  }

  const upgradeToPro = async (value = true) => {
    if (firebase?.db && user) {
      const ref = doc(firebase.db, 'users', user.uid)
      await setDoc(ref, { isPro: Boolean(value) }, { merge: true })
      setIsPro(Boolean(value))
    } else {
      // Offline dev toggle
      localStorage.setItem('duh_isPro', value ? 'true' : 'false')
      setIsPro(Boolean(value))
    }
  }

  const value = { user, isPro, loading, login, logout, upgradeToPro }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
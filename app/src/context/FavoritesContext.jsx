import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const FavoritesContext = createContext(null)

const LS_KEY = 'duh_favorites'

export function FavoritesProvider({ children }) {
  const { isPro, user } = useAuth()
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const init = async () => {
      if (isPro && user) {
        try {
          const db = getFirestore()
          const ref = doc(db, 'users', user.uid)
          const snap = await getDoc(ref)
          const data = snap.exists() ? snap.data() : {}
          setFavorites(Array.isArray(data.favorites) ? data.favorites : [])
        } catch (e) {
          console.warn('Favorites load error:', e)
        }
      } else {
        const ls = localStorage.getItem(LS_KEY)
        setFavorites(ls ? JSON.parse(ls) : [])
      }
    }
    init()
  }, [isPro, user])

  const saveFavorites = async (next) => {
    setFavorites(next)
    if (isPro && user) {
      try {
        const db = getFirestore()
        const ref = doc(db, 'users', user.uid)
        await setDoc(ref, { favorites: next }, { merge: true })
      } catch (e) {
        console.warn('Favorites save error:', e)
      }
    } else {
      localStorage.setItem(LS_KEY, JSON.stringify(next))
    }
  }

  const addFavorite = (toolId) => {
    if (!isPro) {
      alert('Saving favorites is a Pro feature (₹800/year).')
      return
    }
    if (!favorites.includes(toolId)) saveFavorites([...favorites, toolId])
  }

  const removeFavorite = (toolId) => {
    saveFavorites(favorites.filter((t) => t !== toolId))
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}
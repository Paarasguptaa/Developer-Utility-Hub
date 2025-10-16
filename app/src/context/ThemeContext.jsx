import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const { isPro } = useAuth()
  const [theme, setTheme] = useState('light')
  const [color, setColor] = useState('blue')

  useEffect(() => {
    const saved = localStorage.getItem('duh_theme')
    if (saved) setTheme(saved)
    const savedColor = localStorage.getItem('duh_color')
    if (savedColor) setColor(savedColor)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    document.documentElement.dataset.color = color
  }, [color])

  const toggleTheme = () => {
    if (!isPro && theme === 'light') {
      alert('Dark mode is a Pro feature (₹800/year).')
      return
    }
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    localStorage.setItem('duh_theme', next)
  }

  const setColorTheme = (next) => {
    setColor(next)
    localStorage.setItem('duh_color', next)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, color, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
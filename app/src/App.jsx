import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { AdBanner } from './components/AdBanner'
import { useAuth } from './context/AuthContext'
import './styles.css'

const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })))
const Pricing = lazy(() => import('./pages/Pricing').then(m => ({ default: m.Pricing })))
const StyleGuide = lazy(() => import('./pages/StyleGuide').then(m => ({ default: m.StyleGuide })))
const ToolDocs = lazy(() => import('./pages/ToolDocs').then(m => ({ default: m.ToolDocs })))
const JsonFormatter = lazy(() => import('./tools/JsonFormatter').then(m => ({ default: m.JsonFormatter })))
const JwtTool = lazy(() => import('./tools/JwtTool').then(m => ({ default: m.JwtTool })))
const Base64Tool = lazy(() => import('./tools/Base64Tool').then(m => ({ default: m.Base64Tool })))
const RegexTester = lazy(() => import('./tools/RegexTester').then(m => ({ default: m.RegexTester })))
const TimestampConverter = lazy(() => import('./tools/TimestampConverter').then(m => ({ default: m.TimestampConverter })))
const UrlEncoderDecoder = lazy(() => import('./tools/UrlEncoderDecoder').then(m => ({ default: m.UrlEncoderDecoder })))
const CodeFormatter = lazy(() => import('./tools/CodeFormatter').then(m => ({ default: m.CodeFormatter })))
const ColorConverter = lazy(() => import('./tools/ColorConverter').then(m => ({ default: m.ColorConverter })))
const TextDiffChecker = lazy(() => import('./tools/TextDiffChecker').then(m => ({ default: m.TextDiffChecker })))
const HashGenerator = lazy(() => import('./tools/HashGenerator').then(m => ({ default: m.HashGenerator })))

function App() {
  const { isPro } = useAuth()
  return (
    <BrowserRouter>
      <div className={isPro ? 'app pro' : 'app'}>
        <a href="#main" className="skip-link">Skip to content</a>
        <Navbar />
        <AdBanner />
        <main id="main" className="container">
          <Suspense fallback={<div className="spinner" aria-busy="true" aria-live="polite" />}> 
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/style-guide" element={<StyleGuide />} />
            <Route path="/docs/:toolId" element={<ToolDocs />} />
            <Route path="/tools/json-formatter" element={<JsonFormatter />} />
            <Route path="/tools/jwt" element={<JwtTool />} />
            <Route path="/tools/base64" element={<Base64Tool />} />
            <Route path="/tools/regex" element={<RegexTester />} />
            <Route path="/tools/timestamp" element={<TimestampConverter />} />
            <Route path="/tools/url" element={<UrlEncoderDecoder />} />
            <Route path="/tools/code-formatter" element={<CodeFormatter />} />
            <Route path="/tools/color" element={<ColorConverter />} />
            <Route path="/tools/diff" element={<TextDiffChecker />} />
            <Route path="/tools/hash" element={<HashGenerator />} />
            <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App

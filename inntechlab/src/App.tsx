import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Loader from './components/ui/Loader'
import Home from './pages/Home'
import Services from './pages/Services'
import Projects from './pages/Projects'
import About from './pages/About'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const fade = setTimeout(() => setFadeOut(true), 1800)
    const hide = setTimeout(() => setLoading(false), 2200)
    return () => { clearTimeout(fade); clearTimeout(hide) }
  }, [])

  if (loading) {
    return (
      <div
        className="transition-opacity duration-500"
        style={{ opacity: fadeOut ? 0 : 1 }}
      >
        <Loader />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white font-sans">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

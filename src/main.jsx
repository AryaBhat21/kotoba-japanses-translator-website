import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './index.css'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import TranslatorDashboard from './pages/TranslatorDashboard'
import Library from './pages/Library'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/translate" element={<TranslatorDashboard />} />
        <Route path="/library" element={<Library />} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

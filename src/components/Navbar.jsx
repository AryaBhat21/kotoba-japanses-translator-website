import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar({ variant = 'landing' }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  const landingLinks = [
    { to: '/translate', label: 'Translate' },
    { to: '/library', label: 'Library' },
    { to: '#scholar', label: 'Scholar' },
    { to: '#about', label: 'About' },
  ]

  const dashboardLinks = [
    { to: '/translate', label: 'Dashboard' },
    { to: '#manuscript', label: 'Manuscript' },
    { to: '#glossary', label: 'Glossary' },
    { to: '#settings', label: 'Settings' },
  ]

  const libraryLinks = [
    { to: '/', label: 'Home' },
    { to: '/library', label: 'Library' },
    { to: '/translate', label: 'Learn' },
  ]

  const links = variant === 'dashboard' ? dashboardLinks : variant === 'library' ? libraryLinks : landingLinks

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.logo}>
          <span className={styles.logoKana}>言葉</span>
          <span className={styles.logoText}>Kotoba</span>
        </NavLink>

        <div className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {links.map(link => (
            link.to.startsWith('#')
              ? <a key={link.label} href={link.to} className={styles.link}>{link.label}</a>
              : <NavLink
                  key={link.label}
                  to={link.to}
                  className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
                >
                  {link.label}
                </NavLink>
          ))}
        </div>

        <div className={styles.actions}>
          <NavLink to="/login" className={styles.loginBtn}>
            Sign In
          </NavLink>
          <button
            className={styles.menuToggle}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span className={`material-icons-round`}>{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

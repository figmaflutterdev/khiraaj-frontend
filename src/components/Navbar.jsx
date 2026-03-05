import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import SearchOverlay from './SearchOverlay'
import CartDrawer from './CartDrawer'
import './Navbar.css'

const navLinks = [
  { label: 'Home',        path: '/' },
  { label: 'Bags',        path: '/bags' },
  { label: 'New Arrival', path: '/new-arrival' },
  { label: 'Accessories', path: '/accessories' },
  { label: 'Contact Us',  path: '/contact' },
  { label: 'Reviews',     path: '/reviews' },
]

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
)

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)
  const [cartOpen,   setCartOpen]   = useState(false)
  const { cartCount } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    document.body.style.overflow = (menuOpen || cartOpen) ? 'hidden' : ''
  }, [menuOpen, cartOpen])

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>

        {/* LEFT: Cart (mobile only) */}
        <button onClick={() => setCartOpen(true)} className="cart-btn icon-btn mobile-cart" title="Cart">
          <CartIcon />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>

        {/* CENTER: Logo */}
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <div className="logo-text-wrap">
            <span className="logo-text">KHIRAAJ</span>
            <span className="logo-tagline">CARRY ELEGANCE EVERYDAY</span>
          </div>
        </Link>

        {/* RIGHT */}
        <div className="nav-right">
          <div className="nav-icons desktop-only">
            <button onClick={() => setSearchOpen(true)} title="Search" className="icon-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>
            <button onClick={() => setCartOpen(true)} className="cart-btn icon-btn" title="Cart">
              <CartIcon />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
          </div>

          {/* Hamburger */}
          <button className="hamburger mobile-only" onClick={() => setMenuOpen(!menuOpen)}>
            <span className={`bar ${menuOpen ? 'open' : ''}`} />
            <span className={`bar ${menuOpen ? 'open' : ''}`} />
            <span className={`bar ${menuOpen ? 'open' : ''}`} />
          </button>
        </div>

        {/* Desktop Nav Links */}
        <ul className="nav-links desktop-only">
          {navLinks.map(link => (
            <li key={link.path}><Link to={link.path}>{link.label}</Link></li>
          ))}
        </ul>

      </nav>

      {/* ── MOBILE MENU ── */}
      {/* Overlay */}
      <div className={`menu-overlay ${menuOpen ? 'open' : ''}`} onClick={closeMenu} />

      {/* Drawer */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>

        {/* 1. Brand name on top */}
        <div className="mm-brand">
          <span className="mm-logo">KHIRAAJ</span>
          <span className="mm-tagline">CARRY ELEGANCE EVERYDAY</span>
        </div>

        <div className="mm-divider" />

        {/* 2. Nav Links */}
        <ul className="mobile-nav-links">
          {navLinks.map((link, i) => (
            <li key={link.path} style={{ transitionDelay: menuOpen ? `${0.1 + i * 0.07}s` : '0s' }}
                className={menuOpen ? 'slide-in' : ''}>
              <Link to={link.path} onClick={closeMenu}>{link.label}</Link>
            </li>
          ))}
        </ul>

        <div className="mm-divider" />

        {/* 3. Search */}
        <button onClick={() => { setSearchOpen(true); closeMenu() }} className="mm-search-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          Search Store
        </button>

        {/* 4. Footer info */}
        <div className="mm-footer">
          <div className="mm-socials">
            <a href="https://www.instagram.com/khiraaj.pk" target="_blank" rel="noreferrer">Instagram</a>
            <span>·</span>
            <a href="https://www.tiktok.com/@khiraaj.pk" target="_blank" rel="noreferrer">TikTok</a>
            <span>·</span>
            <a href="https://wa.me/923001234567" target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </div>

      </div>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
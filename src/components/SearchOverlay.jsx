import { useEffect, useRef } from 'react'
import './SearchOverlay.css'

const suggestions = [
  'Women bags for College / University',
  'Best office work bags for men/women',
  'Best travel bags in Pakistan',
  'Affordable designer tote bags',
  'Crossbody bags for women',
  'Gym duffle bag for men/women',
  'Designer bags Pakistan',
]

export default function SearchOverlay({ isOpen, onClose }) {
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div className={`search-overlay ${isOpen ? 'active' : ''}`}>
      <div className="search-overlay-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input ref={inputRef} type="text" placeholder="Search our store..." />
        <button className="search-close" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div className="search-suggestions">
        {suggestions.map((s, i) => (
          <div key={i} className="search-suggestion-item">{s}</div>
        ))}
      </div>
    </div>
  )
}
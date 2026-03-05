import { Link } from 'react-router-dom'
import './Footer.css'

const socials = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/YOUR_USERNAME',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@YOUR_USERNAME',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.84 1.56V6.81a4.85 4.85 0 01-1.07-.12z"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/YOUR_PAGE',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/92XXXXXXXXXX',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.824L.057 23.5l5.833-1.53A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.372l-.36-.214-3.713.974.99-3.62-.234-.372A9.818 9.818 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/>
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">

        {/* Brand */}
        <div className="footer-brand">
          <span className="footer-logo">KHIRAAJ</span>
          <span className="footer-tagline">CARRY ELEGANCE EVERYDAY</span>
          <p className="footer-desc">Pakistan's finest bag store with premium quality collections crafted for the modern woman.</p>
          <div className="footer-socials">
            {socials.map(s => (
              <a key={s.name} href={s.href} title={s.name} className="social-icon" target="_blank" rel="noreferrer">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div className="footer-col">
          <h4>Shop</h4>
          <ul>
            <li><Link to="/bags">All Bags</Link></li>
            <li><Link to="/new-arrival">New Arrivals</Link></li>
            <li><Link to="/accessories">Accessories</Link></li>
            <li><Link to="/bags">Sale</Link></li>
          </ul>
        </div>

        {/* Help */}
        <div className="footer-col">
          <h4>Help</h4>
          <ul>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="#">Order Tracking</Link></li>
            <li><Link to="#">Returns Policy</Link></li>
            <li><Link to="#">FAQ</Link></li>
          </ul>
        </div>

        {/* Info */}
        <div className="footer-col">
          <h4>Info</h4>
          <ul>
            <li><Link to="#">About Us</Link></li>
            <li><Link to="#">Privacy Policy</Link></li>
            <li><Link to="#">Terms & Conditions</Link></li>
            <li><Link to="#">Delivery Info</Link></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Khiraaj.pk. All rights reserved.</p>
        <p>Cash on Delivery · Free Delivery Above Rs 4,000</p>
      </div>
    </footer>
  )
}
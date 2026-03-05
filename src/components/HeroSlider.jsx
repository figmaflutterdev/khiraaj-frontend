import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import img1 from '../assets/img1.png'
import img2 from '../assets/img2.png'
import './HeroSlider.css'

const slides = [
  {
    tag: 'New Collection 2025',
    title: 'Carry Your',
    titleItalic: 'Story',
    desc: 'Handcrafted bags that blend timeless elegance with modern utility. Each piece tells a story worth carrying.',
    btnText: 'Shop Collection',
    btnLink: '/bags',
    img: img1,
  },
  {
    tag: 'Accessories',
    title: 'Elevate Your',
    titleItalic: 'Style',
    desc: 'Discover our exclusive accessories collection. Premium quality pieces crafted for the modern woman.',
    btnText: 'Shop Accessories',
    btnLink: '/accessories',
    img: img2,
  },
  {
    tag: 'Office Essentials',
    title: 'Work in',
    titleItalic: 'Elegance',
    desc: 'Professional bags designed for the modern workspace. Organized, sleek, and built to last.',
    btnText: 'Explore Now',
    btnLink: '/bags',
    img: img1,
  },
  {
    tag: 'Limited Edition',
    title: 'Luxury',
    titleItalic: 'Redefined',
    desc: 'Exclusive pieces with premium materials. Limited availability',
    btnText: 'View New Arrivals',
    btnLink: '/new-arrival',
    img: img2,
  },
  {
    tag: 'Free Delivery',
    title: 'Shop',
    titleItalic: 'Smart',
    desc: 'Free delivery on orders available across Pakistan.',
    btnText: 'Shop Now',
    btnLink: '/bags',
    img: img1,
  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)

  const goTo = (n) => setCurrent((n + slides.length) % slides.length)

  useEffect(() => {
    const timer = setInterval(() => goTo(current + 1), 5000)
    return () => clearInterval(timer)
  }, [current])

  return (
    <section className="hero-slider">
      {slides.map((slide, i) => (
        <div key={i} className={`slide ${i === current ? 'active' : ''}`}>

          {/* Background Image */}
          <div
            className="slide-bg"
            style={{ backgroundImage: `url(${slide.img})` }}
          />
          <div className="slide-overlay" />

          {/* Content */}
          <div className="slide-content">
            <span className="slide-tag">{slide.tag}</span>
            <h1 className="slide-title">
              {slide.title} <em>{slide.titleItalic}</em>
            </h1>
            <p className="slide-desc">{slide.desc}</p>
            <Link to={slide.btnLink} className="slide-btn">{slide.btnText}</Link>
          </div>

        </div>
      ))}

      {/* Dots */}
      <div className="slider-dots">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`slider-dot ${i === current ? 'active' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      {/* Arrows */}
      <div className="slider-arrows">
        <button onClick={() => goTo(current - 1)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
        </button>
        <button onClick={() => goTo(current + 1)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>
    </section>
  )
}
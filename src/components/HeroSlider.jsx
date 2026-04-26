import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import he from '../assets/he.jpeg'
import hei from '../assets/hei.jpeg'
import './HeroSlider.css'

const slides = [
  {
    tag: 'New Collection 2026',
    title: 'Carry Your',
    titleItalic: 'Story',
    desc: 'Handcrafted bags that blend timeless elegance with modern utility.',
    btnText: 'Shop Collection',
    btnLink: '/bags',
    video: '/videos/video1.mp4',
  },
  {
    tag: 'Accessories',
    title: 'Elevate Your',
    titleItalic: 'Style',
    desc: 'Discover our exclusive accessories collection.',
    btnText: 'Shop Accessories',
    btnLink: '/accessories',
    video: '/videos/video2.mp4',

  },
  {
    tag: 'Office Essentials',
    title: 'Work in',
    titleItalic: 'Elegance',
    desc: 'Professional bags designed for the modern workspace.',
    btnText: 'Explore Now',
    btnLink: '/bags',
    video: '/videos/video3.mp4',

  },
  {
    tag: 'Limited Edition',
    title: 'Luxury',
    titleItalic: 'Redefined',
    desc: 'Exclusive pieces with premium materials. Limited availability.',
    btnText: 'View New Arrivals',
    btnLink: '/new-arrival',
    video: '/videos/video4.mp4',
  
  },
  {
    tag: 'Free Delivery',
    title: 'Shop',
    titleItalic: 'Smart',
    desc: 'Free delivery on orders available across Pakistan.',
    btnText: 'Shop Now',
    btnLink: '/bags',
    video: '/videos/video5.mp4',

  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const videoRefs = useRef([])

  const goTo = (n) => {
    const next = (n + slides.length) % slides.length
    setCurrent(next)
  }

  // Jab slide change ho — active video play karo, baaki pause karo
  useEffect(() => {
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return
      if (i === current) {
        vid.currentTime = 0
        vid.play().catch(() => {})
      } else {
        vid.pause()
        vid.currentTime = 0
      }
    })
  }, [current])

  return (
    <section className="hero-slider">
      {slides.map((slide, i) => (
        <div key={i} className={`slide ${i === current ? 'active' : ''}`}>

          {/* Video background */}
          <video
            ref={el => videoRefs.current[i] = el}
            className="slide-video"
            muted
            playsInline
            preload="auto"
            onEnded={() => goTo(current + 1)}
          >
            <source src={slide.video} type="video/mp4" />
          </video>

          {/* Fallback image agar video load na ho */}
          <div
            className="slide-bg"
            style={{ backgroundImage: `url(${slide.img})` }}
          />

          <div className="slide-overlay" />

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
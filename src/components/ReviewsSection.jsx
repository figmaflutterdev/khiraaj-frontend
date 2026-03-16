import { useState, useEffect, useRef } from 'react'
import { getReviews } from '../api'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './ReviewsSection.css'

const fakeReviews = [
  { id: 1, name: 'Ayesha K.',  product: 'Olive Bow Elegance Handbag',  rating: 5, review: 'Absolutely love this bag! The quality is amazing and the price is unbeatable. Got so many compliments!', product_image: '/ist.jpeg' },
  { id: 2, name: 'Fatima R.',  product: 'Mint & Mocha Bow Tote',      rating: 5, review: 'Perfect size, great quality leather. Exactly what I was looking for. Will definitely buy again!', product_image: '/2nd.jpeg' },
  { id: 3, name: 'Sara M.',    product: 'Tan Quilted Cat-Clasp', rating: 4, review: 'Very elegant and stylish. The stitching is neat and the bag holds its shape well. Highly recommend!', product_image: '/3rd.jpeg' },
  { id: 4, name: 'Zara T.',    product: 'Golden Sand Marble Tote',   rating: 5, review: 'This tote bag is everything! Spacious, sturdy, and so chic. Delivery was fast too!', product_image: '/4th.jpeg' },
  { id: 5, name: 'Maryam A.', product: 'Monochrome Chain-Accent Tote',       rating: 5, review: 'Gorgeous bag, exceeded my expectations. The color is exactly as shown. Love KHIRAAJ!', product_image: '/5th.jpeg' },
]

const Stars = ({ count }) => (
  <div className="rs-stars">
    {[1,2,3,4,5].map(s => (
      <span key={s} className={s <= count ? 'rs-star active' : 'rs-star'}>★</span>
    ))}
  </div>
)

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([])
  const [index, setIndex]     = useState(0)
  const [visible, setVisible] = useState(3)
  const trackRef = useRef(null)

  useEffect(() => {
    getReviews()
      .then(data => setReviews([...data, ...fakeReviews]))
      .catch(() => setReviews(fakeReviews))
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setVisible(window.innerWidth < 1100 ? 1 : 3)
      setIndex(0)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Scroll track to correct position using scrollLeft
  useEffect(() => {
    if (!trackRef.current) return
    const card = trackRef.current.querySelector('.rs-card')
    if (!card) return
    const cardWidth = card.offsetWidth
    const gap = 24
    trackRef.current.scrollLeft = index * (cardWidth + gap)
  }, [index, visible, reviews])

  const prev = () => setIndex(i => Math.max(0, i - 1))
  const next = () => setIndex(i => Math.min(reviews.length - visible, i + 1))

  if (reviews.length === 0) return null

  return (
    <section className="rs-section">
      <div className="rs-header">
        <span className="rs-line" />
        <h2 className="rs-title">WHAT OUR CUSTOMERS SAY</h2>
        <span className="rs-line" />
      </div>

      <div className="rs-slider">
        <button className="rs-arrow" onClick={prev} disabled={index === 0}>
          <ChevronLeft size={20} />
        </button>

        <div className="rs-viewport" ref={trackRef}>
          {reviews.map(r => (
            <div key={r.id} className="rs-card" style={{ flex: `0 0 calc(${100 / visible}% - ${24 * (visible - 1) / visible}px)` }}>
              {r.product_image && (
                <div className="rs-img-wrap">
                  <img src={r.product_image} alt={r.product} className="rs-img" />
                </div>
              )}
              <div className="rs-card-body">
                <Stars count={r.rating} />
                <p className="rs-text">"{r.review}"</p>
                <div className="rs-footer">
                  <span className="rs-name">{r.name}</span>
                  <span className="rs-product">{r.product}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="rs-arrow" onClick={next} disabled={index >= reviews.length - visible}>
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="rs-dots">
        {reviews.map((_, i) => (
          <button key={i} className={`rs-dot ${i === index ? 'active' : ''}`} onClick={() => setIndex(i)} />
        ))}
      </div>

      <div className="rs-cta">
        <a href="/reviews" className="rs-cta-btn">Write a Review</a>
      </div>
    </section>
  )
}
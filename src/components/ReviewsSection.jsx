import { useState, useEffect } from 'react'
import { getReviews } from '../api'
import './ReviewsSection.css'

const fakeReviews = [
  { id: 1, name: 'Ayesha K.',  product: 'Haul Bag Brown Set Of 3',  rating: 5, review: 'Absolutely love this bag! The quality is amazing and the price is unbeatable. Got so many compliments!', product_image: '/img3.jpg' },
  { id: 2, name: 'Fatima R.',  product: 'Crossbody Bag Beige',      rating: 5, review: 'Perfect size, great quality leather. Exactly what I was looking for. Will definitely buy again!', product_image: '/img4.jpg' },
  { id: 3, name: 'Sara M.',    product: 'Blunt Set Of 2 Bag Black', rating: 4, review: 'Very elegant and stylish. The stitching is neat and the bag holds its shape well. Highly recommend!', product_image: '/img5.jpg' },
  { id: 4, name: 'Zara T.',    product: 'Tote Bag Premium Brown',   rating: 5, review: 'This tote bag is everything! Spacious, sturdy, and so chic. Delivery was fast too!', product_image: '/img6.jpg' },
  { id: 5, name: 'Maryam A.', product: 'Shoulder Bag Cream',       rating: 5, review: 'Gorgeous bag, exceeded my expectations. The color is exactly as shown. Love KHIRAAJ!', product_image: '/img7.jpg' },
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

  useEffect(() => {
    getReviews()
      .then(data => setReviews([...data, ...fakeReviews]))
      .catch(() => setReviews(fakeReviews))
  }, [])

  const visible = window.innerWidth < 1100 ? 1 : 3
  const prev = () => setIndex(i => Math.max(0, i - 1))
  const next = () => setIndex(i => Math.min(reviews.length - visible, i + 1))
  const shown = reviews.slice(index, index + visible)

  if (reviews.length === 0) return null

  return (
    <section className="rs-section">
      <div className="rs-header">
        <span className="rs-line" />
        <h2 className="rs-title">WHAT OUR CUSTOMERS SAY</h2>
        <span className="rs-line" />
      </div>

      <div className="rs-slider">
        <button className="rs-arrow" onClick={prev} disabled={index === 0}>‹</button>

        <div className="rs-cards">
          {shown.map(r => (
            <div key={r.id} className="rs-card">
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

        <button className="rs-arrow" onClick={next} disabled={index >= reviews.length - visible}>›</button>
      </div>

      {/* Mobile dots */}
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

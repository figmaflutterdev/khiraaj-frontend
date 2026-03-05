import { useState } from 'react'
import { submitReview } from '../api'
import './Reviews.css'
import ReviewsSection from '../components/ReviewsSection'


const stars = [1, 2, 3, 4, 5]

export default function Reviews() {
  const [form, setForm] = useState({ name: '', product: '', rating: 0, review: '' })
  const [hover, setHover]       = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [errors, setErrors]     = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!form.product.trim()) e.product = 'Product name is required'
    if (!form.rating)         e.rating  = 'Please select a rating'
    if (!form.review.trim())  e.review  = 'Review is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setLoading(true)
    try {
      await submitReview(form)
      setSubmitted(true)
    } catch {
      setErrors({ submit: 'Something went wrong. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  if (submitted) return (
    <div className="reviews-page">
      <div className="review-success">
        <div className="review-success-icon">✓</div>
        <h2>Thank You!</h2>
        <p>Your review has been submitted and is pending approval.</p>
        <a href="/" className="review-back-btn">Back to Home</a>
      </div>
    </div>
  )

  return (
    <div className="reviews-page">
      <div className="reviews-hero">
        <h1 className="reviews-title">SHARE YOUR EXPERIENCE</h1>
        <p className="reviews-subtitle">We'd love to hear what you think</p>
      </div>

      <div className="review-form-wrap">
        <div className="review-form">

          {/* Name */}
          <div className="rf-field">
            <label className="rf-label">Your Name</label>
            <input
              className={`rf-input ${errors.name ? 'rf-error' : ''}`}
              type="text"
              placeholder="e.g. Laraib"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            />
            {errors.name && <p className="rf-error-msg">{errors.name}</p>}
          </div>

          {/* Product */}
          <div className="rf-field">
            <label className="rf-label">Product Name</label>
            <input
              className={`rf-input ${errors.product ? 'rf-error' : ''}`}
              type="text"
              placeholder="e.g. Haul Bag Brown Set Of 3"
              value={form.product}
              onChange={e => setForm(f => ({ ...f, product: e.target.value }))}
            />
            {errors.product && <p className="rf-error-msg">{errors.product}</p>}
          </div>

          {/* Rating */}
          <div className="rf-field">
            <label className="rf-label">Rating</label>
            <div className="rf-stars">
              {stars.map(s => (
                <button
                  key={s}
                  className={`rf-star ${s <= (hover || form.rating) ? 'active' : ''}`}
                  onClick={() => setForm(f => ({ ...f, rating: s }))}
                  onMouseEnter={() => setHover(s)}
                  onMouseLeave={() => setHover(0)}
                >★</button>
              ))}
              {form.rating > 0 && (
                <span className="rf-rating-label">
                  {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][form.rating]}
                </span>
              )}
            </div>
            {errors.rating && <p className="rf-error-msg">{errors.rating}</p>}
          </div>

          {/* Review */}
          <div className="rf-field">
            <label className="rf-label">Your Review</label>
            <textarea
              className={`rf-textarea ${errors.review ? 'rf-error' : ''}`}
              placeholder="Tell us about your experience with the product..."
              rows={5}
              value={form.review}
              onChange={e => setForm(f => ({ ...f, review: e.target.value }))}
            />
            {errors.review && <p className="rf-error-msg">{errors.review}</p>}
          </div>

          {errors.submit && <p className="rf-error-msg">{errors.submit}</p>}

          <button className="rf-submit" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Submitting...' : 'SUBMIT REVIEW'}
          </button>
</div>
      </div>
      <ReviewsSection />
    </div>
  )
}

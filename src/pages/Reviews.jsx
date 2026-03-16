import { useState, useRef } from 'react'
import { submitReview } from '../api'
import './Reviews.css'
import ReviewsSection from '../components/ReviewsSection'

const stars = [1, 2, 3, 4, 5]

export default function Reviews() {
  const [form, setForm]         = useState({ name: '', product: '', rating: 0, review: '' })
  const [image, setImage]       = useState(null)
  const [preview, setPreview]   = useState(null)
  const [hover, setHover]       = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [errors, setErrors]     = useState({})
  const fileRef = useRef()

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!form.product.trim()) e.product = 'Product name is required'
    if (!form.rating)         e.rating  = 'Please select a rating'
    if (!form.review.trim())  e.review  = 'Review is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('product', form.product)
      formData.append('rating', form.rating)
      formData.append('review', form.review)
      if (image) formData.append('product_image', image)
      await submitReview(formData)
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

          {/* Image Upload */}
          <div className="rf-field">
            <label className="rf-label">Product Photo <span style={{color:'var(--gray)', fontWeight:400}}>(Optional)</span></label>
            <div className="rf-upload-wrap" onClick={() => fileRef.current.click()}>
              {preview ? (
                <div className="rf-preview-wrap">
                  <img src={preview} alt="preview" className="rf-preview-img" />
                  <button className="rf-remove-img" onClick={e => { e.stopPropagation(); setImage(null); setPreview(null) }}>✕</button>
                </div>
              ) : (
                <div className="rf-upload-placeholder">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  <p>Click to upload photo</p>
                  <span>JPG, PNG up to 5MB</span>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImage} />
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
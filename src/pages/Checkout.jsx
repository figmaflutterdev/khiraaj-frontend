import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { submitOrder, getSettings, validateCoupon } from '../api'
import './Checkout.css'

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart()

  const [settings, setSettings] = useState({
    free_delivery_threshold: 4000,
    delivery_charge: 199
  })

  useEffect(() => {
    getSettings().then(data => setSettings(data)).catch(() => {})
  }, [])

  const shipping = cartTotal >= settings.free_delivery_threshold ? 0 : settings.delivery_charge

  // Coupon state
  const [couponCode, setCouponCode]     = useState('')
  const [couponApplied, setCouponApplied] = useState(null)
  const [couponError, setCouponError]   = useState('')
  const [couponLoading, setCouponLoading] = useState(false)

  const discount = couponApplied ? couponApplied.discount : 0
  const total    = cartTotal + shipping - discount

  const handleCoupon = async () => {
    if (!couponCode.trim()) return
    setCouponLoading(true)
    setCouponError('')
    setCouponApplied(null)
    try {
      const res = await validateCoupon(couponCode, cartTotal)
      if (res.error) {
        setCouponError(res.error)
      } else {
        setCouponApplied(res)
      }
    } catch {
      setCouponError('Something went wrong. Try again.')
    } finally {
      setCouponLoading(false)
    }
  }

  const removeCoupon = () => {
    setCouponApplied(null)
    setCouponCode('')
    setCouponError('')
  }

  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '',
    address: '', city: '', phone: '',
    newsletter: false,
  })
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState('')
  const [errors, setErrors]           = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.lastName.trim())  newErrors.lastName = 'Last name is required'
    if (!form.address.trim())   newErrors.address  = 'Address is required'
    if (!form.city.trim())      newErrors.city     = 'City is required'
    const phone = form.phone.trim()
    if (!phone) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^(03\d{9}|3\d{9}|\+923\d{9})$/.test(phone.replace(/[-\s]/g, ''))) {
      newErrors.phone = 'Valid format: 03001234567'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setError('')
    const orderData = {
      first_name:    form.firstName,
      last_name:     form.lastName,
      email:         form.email,
      phone:         form.phone,
      address:       form.address,
      city:          form.city,
      total:         total,
      discount_code: couponApplied ? couponApplied.code : '',
      discount:      discount,
      items: cartItems.map(item => ({
        product_name: item.name,
        price:        item.price,
        quantity:     item.quantity,
      }))
    }
    try {
      const res = await submitOrder(orderData)
      if (res.order_id) {
        setOrderPlaced(true)
        clearCart()
      }
    } catch {
      setError('Order failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (orderPlaced) return (
    <div className="order-success">
      <div className="success-icon">✓</div>
      <h2>Order Placed!</h2>
      <p>Thank you <strong>{form.firstName || 'Customer'}</strong>! Your order has been received.</p>
      <p className="success-sub">We will contact you shortly. Cash on Delivery available.</p>
      <Link to="/" className="back-home-btn">Continue Shopping</Link>
    </div>
  )

  return (
    <div className="checkout-page">
      <div className="checkout-left">
        <Link to="/" className="checkout-logo">
          <span className="co-logo-text">KHIRAAJ</span>
          <span className="co-logo-tag">CARRY ELEGANCE EVERYDAY</span>
        </Link>

        {/* Contact */}
        <div className="co-section">
          <h2 className="co-heading">Contact</h2>
          <input className="co-input" type="text" name="email" placeholder="Phone number or email" value={form.email} onChange={handleChange} />
          <label className="co-checkbox">
            <input type="checkbox" name="newsletter" checked={form.newsletter} onChange={handleChange} />
            <span>Email me with news and offers</span>
          </label>
        </div>

        {/* Delivery */}
        <div className="co-section">
          <h2 className="co-heading">Delivery</h2>
          <div className="co-country">
            <span>Country / Region</span>
            <span>Pakistan 🇵🇰</span>
          </div>
          <div className="co-row">
            <input className="co-input" type="text" name="firstName" placeholder="First name (optional)" value={form.firstName} onChange={handleChange} />
            <div>
              <input className={`co-input ${errors.lastName ? 'input-error' : ''}`} type="text" name="lastName" placeholder="Last name" value={form.lastName} onChange={handleChange} />
              {errors.lastName && <p className="field-error">{errors.lastName}</p>}
            </div>
          </div>
          <div>
            <input className={`co-input ${errors.address ? 'input-error' : ''}`} type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} />
            {errors.address && <p className="field-error">{errors.address}</p>}
          </div>
          <div className="co-row">
            <div>
              <input className={`co-input ${errors.city ? 'input-error' : ''}`} type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} />
              {errors.city && <p className="field-error">{errors.city}</p>}
            </div>
            <input className="co-input" type="text" placeholder="Postal code (optional)" />
          </div>
          <div>
            <input className={`co-input ${errors.phone ? 'input-error' : ''}`} type="tel" name="phone" placeholder="03001234567" value={form.phone} onChange={handleChange} />
            {errors.phone && <p className="field-error">{errors.phone}</p>}
          </div>
        </div>

        {/* Shipping */}
        <div className="co-section">
          <h2 className="co-heading">Shipping Method</h2>
          <div className="co-shipping-box">
            <div className="co-radio-row selected">
              <span className="co-radio-dot" />
              <span>Standard Delivery</span>
              <span className="co-shipping-price">
                {shipping === 0 ? <span className="free-tag">FREE</span> : `Rs ${shipping}`}
              </span>
            </div>
          </div>
          {shipping > 0 && (
            <p className="co-cod-note">
              Add Rs {(settings.free_delivery_threshold - cartTotal).toLocaleString()} more for FREE delivery!
            </p>
          )}
        </div>

        {/* Payment */}
        <div className="co-section">
          <h2 className="co-heading">Payment</h2>
          <div className="co-shipping-box">
            <div className="co-radio-row selected">
              <span className="co-radio-dot" />
              <span>Cash on Delivery (COD)</span>
              <span className="cod-badge">COD</span>
            </div>
          </div>
          <p className="co-cod-note">Pay when your order arrives at your doorstep.</p>
        </div>

        {error && <p className="co-error">{error}</p>}

        <button className="co-submit-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Placing Order...' : 'Complete Order'}
        </button>

        <div className="co-footer-links">
          <Link to="#">Refund Policy</Link>
          <Link to="#">Shipping</Link>
          <Link to="#">Privacy Policy</Link>
          <Link to="#">Terms of Service</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>

      {/* Right — Summary */}
      <div className="checkout-right">
        <div className="co-summary">
          <div className="co-items">
            {cartItems.length === 0 ? (
              <p className="co-empty">No items in cart</p>
            ) : cartItems.map(item => (
              <div key={item.id} className="co-item">
                <div className="co-item-img-wrap">
                  <img src={item.img} alt={item.name} />
                  <span className="co-item-qty">{item.quantity}</span>
                </div>
                <span className="co-item-name">{item.name}</span>
                <span className="co-item-price">Rs {(item.price * item.quantity).toLocaleString()}.00</span>
              </div>
            ))}
          </div>

          {/* Coupon Box */}
          <div className="co-coupon">
            {couponApplied ? (
              <div className="co-coupon-applied">
                <span>🎉 <strong>{couponApplied.code}</strong> applied!</span>
                <button onClick={removeCoupon} className="co-coupon-remove">Remove</button>
              </div>
            ) : (
              <div className="co-coupon-row">
                <input
                  className="co-coupon-input"
                  type="text"
                  placeholder="Discount / Voucher code"
                  value={couponCode}
                  onChange={e => { setCouponCode(e.target.value); setCouponError('') }}
                  onKeyDown={e => e.key === 'Enter' && handleCoupon()}
                />
                <button className="co-coupon-btn" onClick={handleCoupon} disabled={couponLoading}>
                  {couponLoading ? '...' : 'Apply'}
                </button>
              </div>
            )}
            {couponError && <p className="co-coupon-error">{couponError}</p>}
          </div>

          <div className="co-totals">
            <div className="co-total-row">
              <span>Subtotal</span>
              <span>Rs {cartTotal.toLocaleString()}.00</span>
            </div>
            <div className="co-total-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? <span className="free-tag">Free</span> : `Rs ${shipping}.00`}</span>
            </div>
            {discount > 0 && (
              <div className="co-total-row co-discount-row">
                <span>Discount ({couponApplied.code})</span>
                <span className="co-discount-amount">− Rs {discount.toLocaleString()}.00</span>
              </div>
            )}
            <div className="co-total-row co-grand-total">
              <span>Total</span>
              <span><small>PKR</small> Rs {total.toLocaleString()}.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
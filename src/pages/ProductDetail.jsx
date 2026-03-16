import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { getProducts } from '../api'
import './ProductDetail.css'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const [product, setProduct]         = useState(null)
  const [allProducts, setAllProducts] = useState([])
  const [activeImg, setActiveImg]     = useState(0)
  const [added, setAdded]             = useState(false)
  const [quantity, setQuantity]       = useState(1)
  const [zoom, setZoom]               = useState(false)
  const [loading, setLoading]         = useState(true)

  useEffect(() => {
    setLoading(true)
    getProducts()
      .then(data => {
        const apiProducts = data.map(p => ({
          id: `api_${p.id}`,
          name: p.name,
          price: p.price,
          oldPrice: p.old_price,
          discount: p.discount,
          images: p.gallery && p.gallery.length > 0
            ? [p.image, ...p.gallery.map(g => g.image)]
            : [p.image],
          color: p.color || '',
          colorHex: p.color_hex || '#888',
          inStock: p.in_stock,
          description: p.description || '',
          variantGroup: p.variant_group || '',
          variants: (p.variants || []).map(v => ({
            id: `api_${v.id}`,
            color: v.color,
            colorHex: v.color_hex,
          })),
        }))

        setAllProducts(apiProducts)

        const found = apiProducts.find(p => String(p.id) === String(id))
        if (found) {
          setProduct(found)
          setActiveImg(0)
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  const variants = product?.variantGroup
    ? allProducts.filter(p => p.variantGroup === product.variantGroup)
    : (product?.variants?.length ? product.variants : [])

  const handleColorClick = (variantId) => {
    if (String(variantId) === String(id)) return
    navigate(`/product/${variantId}`)
  }

  const handleAddToCart = () => {
    if (!product?.inStock) return
    addToCart({ id: product.id, name: product.name, price: product.price, img: product.images[0], quantity })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) return (
    <div className="pd-loading"><div className="pd-spinner" /></div>
  )

  if (!product) return (
    <div className="pd-loading">
      <p style={{ fontSize: '14px', color: '#888' }}>Product not found.</p>
    </div>
  )

  const savings = (product.oldPrice || 0) - product.price

  return (
    <div className="pd-page">
      <div className="pd-container">

        {/* ── LEFT: Images ── */}
        <div className="pd-images">
          <div className="pd-thumbs">
            {product.images.map((img, i) => (
              <button
                key={i}
                className={`pd-thumb ${activeImg === i ? 'pd-thumb--active' : ''}`}
                onClick={() => setActiveImg(i)}
              >
                <img src={img} alt={`${product.name} ${i + 1}`} />
              </button>
            ))}
          </div>

          <div
            className={`pd-main-img ${zoom ? 'pd-main-img--zoom' : ''}`}
            onClick={() => setZoom(z => !z)}
          >
            <img src={product.images[activeImg]} alt={product.name} />
            {product.discount && <div className="pd-badge">-{product.discount}%</div>}
            {!product.inStock && <div className="pd-oos-overlay">OUT OF STOCK</div>}
            <span className="pd-zoom-hint">{zoom ? '−' : '+'}</span>
          </div>
        </div>

        {/* ── RIGHT: Info ── */}
        <div className="pd-info">

          <div className="pd-breadcrumb">
            <button onClick={() => navigate('/bags')}>All Bags</button>
            <span>/</span>
            <span>{product.name}</span>
          </div>

          <h1 className="pd-name">{product.name}</h1>

          <div className="pd-prices">
            <span className="pd-price">Rs.{product.price.toLocaleString()}.00</span>
            {product.oldPrice && <span className="pd-old">Rs.{product.oldPrice.toLocaleString()}.00</span>}
            {savings > 0 && <span className="pd-save">Save Rs.{savings.toLocaleString()}</span>}
          </div>

          {product.description && <p className="pd-desc">{product.description}</p>}

          <div className="pd-divider" />

          {/* ── COLOR VARIANTS ── */}
          {variants.length > 1 && (
            <div className="pd-variants">
              <span className="pd-variants-label">
                COLOR: <strong>{product.color}</strong>
              </span>
              <div className="pd-color-dots">
                {variants.map(v => (
                  <button
                    key={v.id}
                    className={`pd-color-btn ${String(v.id) === String(id) ? 'pd-color-btn--active' : ''}`}
                    onClick={() => handleColorClick(v.id)}
                    title={v.color}
                  >
                    <span className="pd-color-swatch" style={{ background: v.colorHex }} />
                    <span className="pd-color-name">{v.color}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {variants.length > 1 && <div className="pd-divider" />}

          {/* Quantity */}
          <div className="pd-qty-row">
            <span className="pd-qty-label">QUANTITY</span>
            <div className="pd-qty">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>&#8722;</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
          </div>

          {/* Buttons */}
          <div className="pd-btns">
            <button
              className={`pd-cart-btn ${added ? 'pd-cart-btn--added' : ''} ${!product.inStock ? 'pd-cart-btn--disabled' : ''}`}
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              {added ? '✓ ADDED TO CART' : !product.inStock ? 'OUT OF STOCK' : 'ADD TO CART'}
            </button>
            <button
              className="pd-buy-btn"
              onClick={() => { handleAddToCart(); navigate('/checkout') }}
              disabled={!product.inStock}
            >
              BUY IT NOW
            </button>
          </div>

          {/* Features */}
          <div className="pd-features">
            <div className="pd-feature">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12l5 5L20 7"/></svg>
              <span>Cash on Delivery Available</span>
            </div>
            <div className="pd-feature">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12l5 5L20 7"/></svg>
              <span>Free Delivery Above Rs.4,000</span>
            </div>
            <div className="pd-feature">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12l5 5L20 7"/></svg>
              <span>7 Day Exchange Policy</span>
            </div>
            <div className="pd-feature">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12l5 5L20 7"/></svg>
              <span>Premium Quality Guaranteed</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
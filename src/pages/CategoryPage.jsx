import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { getProducts } from '../api'
import AnnouncementBar from '../components/AnnouncementBar'
import './CategoryPage.css'

const CATEGORY_LABELS = {
  'tote-bags':      'Tote Bags',
  'top-handle':     'Hand Bags',
  'clutch-bags':    'Clutch Bags',
  '3-piece-bags':   '3 Piece Bags',
  'crossbody-bags': 'Crossbody Bags',
  'shoulder-bags':  'Shoulder Bags',
  'luxury-bags':    'Luxury Bags',
  'laptop-bags':    'Laptop Bags',
}

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
)

export default function CategoryPage() {
  const { category } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)
  const [added, setAdded]       = useState({})
  const [hovered, setHovered]   = useState({})

  const label = CATEGORY_LABELS[category] || category

  useEffect(() => {
    setLoading(true)
    setProducts([])
    getProducts(category)
      .then(data => {
        const formatted = data.map(p => ({
          id: `api_${p.id}`,
          name: p.name,
          price: p.price,
          oldPrice: p.old_price,
          discount: p.discount,
          img: p.image,
          color: p.color || '',
          colorHex: p.color_hex || '#888',
          inStock: p.in_stock,
        }))
        setProducts(formatted)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [category])

  const handleAddToCart = (e, product) => {
    e.stopPropagation()
    if (!product.inStock) return
    addToCart({ id: product.id, name: product.name, price: product.price, img: product.img })
    setAdded(p => ({ ...p, [product.id]: true }))
    setTimeout(() => setAdded(p => ({ ...p, [product.id]: false })), 1500)
  }

  return (
    <div className="cp-page">
      <AnnouncementBar />

      {/* Hero */}
      <div className="cp-hero">
        <p className="cp-tag">KHIRAAJ COLLECTION</p>
        <h1 className="cp-title">{label.toUpperCase()}</h1>
        <p className="cp-subtitle">Handpicked styles just for you</p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="cp-grid">
          {[1,2,3,4].map(i => <div key={i} className="cp-skeleton" />)}
        </div>
      )}

      {/* Empty */}
      {!loading && products.length === 0 && (
        <div className="cp-empty">
          <div className="cp-empty-icon">✦</div>
          <h2 className="cp-empty-title">Coming Soon</h2>
          <p className="cp-empty-text">No products in this category yet. Check back soon!</p>
          <button className="cp-empty-btn" onClick={() => navigate('/bags')}>
            SHOP ALL BAGS
          </button>
        </div>
      )}

      {/* Products */}
      {!loading && products.length > 0 && (
        <>
          <div className="cp-count">
            {products.length} {products.length === 1 ? 'product' : 'products'}
          </div>
          <div className="cp-grid">
            {products.map((product, i) => (
              <div
                key={product.id}
                className={`cp-card ${!product.inStock ? 'cp-card--oos' : ''}`}
                onClick={() => navigate(`/product/${product.id}`)}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {product.discount > 0 && (
                  <div className="cp-badge-discount">-{product.discount}%</div>
                )}
                {!product.inStock && <div className="cp-badge-oos">Out of Stock</div>}

                <div className="cp-img-wrap">
                  <img src={product.img} alt={product.name} className="cp-img" />
                </div>

                <div className="cp-info">
                  <p className="cp-name">{product.name}</p>
                  {product.color && (
                    <div className="cp-color-row">
                      <span className="cp-color-dot" style={{ background: product.colorHex }} />
                      <span className="cp-color-name">{product.color}</span>
                    </div>
                  )}
                  <div className="cp-prices">
                    {product.oldPrice && (
                      <span className="cp-old">Rs.{product.oldPrice.toLocaleString()}.00</span>
                    )}
                    <span className="cp-new">Rs.{product.price.toLocaleString()}.00</span>
                  </div>
                </div>

                <button
                  className={`cp-cart-btn ${added[product.id] ? 'added' : ''} ${!product.inStock ? 'disabled' : ''}`}
                  onClick={(e) => handleAddToCart(e, product)}
                  onMouseEnter={() => setHovered(p => ({ ...p, [product.id]: true }))}
                  onMouseLeave={() => setHovered(p => ({ ...p, [product.id]: false }))}
                  disabled={!product.inStock}
                >
                  <span className="cp-btn-content">
                    {!product.inStock
                      ? 'OUT OF STOCK'
                      : added[product.id]
                        ? 'ADDED'
                        : hovered[product.id]
                          ? <CartIcon />
                          : 'ADD TO CART'
                    }
                  </span>
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

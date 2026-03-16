import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { getProducts } from '../api'
import { useNavigate } from 'react-router-dom'
import AnnouncementBar from '../components/AnnouncementBar'
import './Accessories.css'

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
)

export default function Accessories() {
  const { addToCart } = useCart()
  const navigate = useNavigate()

  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)
  const [added, setAdded]       = useState({})
  const [hovered, setHovered]   = useState({})

  useEffect(() => {
    setLoading(true)
    getProducts('accessories')
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
  }, [])

  const handleAddToCart = (e, product) => {
    e.stopPropagation()
    if (!product.inStock) return
    addToCart({ id: product.id, name: product.name, price: product.price, img: product.img })
    setAdded(p => ({ ...p, [product.id]: true }))
    setTimeout(() => setAdded(p => ({ ...p, [product.id]: false })), 1500)
  }

  return (
    <div className="ac-page">
      <AnnouncementBar />

      {/* Hero */}
      <div className="ac-hero">
        <p className="ac-tag">COMPLETE YOUR LOOK</p>
        <h1 className="ac-title">ACCESSORIES</h1>
        <p className="ac-subtitle">The finishing touch to every outfit</p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="ac-grid">
          {[1,2,3,4].map(i => (
            <div key={i} className="ac-skeleton" />
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && products.length === 0 && (
        <div className="ac-empty">
          <div className="ac-empty-icon">✦</div>
          <h2 className="ac-empty-title">Coming Soon</h2>
          <p className="ac-empty-text">Our accessories collection is on its way. Check back soon!</p>
          <button className="ac-empty-btn" onClick={() => navigate('/bags')}>
            SHOP ALL BAGS
          </button>
        </div>
      )}

      {/* Products */}
      {!loading && products.length > 0 && (
        <>
          <div className="ac-count">
            {products.length} {products.length === 1 ? 'product' : 'products'}
          </div>
          <div className="ac-grid">
            {products.map((product, i) => (
              <div
                key={product.id}
                className={`ac-card ${!product.inStock ? 'ac-card--oos' : ''}`}
                onClick={() => navigate(`/product/${product.id}`)}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {product.discount > 0 && (
                  <div className="ac-badge-discount">-{product.discount}%</div>
                )}
                {!product.inStock && <div className="ac-badge-oos">Out of Stock</div>}

                <div className="ac-img-wrap">
                  <img src={product.img} alt={product.name} className="ac-img" />
                </div>

                <div className="ac-info">
                  <p className="ac-name">{product.name}</p>
                  {product.color && (
                    <div className="ac-color-row">
                      <span className="ac-color-dot" style={{ background: product.colorHex }} />
                      <span className="ac-color-name">{product.color}</span>
                    </div>
                  )}
                  <div className="ac-prices">
                    {product.oldPrice && (
                      <span className="ac-old">Rs.{product.oldPrice.toLocaleString()}.00</span>
                    )}
                    <span className="ac-new">Rs.{product.price.toLocaleString()}.00</span>
                  </div>
                </div>

                <button
                  className={`ac-cart-btn ${added[product.id] ? 'added' : ''} ${!product.inStock ? 'disabled' : ''}`}
                  onClick={(e) => handleAddToCart(e, product)}
                  onMouseEnter={() => setHovered(p => ({ ...p, [product.id]: true }))}
                  onMouseLeave={() => setHovered(p => ({ ...p, [product.id]: false }))}
                  disabled={!product.inStock}
                >
                  <span className="ac-btn-content">
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
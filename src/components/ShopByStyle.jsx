import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { getProducts } from '../api'
import { useNavigate } from 'react-router-dom'
import './ShopByStyle.css'

const categories = [
  { label: 'Tote Bags',  value: 'tote-bags'  },
  { label: 'Hand Bags',value: 'hand-bags'     },
  { label: '3 Piece Bags', value: '3-piece-bags' },
  { label: 'Crossbody Bags',      value: 'crossbody-bags'      },
  { label: 'Clutch Bags',    value: 'clutch-bags'    },
]

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
)

export default function ShopByStyle() {
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(categories[0].value)
  const [products, setProducts]   = useState([])
  const [loading, setLoading]     = useState(false)
  const [added, setAdded]         = useState({})
  const [hovered, setHovered]     = useState({})

  useEffect(() => {
    setLoading(true)
    setProducts([])
    getProducts(activeTab)
      .then(data => {
        const formatted = data.map(p => ({
          id: `api_${p.id}`, name: p.name, price: p.price,
          oldPrice: p.old_price, discount: p.discount, img: p.image,
        }))
        setProducts(formatted)
        setLoading(false)
      })
      .catch(() => { setProducts([]); setLoading(false) })
  }, [activeTab])

  const handleAddToCart = (e, product) => {
    e.stopPropagation()
    addToCart(product)
    setAdded(p => ({ ...p, [product.id]: true }))
    setTimeout(() => setAdded(p => ({ ...p, [product.id]: false })), 1500)
  }

  return (
    <section className="sbs-section">
      <div className="sbs-heading">
        <span className="sbs-line" />
        <h2 className="sbs-title">Shop By Style</h2>
        <span className="sbs-line" />
      </div>

      <div className="sbs-tabs">
        {categories.map(cat => (
          <button
            key={cat.value}
            className={`sbs-tab ${activeTab === cat.value ? 'active' : ''}`}
            onClick={() => setActiveTab(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Loading skeletons */}
      {loading && (
        <div className="sbs-grid">
          {[1,2,3,4].map(i => <div key={i} className="sbs-skeleton" />)}
        </div>
      )}

      {/* Empty state */}
      {!loading && products.length === 0 && (
        <div className="sbs-empty">
          <p>No products found in this category yet.</p>
        </div>
      )}

      {/* Products */}
      {!loading && products.length > 0 && (
        <div className="sbs-grid">
          {products.map(product => (
            <div key={product.id} className="sbs-card"
              onClick={() => navigate(`/product/${product.id}`)}
              style={{ cursor: 'pointer' }}>
              {product.discount > 0 && (
                <div className="sbs-discount">-{product.discount}%</div>
              )}
              <div className="sbs-img-wrap">
                <img src={product.img} alt={product.name} className="sbs-img" />
              </div>
              <div className="sbs-info">
                <p className="sbs-name">{product.name}</p>
                <div className="sbs-prices">
                  <span className="sbs-old">Rs.{product.oldPrice?.toLocaleString()}.00</span>
                  <span className="sbs-new">Rs.{product.price?.toLocaleString()}.00</span>
                </div>
              </div>
              <button
                className={`sbs-cart-btn ${added[product.id] ? 'added' : ''}`}
                onClick={(e) => handleAddToCart(e, product)}
                onMouseEnter={() => setHovered(p => ({ ...p, [product.id]: true }))}
                onMouseLeave={() => setHovered(p => ({ ...p, [product.id]: false }))}
              >
                <span className="sbs-btn-content">
                  {added[product.id] ? 'ADDED' : hovered[product.id] ? <CartIcon /> : 'ADD TO CART'}
                </span>
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
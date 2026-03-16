import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { getProducts } from '../api'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './BestSeller.css'

const hardcodedProducts = [
  { id: 101, name: 'Haul Bag Brown Set Of 3',  oldPrice: 7000, price: 1599, discount: 77, img: '/img3.jpg' },
  { id: 102, name: 'Haul Bag Black Set Of 3',  oldPrice: 7000, price: 1599, discount: 77, img: '/img4.jpg' },
  { id: 103, name: 'Blunt Set Of 2 Bag Brown', oldPrice: 5000, price: 1599, discount: 68, img: '/img5.jpg' },
  { id: 104, name: 'Blunt Set Of 2 Bag Black', oldPrice: 5000, price: 1599, discount: 68, img: '/img6.jpg' },
  { id: 105, name: 'Tote Bag Premium Brown',   oldPrice: 6000, price: 1899, discount: 68, img: '/img7.jpg' },
  { id: 106, name: 'Crossbody Bag Beige',      oldPrice: 4500, price: 1499, discount: 67, img: '/img3.jpg' },
]

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
)

export default function BestSeller() {
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const [apiProducts, setApiProducts] = useState([])
  const [added, setAdded]             = useState({})
  const [hovered, setHovered]         = useState({})
  const [startIndex, setStartIndex]   = useState(0)
  const [visibleCount, setVisibleCount] = useState(4)
  const [showAll, setShowAll]         = useState(false)

  useEffect(() => {
    getProducts(null, true)   // bestseller=true
      .then(data => {
        const formatted = data.map(p => ({
          id: `api_${p.id}`, name: p.name, price: p.price,
          oldPrice: p.old_price, discount: p.discount, img: p.image,
        }))
        setApiProducts(formatted)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 600) setVisibleCount(1)
      else if (window.innerWidth < 900) setVisibleCount(2)
      else if (window.innerWidth < 1200) setVisibleCount(3)
      else setVisibleCount(4)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const products = apiProducts.length > 0 ? apiProducts : hardcodedProducts
  const prev = () => setStartIndex(i => Math.max(0, i - 1))
  const next = () => setStartIndex(i => Math.min(products.length - visibleCount, i + 1))

  const handleAddToCart = (e, product) => {
    e.stopPropagation()
    addToCart(product)
    setAdded(prev => ({ ...prev, [product.id]: true }))
    setTimeout(() => setAdded(prev => ({ ...prev, [product.id]: false })), 1500)
  }

  const isMobile = visibleCount <= 2
  const displayedProducts = isMobile
    ? (showAll ? products : products.slice(0, 2))
    : products.slice(startIndex, startIndex + visibleCount)

  return (
    <section className="bestseller-section">
      <div className="bestseller-header">
        <div className="bestseller-title-wrap">
          <span className="bs-line" />
          <h2 className="bestseller-title">OUR BEST SELLER</h2>
          <span className="bs-line" />
        </div>
        <a href="/bags" className="bs-shop-now">Shop Now &rarr;</a>
      </div>

      <div className="bs-slider-wrap">
        {!isMobile && (
          <button className="bs-arrow" onClick={prev} disabled={startIndex === 0}>
            <ChevronLeft size={20} />
          </button>
        )}

        <div className="bs-products">
          {displayedProducts.map(product => (
            <div key={product.id} className="bs-card"
              onClick={() => navigate(`/product/${product.id}`)}
              style={{ cursor: 'pointer' }}>
              <div className="bs-discount">-{product.discount}%</div>
              <div className="bs-img-wrap">
                <img src={product.img} alt={product.name} className="bs-img" />
              </div>
              <div className="bs-info">
                <p className="bs-name">{product.name}</p>
                <div className="bs-prices">
                  <span className="bs-old">Rs.{product.oldPrice?.toLocaleString()}.00</span>
                  <span className="bs-new">Rs.{product.price?.toLocaleString()}.00</span>
                </div>
              </div>
              <button
                className={`bs-cart-btn ${added[product.id] ? 'added' : ''}`}
                onClick={(e) => handleAddToCart(e, product)}
                onMouseEnter={() => setHovered(p => ({ ...p, [product.id]: true }))}
                onMouseLeave={() => setHovered(p => ({ ...p, [product.id]: false }))}
              >
                {added[product.id] ? <span className="btn-content">ADDED</span>
                  : hovered[product.id] ? <span className="btn-content"><CartIcon /></span>
                  : <span className="btn-content">ADD TO CART</span>}
              </button>
            </div>
          ))}
        </div>

        {!isMobile && (
          <button className="bs-arrow" onClick={next} disabled={startIndex >= products.length - visibleCount}>
            <ChevronRight size={20} />
          </button>
        )}
      </div>

      {isMobile && products.length > 2 && (
        <div className="bs-show-more">
          <button onClick={() => setShowAll(s => !s)} className="bs-show-more-btn">
            {showAll ? 'Show Less' : `Show More (${products.length - 2} more)`}
          </button>
        </div>
      )}
    </section>
  )
}
import { useState, useEffect, useRef } from 'react'
import { useCart } from '../context/CartContext'
import { getProducts } from '../api'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './BestSeller.css'

const hardcodedProducts = [
  { id: 101, name: 'Haul Bag Brown Set Of 3',  oldPrice: 7000, price: 1599, discount: 77, img: '/img3.jpg', gallery: [] },
  { id: 102, name: 'Haul Bag Black Set Of 3',  oldPrice: 7000, price: 1599, discount: 77, img: '/img4.jpg', gallery: [] },
  { id: 103, name: 'Blunt Set Of 2 Bag Brown', oldPrice: 5000, price: 1599, discount: 68, img: '/img5.jpg', gallery: [] },
  { id: 104, name: 'Blunt Set Of 2 Bag Black', oldPrice: 5000, price: 1599, discount: 68, img: '/img6.jpg', gallery: [] },
  { id: 105, name: 'Tote Bag Premium Brown',   oldPrice: 6000, price: 1899, discount: 68, img: '/img7.jpg', gallery: [] },
  { id: 106, name: 'Crossbody Bag Beige',      oldPrice: 4500, price: 1499, discount: 67, img: '/img3.jpg', gallery: [] },
]

function BSCard({ product, onAddToCart, added }) {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)
  const intervalRef = useRef(null)

  const allImages = [
    product.img,
    ...((product.gallery || []).map(g => g.image || g))
  ].filter(Boolean)

  const startSlideshow = () => {
    setHovered(true)
    if (allImages.length <= 1) return
    intervalRef.current = setInterval(() => {
      setImgIndex(i => (i + 1) % allImages.length)
    }, 900)
  }

  const stopSlideshow = () => {
    setHovered(false)
    setImgIndex(0)
    clearInterval(intervalRef.current)
  }

  useEffect(() => () => clearInterval(intervalRef.current), [])

  return (
    <div
      className="bs-card"
      onClick={() => navigate(`/product/${product.id}`)}
      onMouseEnter={startSlideshow}
      onMouseLeave={stopSlideshow}
    >
      <div className="bs-discount">-{product.discount}%</div>

      <div className="bs-img-wrap">
        {allImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={product.name}
            className={`bs-img bs-img-slide ${i === imgIndex ? 'active' : ''}`}
          />
        ))}

      </div>

      <div className="bs-info">
        <p className="bs-name">{product.name}</p>
        <div className="bs-prices">
          <span className="bs-old">Rs.{product.oldPrice?.toLocaleString()}.00</span>
          <span className="bs-new">Rs.{product.price?.toLocaleString()}.00</span>
        </div>
      </div>

      <button
        className={`bs-cart-btn ${added ? 'added' : ''}`}
        onClick={(e) => { e.stopPropagation(); onAddToCart(e, product) }}
      >
        {added
          ? <span className="btn-content">ADDED ✓</span>
          : <span className="btn-content">ADD TO CART</span>}
      </button>
    </div>
  )
}

export default function BestSeller() {
  const { addToCart } = useCart()
  const [apiProducts, setApiProducts] = useState([])
  const [added, setAdded]             = useState({})
  const [startIndex, setStartIndex]   = useState(0)
  const [visibleCount, setVisibleCount] = useState(4)
  const [showAll, setShowAll]         = useState(false)

  useEffect(() => {
    getProducts(null, true)
      .then(data => {
        const formatted = data.map(p => ({
          id: `api_${p.id}`, name: p.name, price: p.price,
          oldPrice: p.old_price, discount: p.discount, img: p.image,
          gallery: p.gallery || [],
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
            <BSCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              added={!!added[product.id]}
            />
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
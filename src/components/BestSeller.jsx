import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { getProducts } from '../api'
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
  const [apiProducts, setApiProducts]   = useState([])
  const [added, setAdded]               = useState({})
  const [hovered, setHovered]           = useState({})
  const [startIndex, setStartIndex]     = useState(0)
  const visible = 4

  useEffect(() => {
    getProducts()
      .then(data => {
        const formatted = data.map(p => ({
          id:       `api_${p.id}`,
          name:     p.name,
          price:    p.price,
          oldPrice: p.old_price,
          discount: p.discount,
          img:      p.image,
        }))
        setApiProducts(formatted)
      })
      .catch(() => {})
  }, [])

  // Django products pehle + hardcoded baad mein
  const products = [...apiProducts, ...hardcodedProducts]

  const prev = () => setStartIndex(i => Math.max(0, i - 1))
  const next = () => setStartIndex(i => Math.min(products.length - visible, i + 1))

  const handleAddToCart = (product) => {
    addToCart(product)
    setAdded(prev => ({ ...prev, [product.id]: true }))
    setTimeout(() => setAdded(prev => ({ ...prev, [product.id]: false })), 1500)
  }

  const visibleProducts = products.slice(startIndex, startIndex + visible)

  return (
    <section className="bestseller-section">

      {/* Heading */}
      <div className="bestseller-header">
        <div className="bestseller-title-wrap">
          <span className="bs-line" />
          <h2 className="bestseller-title">OUR BEST SELLER</h2>
          <span className="bs-line" />
        </div>
        <a href="/bags" className="bs-shop-now">Shop Now →</a>
      </div>

      {/* Slider */}
      <div className="bs-slider-wrap">

        <button className="bs-arrow" onClick={prev} disabled={startIndex === 0}>‹</button>

        <div className="bs-products">
          {visibleProducts.map(product => (
            <div key={product.id} className="bs-card">

              {/* Discount Badge */}
              <div className="bs-discount">-{product.discount}%</div>

              {/* Image */}
              <div className="bs-img-wrap">
                <img src={product.img} alt={product.name} className="bs-img" />
              </div>

              {/* Info */}
              <div className="bs-info">
                <p className="bs-name">{product.name}</p>
                <div className="bs-prices">
                  <span className="bs-old">Rs.{product.oldPrice.toLocaleString()}.00</span>
                  <span className="bs-new">Rs.{product.price.toLocaleString()}.00</span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                className={`bs-cart-btn ${added[product.id] ? 'added' : ''} ${hovered[product.id] && !added[product.id] ? 'hovered' : ''}`}
                onClick={() => handleAddToCart(product)}
                onMouseEnter={() => setHovered(p => ({ ...p, [product.id]: true }))}
                onMouseLeave={() => setHovered(p => ({ ...p, [product.id]: false }))}
              >
                {added[product.id] ? (
                  <span className="btn-content">ADDED</span>
                ) : hovered[product.id] ? (
                  <span className="btn-content"><CartIcon /></span>
                ) : (
                  <span className="btn-content">ADD TO CART</span>
                )}
              </button>

            </div>
          ))}
        </div>

        <button className="bs-arrow" onClick={next} disabled={startIndex >= products.length - visible}>›</button>

      </div>
    </section>
  )
}
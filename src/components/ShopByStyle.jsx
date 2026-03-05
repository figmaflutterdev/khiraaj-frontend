import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { getProducts } from '../api'
import './ShopByStyle.css'

const categories = ['Shoulder Bags', 'Top Handle Bags', 'Crossbody Bags', 'Tote Bags', 'Luxury Bags']

// Category label → Django value map
const categoryMap = {
  'Shoulder Bags':   'shoulder-bags',
  'Top Handle Bags': 'top-handle',
  'Crossbody Bags':  'crossbody-bags',
  'Tote Bags':       'tote-bags',
  'Luxury Bags':     'luxury-bags',
}

const hardcodedProducts = {
  'Shoulder Bags': [
    { id: 201, name: 'Grace Set Of 3 Brown/Black', oldPrice: 5000, price: 1699, discount: 66, img: '/img3.jpg' },
    { id: 202, name: 'Capri 3 Pcs Black',          oldPrice: 5000, price: 1749, discount: 65, img: '/img4.jpg' },
    { id: 203, name: 'Capri 3 Pcs Brown',          oldPrice: 5000, price: 1749, discount: 65, img: '/img5.jpg' },
    { id: 204, name: 'Fusion Brown',               oldPrice: 5000, price: 1799, discount: 64, img: '/img6.jpg' },
  ],
  'Top Handle Bags': [
    { id: 205, name: 'Elite Top Handle Black',   oldPrice: 6000, price: 1999, discount: 67, img: '/img3.jpg' },
    { id: 206, name: 'Classic Top Handle Brown', oldPrice: 5500, price: 1699, discount: 69, img: '/img4.jpg' },
    { id: 207, name: 'Luxe Handle Beige',        oldPrice: 4800, price: 1599, discount: 67, img: '/img5.jpg' },
    { id: 208, name: 'Mini Top Handle Set',      oldPrice: 5200, price: 1849, discount: 64, img: '/img6.jpg' },
  ],
  'Crossbody Bags': [
    { id: 209, name: 'Slim Crossbody Black',  oldPrice: 4000, price: 1299, discount: 68, img: '/img3.jpg' },
    { id: 210, name: 'Chain Crossbody Brown', oldPrice: 4500, price: 1499, discount: 67, img: '/img4.jpg' },
    { id: 211, name: 'Mini Crossbody Beige',  oldPrice: 3800, price: 1199, discount: 68, img: '/img5.jpg' },
    { id: 212, name: 'Boho Crossbody Set',    oldPrice: 5000, price: 1699, discount: 66, img: '/img6.jpg' },
  ],
  'Tote Bags': [
    { id: 213, name: 'Canvas Tote Brown',  oldPrice: 5500, price: 1799, discount: 67, img: '/img3.jpg' },
    { id: 214, name: 'Leather Tote Black', oldPrice: 6000, price: 1999, discount: 67, img: '/img4.jpg' },
    { id: 215, name: 'Office Tote Beige',  oldPrice: 5000, price: 1599, discount: 68, img: '/img5.jpg' },
    { id: 216, name: 'Weekend Tote Set',   oldPrice: 7000, price: 2099, discount: 70, img: '/img6.jpg' },
  ],
  'Luxury Bags': [
    { id: 217, name: 'Luxe Chain Bag Cream',   oldPrice: 8000, price: 2499, discount: 69, img: '/img3.jpg' },
    { id: 218, name: 'Designer Clutch Gold',   oldPrice: 7500, price: 2299, discount: 69, img: '/img4.jpg' },
    { id: 219, name: 'Premium Envelope Black', oldPrice: 9000, price: 2799, discount: 69, img: '/img5.jpg' },
    { id: 220, name: 'Velvet Mini Bag Brown',  oldPrice: 6500, price: 1999, discount: 69, img: '/img6.jpg' },
  ],
}

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
)

export default function ShopByStyle() {
  const { addToCart } = useCart()
  const [activeTab, setActiveTab] = useState('Shoulder Bags')
  const [apiProducts, setApiProducts] = useState([])
  const [added, setAdded]             = useState({})
  const [hovered, setHovered]         = useState({})

  useEffect(() => {
    const djangoCategory = categoryMap[activeTab]
    getProducts(djangoCategory)
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
      .catch(() => setApiProducts([]))
  }, [activeTab])

  // Django products pehle + hardcoded baad mein
  const allProducts = [...apiProducts, ...hardcodedProducts[activeTab]]

  const handleAddToCart = (product) => {
    addToCart(product)
    setAdded(p => ({ ...p, [product.id]: true }))
    setTimeout(() => setAdded(p => ({ ...p, [product.id]: false })), 1500)
  }

  return (
    <section className="sbs-section">

      {/* Heading */}
      <div className="sbs-heading">
        <span className="sbs-line" />
        <h2 className="sbs-title">Shop By Style</h2>
        <span className="sbs-line" />
      </div>

      {/* Filter Tabs */}
      <div className="sbs-tabs">
        {categories.map(cat => (
          <button
            key={cat}
            className={`sbs-tab ${activeTab === cat ? 'active' : ''}`}
            onClick={() => setActiveTab(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="sbs-grid">
        {allProducts.map(product => (
          <div key={product.id} className="sbs-card">

            {/* Discount */}
            <div className="sbs-discount">-{product.discount}%</div>

            {/* Image */}
            <div className="sbs-img-wrap">
              <img src={product.img} alt={product.name} className="sbs-img" />
            </div>

            {/* Info */}
            <div className="sbs-info">
              <p className="sbs-name">{product.name}</p>
              <div className="sbs-prices">
                <span className="sbs-old">Rs.{product.oldPrice.toLocaleString()}.00</span>
                <span className="sbs-new">Rs.{product.price.toLocaleString()}.00</span>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              className={`sbs-cart-btn ${added[product.id] ? 'added' : ''}`}
              onClick={() => handleAddToCart(product)}
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

    </section>
  )
}
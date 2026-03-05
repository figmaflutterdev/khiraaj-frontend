import { Link } from 'react-router-dom'
import './Categories.css'

const categories = [
  { name: 'Tote Bags',      link: '/bags', img: '/img3.jpg', circle: true },
  { name: 'Top Handle Bag', link: '/bags', img: '/img4.jpg', circle: true },
  { name: 'Luxury Bags',    link: '/bags', img: '/img5.jpg', circle: true },
  { name: 'Laptop Bags',    link: '/bags', img: '/img6.jpg', circle: true },
  { name: 'Crossbody Bags', link: '/bags', img: '/img7.jpg', circle: true },
]

export default function Categories() {
  return (
    <section className="categories-section">

      {/* Heading with lines */}
      <div className="cat-heading">
        <span className="cat-line" />
        <h2 className="cat-title">SHOP BY CATEGORY</h2>
        <span className="cat-line" />
      </div>

      {/* 5 Category Items */}
      <div className="categories-row">
        {categories.map((cat, i) => (
          <Link to={cat.link} key={i} className="category-item">
            <div className={`cat-img-wrap ${cat.circle ? 'circle-bg' : ''}`}>
              <img src={cat.img} alt={cat.name} className="cat-image" />
            </div>
            <p className="cat-name">{cat.name.toUpperCase()}</p>
          </Link>
        ))}
      </div>

    </section>
  )
}
import { Link } from 'react-router-dom'
import './Categories.css'

const categories = [
  { name: 'Tote Bags',      link: '/category/tote-bags',      img: '/img3.jpg' },
  { name: 'Hand Bag',       link: '/category/hand-bags',     img: '/img4.jpg' },
  { name: 'Clutch Bags',    link: '/category/clutch-bags',    img: '/img5.jpg' },
  { name: '3 Piece Bags',   link: '/category/3-piece-bags',   img: '/img6.jpg' },
  { name: 'Crossbody Bags', link: '/category/crossbody-bags', img: '/img7.jpg' },
]

export default function Categories() {
  return (
    <section className="categories-section">
      <div className="cat-heading">
        <span className="cat-line" />
        <h2 className="cat-title">SHOP BY CATEGORY</h2>
        <span className="cat-line" />
      </div>

      <div className="categories-row">
        {categories.map((cat, i) => (
          <Link to={cat.link} key={i} className="category-item">
            <div className="cat-img-wrap circle-bg">
              <img src={cat.img} alt={cat.name} className="cat-image" />
            </div>
            <p className="cat-name">{cat.name.toUpperCase()}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
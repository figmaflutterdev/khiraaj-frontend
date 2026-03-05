import { Link } from 'react-router-dom'
import './BagsGrid.css'

const gridItems = [
  {
    label: 'ALL BAGS',
    labelType: 'all',
    img: '/bag.jpg',
    link: '/bags',
  },
  {
    label: 'GET ANY FOR JUST',
    price: 'RS.1499/–',
    labelType: 'price',
    img: '/img9.jpg',
    link: '/bags/1499',
  },
  {
    label: 'GET ANY FOR JUST',
    price: 'RS.1899/–',
    labelType: 'price',
    img: '/img9.jpg',
    link: '/bags/1899',
  },
  {
    label: 'GET ANY FOR JUST',
    price: 'RS.2099/–',
    labelType: 'price',
    img: '/bag.jpg',
    link: '/bags/2099',
  },
]

export default function BagsGrid() {
  return (
    <section className="bags-grid-section">
      <div className="bags-grid-wrap">
        {gridItems.map((item, i) => (
          <Link to={item.link} key={i} className="bags-grid-card">

            {/* Badge */}
            <div className="bags-badge">
              {item.labelType === 'all' ? (
                <span className="badge-all">{item.label}</span>
              ) : (
                <div className="badge-price-wrap">
                  <span className="badge-get">{item.label}</span>
                  <span className="badge-price">{item.price}</span>
                </div>
              )}
            </div>

            {/* Image */}
            <img src={item.img} alt={item.price || item.label} className="bags-grid-img" />

          </Link>
        ))}
      </div>
    </section>
  )
}
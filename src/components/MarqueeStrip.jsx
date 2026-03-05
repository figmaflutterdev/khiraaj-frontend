import './MarqueeStrip.css'

const items = [
  'Premium Quality', 'Free Delivery Above Rs 4,000',
  'Cash On Delivery', 'New Arrivals Weekly',
  'Handcrafted Bags', "Pakistan's Finest",
]

export default function MarqueeStrip() {
  const doubled = [...items, ...items]

  return (
    <div className="marquee-strip">
      <div className="marquee-inner">
        {doubled.map((item, i) => (
          <span key={i}>
            {item} <span className="marquee-dot">✦</span>{' '}
          </span>
        ))}
      </div>
    </div>
  )
}

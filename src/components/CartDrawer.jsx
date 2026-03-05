import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import './CartDrawer.css'

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart()


  return (
    <>
      {/* Overlay — always rendered, fades in/out */}
      <div
        className={`drawer-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>

        {/* Header */}
        <div className="drawer-header">
          <h2 className="drawer-title">Your Cart</h2>
          <button className="drawer-close" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>


        {/* Items */}
        <div className="drawer-items">
          {cartItems.length === 0 ? (
            <div className="drawer-empty">
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 100 100" fill="none">
                {/* Bag body */}
                <rect x="15" y="40" width="70" height="48" rx="8" fill="#f0ece8" stroke="#c8b89a" strokeWidth="2"/>
                {/* Bag handle */}
                <path d="M35 40 Q35 18 50 18 Q65 18 65 40" fill="none" stroke="#c8b89a" strokeWidth="3" strokeLinecap="round"/>
                {/* Clasp */}
                <rect x="42" y="36" width="16" height="10" rx="3" fill="#a0876a"/>
                <circle cx="50" cy="41" r="3" fill="#c8b89a"/>
                {/* Shine lines */}
                <line x1="28" y1="58" x2="28" y2="72" stroke="#ddd0c0" strokeWidth="2" strokeLinecap="round"/>
                <line x1="35" y1="55" x2="35" y2="75" stroke="#ddd0c0" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <p>Your cart is empty</p>
              <button className="continue-shopping" onClick={onClose}>Continue Shopping</button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="drawer-item">

                {/* Image */}
                <div className="item-img-wrap">
                  <img src={item.img} alt={item.name} className="item-img" />
                </div>

                {/* Info */}
                <div className="item-info">
                  <p className="item-name">{item.name}</p>
                  <p className="item-price">Rs.{item.price.toLocaleString()}</p>

                  {/* Quantity */}
                  <div className="item-qty">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>

                {/* Remove */}
                <button className="item-remove" onClick={() => removeFromCart(item.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>

              </div>
            ))
          )}
        </div>

        {/* Footer — subtotal + checkout */}
        {cartItems.length > 0 && (
          <div className="drawer-footer">
            <div className="drawer-subtotal">
              <span>Subtotal</span>
              <span>Rs.{cartTotal.toLocaleString()}.00</span>
            </div>
            <p className="drawer-note">Taxes and shipping calculated at checkout</p>
            <Link to="/checkout" className="drawer-checkout-btn" onClick={onClose}>
              Proceed to Checkout
            </Link>
            <button className="drawer-continue" onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        )}

      </div>
    </>
  )
}
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { CartProvider } from './context/CartContext'
import Navbar      from './components/Navbar'
import Footer      from './components/Footer'
import Home        from './pages/Home'
import Bags        from './pages/Bags'
import NewArrival  from './pages/NewArrival'
import Accessories from './pages/Accessories'
import Contact     from './pages/Contact'
import Cart        from './pages/Cart'
import Checkout    from './pages/Checkout'
import Reviews     from './pages/Reviews'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Layout() {
  const location = useLocation()

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/"            element={<Home />} />
        <Route path="/bags"        element={<Bags />} />
        <Route path="/new-arrival" element={<NewArrival />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/contact"     element={<Contact />} />
        <Route path="/reviews"     element={<Reviews />} />
        <Route path="/cart"        element={<Cart />} />
        <Route path="/checkout"    element={<Checkout />} />
      </Routes>
       <Footer />
    </>
  )
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </CartProvider>
  )
}
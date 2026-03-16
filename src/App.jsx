import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { CartProvider }     from './context/CartContext'
import Navbar               from './components/Navbar'
import Footer               from './components/Footer'
import Home                 from './pages/Home'
import Bags                 from './pages/Bags'
import NewArrival           from './pages/NewArrival'
import Accessories          from './pages/Accessories'
import Contact              from './pages/Contact'
import CategoryPage from './pages/CategoryPage'
import Checkout             from './pages/Checkout'
import Reviews              from './pages/Reviews'
import FAQ                  from './pages/FAQ'
import RefundPolicy         from './pages/RefundPolicy'
import PrivacyPolicy        from './pages/PrivacyPolicy'
import TermsConditions      from './pages/TermsConditions'
import OrderTracking        from './pages/OrderTracking'
import ProductDetail from './pages/ProductDetail'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      {/* ✅ Navbar ke andar CartDrawer + WhatsAppButton dono hain */}
      <Navbar />
      <Routes>
        <Route path="/"                 element={<Home />} />
        <Route path="/bags"             element={<Bags />} />
        <Route path="/new-arrival"      element={<NewArrival />} />
        <Route path="/accessories"      element={<Accessories />} />
        <Route path="/contact"          element={<Contact />} />
        <Route path="/reviews"          element={<Reviews />} />
        <Route path="/checkout"         element={<Checkout />} />
        <Route path="/faq"              element={<FAQ />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/refund-policy"    element={<RefundPolicy />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/privacy-policy"   element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/order-tracking"   element={<OrderTracking />} />
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

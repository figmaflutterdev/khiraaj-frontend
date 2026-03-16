const BASE_URL = 'http://127.0.0.1:8000'

export const getProducts = (category = null, bestseller = false) => {
  let url = `${BASE_URL}/api/products/`
  const params = []
  if (category) params.push(`category=${category}`)
  if (bestseller) params.push(`bestseller=true`)
  if (params.length) url += '?' + params.join('&')
  return fetch(url).then(r => r.json())
}

export const submitOrder = async (orderData) => {
  const res = await fetch(`${BASE_URL}/api/orders/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  })
  return res.json()
}

export const getSettings = async () => {
  const res = await fetch(`${BASE_URL}/api/settings/`)
  return res.json()
}

export const getReviews = async () => {
  const res = await fetch(`${BASE_URL}/api/reviews/`)
  return res.json()
}

export const submitReview = async (formData) => {
  const res = await fetch(`${BASE_URL}/api/reviews/create/`, {
    method: 'POST',
    body: formData  // FormData — NO Content-Type header
  })
  return res.json()
}

export const validateCoupon = async (code, total) => {
  const res = await fetch(`${BASE_URL}/api/coupon/validate/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, total })
  })
  return res.json()
}

export const getFAQs = async () => {
  const res = await fetch(`${BASE_URL}/api/faqs/`)
  return res.json()
}

export const trackOrder = async (orderId, phone) => {
  const res = await fetch(`${BASE_URL}/api/orders/track/?order_id=${orderId}&phone=${phone}`)
  return res.json()
}
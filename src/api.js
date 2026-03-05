const BASE_URL = 'http://127.0.0.1:8000/api'

export const getProducts = async (category = '') => {
  const url = category
    ? `${BASE_URL}/products/?category=${category}`
    : `${BASE_URL}/products/`
  const res = await fetch(url)
  return res.json()
}

export const submitOrder = async (orderData) => {
  const res = await fetch(`${BASE_URL}/orders/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  })
  return res.json()
}

export const getSettings = async () => {
  const res = await fetch(`${BASE_URL}/settings/`)
  return res.json()
}
export const getReviews = async () => {
  const res = await fetch(`${BASE_URL}/reviews/`)
  return res.json()
}

export const submitReview = async (data) => {
  const res = await fetch(`${BASE_URL}/reviews/create/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}
export const validateCoupon = async (code, total) => {
  const res = await fetch(`${BASE_URL}/coupon/validate/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, total })
  })
  return res.json()
}
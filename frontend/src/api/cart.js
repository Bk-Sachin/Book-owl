const API_URL = 'http://localhost:5000/cart';

function getToken() {
  return localStorage.getItem('authToken') || localStorage.getItem('token');
}

export async function getCart() {
  const res = await fetch(API_URL, {
    headers: { 'Authorization': 'Bearer ' + getToken() }
  });
  if (!res.ok) throw new Error('Failed to fetch cart');
  return res.json();
}

export async function addOrUpdateCart(items) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getToken()
    },
    body: JSON.stringify({ items })
  });
  if (!res.ok) throw new Error('Failed to update cart');
  return res.json();
}

export async function clearCart() {
  const res = await fetch(API_URL, {
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer ' + getToken() }
  });
  if (!res.ok) throw new Error('Failed to clear cart');
  return res.json();
} 
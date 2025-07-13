// Use VITE_API_URL for deployment. Set VITE_API_URL in your .env file (e.g. https://your-backend.onrender.com)
const API_URL = import.meta.env.VITE_API_URL + '/books';

function getToken() {
  return localStorage.getItem('authToken') || localStorage.getItem('token');
}

export async function getBooks() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch books');
  return res.json();
}

export async function getBook(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch book');
  return res.json();
}

export async function addBook(book) {
  let body, headers;
  const token = getToken();
  if (book.coverFile) {
    body = new FormData();
    for (const key in book) {
      if (key === 'coverFile' && book.coverFile) {
        body.append('cover', book.coverFile);
      } else if (book[key] !== undefined && book[key] !== null) {
        body.append(key, book[key]);
      }
    }
    headers = { 'Authorization': 'Bearer ' + token };
  } else {
    body = JSON.stringify(book);
    headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token };
  }
  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body
  });
  if (!res.ok) throw new Error('Failed to add book');
  return res.json();
}

export async function updateBook(id, book) {
  const token = getToken();
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    body: JSON.stringify(book)
  });
  if (!res.ok) throw new Error('Failed to update book');
  return res.json();
}

export async function deleteBook(id) {
  const token = getToken();
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer ' + token }
  });
  if (!res.ok) throw new Error('Failed to delete book');
  return res.json();
} 
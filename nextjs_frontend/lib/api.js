// lib/api.js
const WP_URL = 'http://localhost:8080/wp-json';
const AUTH_KEY = 'secret_key'; 

export async function getBooks() {
  const res = await fetch(`${WP_URL}/wp/v2/book?_embed`); 
  
  if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
  
  const data = await res.json();

  return data.map(book => ({
    id: book.id,
    title: book.title.rendered,
    price: book.meta?.book_price || '0', 
    authorName: book.meta?.book_author || 'Unknown',
    description: book.meta?.book_description || '',
    genre: book.meta?.book_genre || 'None',
    publishingDate: book.date,
    imageUrl: book._embedded?.['wp:featuredmedia']?.[0]?.source_url || null
  }));
}

export async function registerUser(username, email, password) {
  const res = await fetch(`${WP_URL}/bookstore/v1/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Registration failed');
  }
  
  return data;
}

export async function loginUser(username, password) {
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);
  params.append('AUTH_KEY', AUTH_KEY); 
  
  const res = await fetch(`${WP_URL}/?rest_route=/simple-jwt-login/v1/auth`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded' 
    },
    body: params.toString()
  });

  const data = await res.json();
  
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Login failed');
  }

  localStorage.setItem('jwt_token', data.data.jwt);
  return data;
}

export async function createBook(bookData) {
  const token = localStorage.getItem('jwt_token');
  if (!token) throw new Error('You must be logged in.');

  const res = await fetch('http://localhost:8080/wp-json/wp/v2/book', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    body: JSON.stringify({
      title: bookData.title,
      content: bookData.description,
      status: 'publish',
      meta: {
        book_price: bookData.price,
        book_author: bookData.author,
        book_description: bookData.description,
        book_genre: bookData.genre
      }
    })
  });

  const data = await res.json();
  
  if (!res.ok) {
    // This part will now show you the ACTUAL error from WordPress
    const errorMessage = data.message || (data.data && data.data.message) || JSON.stringify(data);
    throw new Error(errorMessage);
  }

  return data;
}
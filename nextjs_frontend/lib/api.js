// lib/api.js
export async function getBooks() {
  // 1. The ?_embed tells WordPress to send the image data along with the post
  const res = await fetch('http://localhost:8080/wp-json/wp/v2/book?_embed');
  const data = await res.json();

  // 2. Map the complex REST response into a clean, flat object
  return data.map(book => ({
    id: book.id,
    title: book.title.rendered,
    price: book.price,
    authorName: book.authorName,
    description: book.description,
    genre: book.genre,
    publishingDate: book.publishingDate,
    // This looks for the image inside the _embedded object
    imageUrl: book._embedded?.['wp:featuredmedia']?.[0]?.source_url || null
  }));
}

export async function loginToWordPress(username, password) {
  const auth = btoa(`${username}:${password}`);

  const res = await fetch('http://localhost:8080/wp-json/wp/v2/users/me', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
    }
  });

  if (!res.ok) {
    throw new Error('Invalid Username or Application Password');
  }

  return await res.json(); // Returns user info if successful
}

export async function createBook(bookData) {
  return await authenticatedRequest(
    'http://localhost:8080/wp-json/wp/v2/book', 
    'POST', 
    { 
      title: bookData.title,
      status: 'publish', // or 'draft'
      // WordPress custom fields are sent inside the 'meta' object
      meta: {
        book_price: bookData.price,
        book_author: bookData.author,
        book_genre: bookData.genre,
        book_description: bookData.description
      }
    }
  );
}
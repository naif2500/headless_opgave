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
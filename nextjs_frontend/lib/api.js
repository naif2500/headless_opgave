const WP_URL = "http://localhost:8080/wp-json";
const AUTH_KEY = "secret_key";

export async function getBooks() {
  const res = await fetch(`${WP_URL}/wp/v2/book?_embed`);
  if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
  const data = await res.json();

  return data.map((book) => ({
    id: book.id,
    title: book.title.rendered,
    slug: book.slug,
    price: book.book_price || "0",
    authorName: book.book_author || "Unknown",
    description: book.book_description || "",
    genre: book.book_genre || "None",
    publishingDate: book.date,
    featuredImage: {
      node: {
        sourceUrl:
          book._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
      },
    },
  }));
}

export async function getBookBySlug(slug) {
  try {
    const res = await fetch(`${WP_URL}/wp/v2/book?slug=${slug}&_embed`);

    // 1. Check if the fetch failed (e.g., 404)
    if (!res.ok) {
      console.error(`API Error: ${res.status}`);
      return null;
    }

    const data = await res.json();

    // 2. Check if the API returned an empty array
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.log(`No book found for slug: ${slug}`);
      return null;
    }

    const book = data[0];

    return {
      id: book?.id || 0,
      title: book?.title?.rendered || "No Title",
      slug: book?.slug || slug,
      price: book?.book_price || book?.meta?.book_price || "0",
      authorName: book?.book_author || book?.meta?.book_author || "Unknown",
      description: book?.book_description || book?.meta?.book_description || "",
      genre: book?.book_genre || book?.meta?.book_genre || "None",
      publishingDate: book?.date || "",
      featuredImage: {
        node: {
          sourceUrl:
            book?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
        },
      },
    };
  } catch (err) {
    console.error("Fetch Error:", err);
    return null;
  }
}

export async function registerUser(username, email, password) {
  const res = await fetch(`${WP_URL}/bookstore/v1/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Registration failed");
  return data;
}

export async function loginUser(username, password) {
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);
  params.append("AUTH_KEY", "secret_key"); // Make sure this is in your .env!

  const res = await fetch("http://localhost:8080/wp-json/?rest_route=/simple-jwt-login/v1/auth", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || "Login failed");

  return data.data.jwt; // Return the token to the component
}

export async function createBook(bookData, token) {
  if (!token) throw new Error("You must be logged in.");

  const res = await fetch(`${WP_URL}/wp/v2/book`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Pass the token here
    },
    body: JSON.stringify({
      title: bookData.title,
      content: bookData.description,
      status: "publish",
      meta: {
        book_price: bookData.price,
        book_author: bookData.author,
        book_description: bookData.description,
        book_genre: bookData.genre,
      },
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create book");
  return data;
}

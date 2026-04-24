// lib/api.js

const WP_URL = process.env.NEXT_PUBLIC_WP_URL;

// 1. Helper to handle JSON responses consistently
async function fetchWP(endpoint, options = {}) {
  const res = await fetch(`${WP_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${res.status}`);
  }

  return res.json();
}

export async function getBooks() {
  return fetchWP("/wp/v2/book?_embed");
}

export async function getBookBySlug(slug) {
  const data = await fetchWP(`/wp/v2/book?slug=${slug}&_embed`);
  return data.length > 0 ? data[0] : null;
}

// lib/api.js

export async function registerUser(username, email, password) {
  // LOG THE DATA BEFORE SENDING
  console.log("DEBUG: Sending this data to API:", { 
    user_login: username, 
    email: email, 
    password: password 
  });

  const params = new URLSearchParams();
  params.append("user_login", username);
  params.append("email", email);
  params.append("password", password);
  params.append("AUTH_KEY", process.env.NEXT_PUBLIC_AUTH_KEY);

  const endpoint = "/?rest_route=/simple-jwt-login/v1/users";
  const url = `${process.env.NEXT_PUBLIC_WP_URL.replace('/wp-json', '')}${endpoint}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const data = await res.json();
  
  if (!res.ok) {
    console.error("FULL ERROR:", data);
    throw new Error(data.data.message || "Registration failed");
  }

  return data;
}

export async function loginUser(username, password) {
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);
  // Note: Check if the plugin actually requires the AUTH_KEY here
  params.append("AUTH_KEY", process.env.AUTH_KEY); 

  const res = await fetch(`${WP_URL}/?rest_route=/simple-jwt-login/v1/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Login failed");
  return data.data.jwt;
}

// 1. UPLOAD IMAGE (Call this first if the user selected a file)
export async function uploadMedia(file, token) {
  const WP_URL = process.env.NEXT_PUBLIC_WP_URL;
  const res = await fetch(`${WP_URL}/wp/v2/media`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Disposition": `attachment; filename="${file.name}"`,
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!res.ok) throw new Error("Failed to upload image");
  return res.json(); // Returns an object with an 'id'
}

// 2. CREATE BOOK (Now accepts an optional media ID)
export async function createBook(bookData, token, featuredMediaId = null) {
  const payload = {
    title: bookData.title,
    content: bookData.description,
    status: "publish",
    meta: {
      book_price: bookData.price,
      book_author: bookData.author,
      book_description: bookData.description,
      book_genre: bookData.genre,
      book_posted_by: bookData.postedBy,
    },
  };

  // Attach the image if an ID was provided
  if (featuredMediaId) {
    payload.featured_media = featuredMediaId;
  }

  return fetchWP("/wp/v2/book", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });
}

// 3. UPDATE BOOK (For editing existing entries)
export async function updateBook(bookId, bookData, token) {
  return fetchWP(`/wp/v2/book/${bookId}`, {
    method: "POST", // WordPress uses POST for updates
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      title: bookData.title,
      content: bookData.description,
      meta: {
        book_price: bookData.price,
        book_author: bookData.author,
        book_description: bookData.description,
        book_genre: bookData.genre,
        book_posted_by: bookData.postedBy,
      },
    }),
  });
}


'use server'

import { cookies } from 'next/headers';
import { createBook } from './api';
import { jwtDecode } from 'jwt-decode'; 

export async function createBookAction(formData) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    throw new Error("You must be logged in to create a book.");
  }


  const decodedToken = jwtDecode(token);
  const username = decodedToken.username || decodedToken.sub; 

  const bookData = {
    title: formData.get('title'),
    price: formData.get('price'),
    author: formData.get('author'),
    description: formData.get('description'),
    genre: 'General',
    postedBy: username,
  };

  return await createBook(bookData, token);
}

export async function deleteBookAction(bookId) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  console.log("DEBUG: Token found:", token); // <--- ADD THIS

  if (!token) {
    console.error("No token found in cookies!");
    throw new Error("No authentication token found.");
  }

  const res = await fetch(`${process.env.WP_URL}/wp/v2/book/${bookId}?force=true`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`, // Ensure there is a space after Bearer
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
     const errorText = await res.text();
     console.error("WordPress returned 401/403:", errorText);
     throw new Error("Unauthorized");
  }
  
  return { success: true };
}
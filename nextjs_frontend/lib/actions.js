'use server'

import { cookies } from 'next/headers';
import { createBook, uploadMedia, updateBook } from './api';
import { jwtDecode } from 'jwt-decode'; 

export async function createBookAction(formData) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    throw new Error("You must be logged in to create a book.");
  }

  const decodedToken = jwtDecode(token);
  const username = decodedToken.username || decodedToken.sub; 

  // 1. Handle File Upload
  const imageFile = formData.get('image');
  let mediaId = null;

  if (imageFile && imageFile.size > 0) {
    try {
      const mediaData = await uploadMedia(imageFile, token);
      mediaId = mediaData.id;
    } catch (error) {
      throw new Error("Failed to upload image: " + error.message);
    }
  }

  // 2. Prepare Book Data
  const bookData = {
    title: formData.get('title'),
    price: formData.get('price'),
    author: formData.get('author'),
    description: formData.get('description'),
    genre: formData.get('genre') || 'General',
    postedBy: username,
    condition: formData.get('condition') // Ensure this matches your form input name
  };

  // 3. Create Book (Passing mediaId as the 3rd argument)
  return await createBook(bookData, token, mediaId);
}

export async function deleteBookAction(bookId) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    throw new Error("No authentication token found.");
  }

  const res = await fetch(`${process.env.WP_URL}/wp/v2/book/${bookId}?force=true`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`, 
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
     const errorText = await res.text();
     console.error("WordPress deletion error:", errorText);
     throw new Error("Unauthorized or item not found");
  }
  
  return { success: true };
}

export async function updateBookAction(bookId, formData) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) throw new Error("Not authorized");

  // Handle new image upload
  let mediaId = null;
  const imageFile = formData.get('image');
  if (imageFile && imageFile.size > 0) {
    const mediaData = await uploadMedia(imageFile, token);
    mediaId = mediaData.id;
  }

  const bookData = {
    title: formData.get('title'),
    price: formData.get('price'),
    author: formData.get('author'),
    description: formData.get('description'),
    genre: formData.get('genre') || 'General',
    condition: formData.get('condition'),
  };

  // We call the updateBook function we defined earlier
  // (Pass mediaId only if a new image was uploaded)
  return await updateBook(bookId, bookData, token, mediaId);
}
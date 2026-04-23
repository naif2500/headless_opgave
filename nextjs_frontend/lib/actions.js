'use server'

import { cookies } from 'next/headers';
import { createBook } from './api';
import { jwtDecode } from 'jwt-decode'; // Recommended: npm install jwt-decode

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
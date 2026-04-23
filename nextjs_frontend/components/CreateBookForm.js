'use client'
import { createBook } from '../lib/api';
import { getCookie } from 'cookies-next'; // Optional: Use 'cookies-next' or just write an action

// We define the action inside the component file, but it runs on the server
async function handleCreateBook(formData) {
  'use server'
  const { cookies } = require('next/headers');
  const token = cookies().get('auth_token')?.value;

  const bookData = {
    title: formData.get('title'),
    price: formData.get('price'),
    author: formData.get('author'),
    description: formData.get('description'),
    genre: 'General'
  };

  return await createBook(bookData, token);
}

export default function CreateBookForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      await handleCreateBook(formData);
      alert('Book added successfully!');
      e.target.reset();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="title" placeholder="Book Title" required className="border p-2 w-full" />
      <input name="price" placeholder="Price" type="number" required className="border p-2 w-full" />
      <input name="author" placeholder="Author" required className="border p-2 w-full" />
      <textarea name="description" placeholder="Description" required className="border p-2 w-full" />
      <button className="bg-green-600 text-white p-2 w-full">Add Book</button>
    </form>
  );
}
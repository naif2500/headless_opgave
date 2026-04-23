'use client' // REQUIRED for the form to be interactive

import { createBookAction } from '../lib/actions'; // Import your new action

export default function CreateBookForm() {
  
  // This function now handles the form submission using the server action
  const formAction = async (formData) => {
    try {
      await createBookAction(formData);
      alert('Book added successfully!');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <form action={formAction} className="space-y-4">
      <input name="title" placeholder="Book Title" required className="border p-2 w-full" />
      <input name="price" placeholder="Price" type="number" required className="border p-2 w-full" />
      <input name="author" placeholder="Author" required className="border p-2 w-full" />
      <textarea name="description" placeholder="Description" required className="border p-2 w-full" />
      <button type="submit" className="bg-green-600 text-white p-2 w-full">
        Add Book
      </button>
    </form>
  );
}
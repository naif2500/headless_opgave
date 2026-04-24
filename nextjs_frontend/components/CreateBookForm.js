"use client";

import { createBookAction } from "../lib/actions";

export default function CreateBookForm() {
  const formAction = async (formData) => {
    try {
      await createBookAction(formData);
      alert("Book added successfully!");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    // encType is required for file uploads
    <form action={formAction} className="space-y-4">
      <input
        name="title"
        placeholder="Book Title"
        required
        className="border p-2 w-full"
      />
      <input
        name="price"
        placeholder="Price"
        type="number"
        required
        className="border p-2 w-full"
      />
      <input
        name="author"
        placeholder="Author"
        required
        className="border p-2 w-full"
      />

      <div className="border p-2 w-full">
        <label className="block text-sm">Cover Image</label>
        <input name="image" type="file" accept="image/*" />
      </div>

      <textarea
        name="description"
        placeholder="Description"
        required
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-green-600 text-white p-2 w-full">
        Add Book
      </button>
    </form>
  );
}

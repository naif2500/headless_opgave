import { createBook } from '../lib/api';

export default function CreateBookForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // This object matches EXACTLY what api.js expects
    const bookData = {
      title: e.target.title.value,
      description: e.target.description.value, // Added this
      price: e.target.price.value,
      author: e.target.author.value,
      genre: 'General'
    };

    try {
      await createBook(bookData);
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
'use client'
import { useState, useEffect, use } from 'react'; // Added 'use' here
import { getBookBySlug } from '../../../../lib/api';
import { updateBookAction } from '../../../../lib/actions';

export default function EditBookPage({ params }) {
  // Unwrap params
  const { slug } = use(params);
  
  const [book, setBook] = useState(null);

  useEffect(() => {
    getBookBySlug(slug).then(setBook);
  }, [slug]);

  if (!book) return <div>Loading...</div>;

  const handleSubmit = async (formData) => {
    // Pass the book.id and the form data to the action
    await updateBookAction(book.id, formData);
    alert('Book updated!');
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      <input 
        name="title" 
        defaultValue={book.title?.rendered} 
        className="border p-2 w-full" 
        placeholder="Title"
      />
      <input 
        name="price" 
        defaultValue={book.book_price} 
        className="border p-2 w-full" 
        placeholder="Price"
      />
      <input 
        name="author" 
        defaultValue={book.book_author} 
        className="border p-2 w-full" 
        placeholder="Author"
      />
      <textarea 
        name="description" 
        defaultValue={book.book_description} 
        className="border p-2 w-full" 
        placeholder="Description"
      />
      
      <div className="border p-2 w-full">
        <label className="block text-sm font-bold">Upload New Image (Optional)</label>
        <input name="image" type="file" accept="image/*" />
      </div>
      
      <button type="submit" className="bg-blue-600 text-white p-2 w-full">
        Save Changes
      </button>
    </form>
  );
}
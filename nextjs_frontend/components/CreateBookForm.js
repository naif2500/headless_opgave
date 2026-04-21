import { useState } from 'react';
import { createBook } from '../lib/api';

export default function CreateBookForm() {
  const [formData, setFormData] = useState({
    title: '', price: '', author: '', genre: '', description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBook(formData);
      alert("Book created successfully!");
      setFormData({ title: '', price: '', author: '', genre: '', description: '' }); // Clear form
    } catch (err) {
      alert("Failed to create book. Are you logged in?");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold">Add New Book</h2>
      
      <input type="text" placeholder="Title" required className="w-full border p-2 rounded"
        onChange={(e) => setFormData({...formData, title: e.target.value})} value={formData.title} />
        
      <input type="text" placeholder="Price" className="w-full border p-2 rounded"
        onChange={(e) => setFormData({...formData, price: e.target.value})} value={formData.price} />
        
      <input type="text" placeholder="Author" className="w-full border p-2 rounded"
        onChange={(e) => setFormData({...formData, author: e.target.value})} value={formData.author} />

      <input type="text" placeholder="Genre" className="w-full border p-2 rounded"
        onChange={(e) => setFormData({...formData, genre: e.target.value})} value={formData.genre} />

      <textarea placeholder="Description" className="w-full border p-2 rounded"
        onChange={(e) => setFormData({...formData, description: e.target.value})} value={formData.description} />

      <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700">
        Create Listing
      </button>
    </form>
  );
}
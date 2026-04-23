'use client'; 

import { useState, useEffect } from 'react';
import { getBooks } from '../lib/api';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import CreateBookForm from '../components/CreateBookForm';

export default function BookstorePage() {
  const [books, setBooks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false); // Toggle between Login/Register

  useEffect(() => {
    // 1. Check login status
    const token = localStorage.getItem('jwt_token');
    setIsLoggedIn(!!token);

    // 2. Fetch books
    getBooks().then(data => setBooks(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">📚 The Headless Bookstore</h1>
        <p className="text-gray-600 mt-2">Powered by WordPress REST API</p>
      </header>

      {/* --- Auth / Create Section --- */}
      <div className="mb-12 max-w-2xl mx-auto">
        {isLoggedIn ? (
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-green-500">
            <h2 className="text-xl font-bold mb-4">Welcome back!</h2>
            <CreateBookForm />
            <button 
              onClick={() => { localStorage.clear(); window.location.reload(); }}
              className="mt-6 text-sm text-red-500 hover:underline"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-md">
            {showRegister ? (
              <>
                <h2 className="text-xl font-bold mb-4">Create an Account</h2>
                <RegisterForm />
                <button onClick={() => setShowRegister(false)} className="mt-4 text-sm text-blue-600 hover:underline">
                  Already have an account? Log in instead.
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-4">Log in to add books</h2>
                <LoginForm />
                <button onClick={() => setShowRegister(true)} className="mt-4 text-sm text-blue-600 hover:underline">
                  Need an account? Register here.
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* --- Book Grid --- */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <article key={book.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform">
            <div className="h-64 bg-gray-200 relative">
              {book.imageUrl ? (
                <img src={book.imageUrl} alt={book.title} className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">No Cover Image</div>
              )}
            </div>

            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{book.title}</h2>
              <div className="text-sm text-gray-500 mb-2 italic">
                {book.genre || 'No genre'}, {book.publishingDate || 'No date'}
              </div>
              <p className="text-sm text-blue-600 font-semibold uppercase tracking-wider mb-4">
                By {book.authorName || 'Unknown Author'}
              </p>
              <p className="text-gray-700 mb-4">{book.description || 'No description available.'}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-2xl font-bold text-green-600">{book.price ? `$${book.price}` : 'Price TBD'}</span>
                <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700">View Details</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
'use client'

import { useEffect, useState } from 'react'
import { getBooks } from '../../lib/api'
import Link from 'next/link'
import Image from 'next/image'

const getImageUrl = (book) => {
  if (!book._embedded) return null;
  const media = book._embedded['wp:featuredmedia'];
  if (media && media[0] && media[0].source_url) {
    return media[0].source_url;
  }
  return null;
};

export default function BooksPage() {
  const [books, setBooks] = useState([])
  const [activeGenre, setActiveGenre] = useState('All')
  const [genres, setGenres] = useState(['All'])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBooks().then(data => {
      setBooks(data)
      // FIX: Use book_genre for the unique list
      const unique = ['All', ...new Set(data.map(b => b.book_genre).filter(Boolean))]
      setGenres(unique)
      setLoading(false)
    })
  }, [])

  // FIX: Use book_genre for filtering
  const filtered = activeGenre === 'All' ? books : books.filter(b => b.book_genre === activeGenre)

  console.log("FULL BOOK DATA:", books)

  return (
    <div className="page">
      <h1 className="page-title">Alle Bøger</h1>
      <p className="page-sub">{books.length} titler tilgængelige</p>

      <div className="filter-bar">
        {genres.map(g => (
          <button
            key={g}
            className={`filter-chip${activeGenre === g ? ' active' : ''}`}
            onClick={() => setActiveGenre(g)}
          >
            {g}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading">Indlæser bøger...</div>
      ) : (
        <div className="books-grid">
        {books.map((book) => {
          const imageUrl = getImageUrl(book);
          return (
            <Link key={book.id} href={`/books/${book.slug}`} className="book-card">
              <div className="book-card-img">
                {imageUrl ? (
                  <Image src={imageUrl} alt={book.title.rendered} fill style={{ objectFit: "cover" }} />
                ) : (
                  <span className="book-placeholder">📖</span>
                )}
              </div>
              <div className="book-card-body">
                <div className="book-card-title">{book.title.rendered}</div>
                <div className="book-card-author">{book.book_author}</div>
                <div className="book-card-footer">
                  <span className="book-card-price">{book.book_price} kr</span>
                  <span className="book-card-genre">{book.book_genre}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      )}
    </div>
  )
}
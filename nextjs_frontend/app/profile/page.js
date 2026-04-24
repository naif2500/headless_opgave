"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import CreateBookForm from "../../components/CreateBookForm";
import { getBooks } from "../../lib/api";
import { deleteBookAction } from "../../lib/actions";

export default function ProfilePage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        // 1. Get the current user
        const userRes = await fetch("/api/auth/me");
        if (!userRes.ok) throw new Error("Not logged in");
        const userData = await userRes.json();

        // 2. Get all books
        const allBooks = await getBooks();

        // 3. FIX: Filter using the correct API key (book_posted_by)
        const myBooks = allBooks.filter(
          (book) => book.book_posted_by === userData.username,
        );
        setBooks(myBooks);
      } catch (err) {
        console.error("Failed to load profile data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleDelete = async (e, bookId) => {
    e.preventDefault();
    if (!confirm("Er du sikker på, at du vil slette denne bog?")) return;

    try {
      await deleteBookAction(bookId);
      setBooks(books.filter((b) => b.id !== bookId));
      alert("Bogen er slettet!");
    } catch (err) {
      alert("Fejl ved sletning: " + err.message);
    }
  };

  return (
    <div className="page">
      <h1 className="page-title">Min Profil</h1>

      <div className="form-wrapper">
        <CreateBookForm />
      </div>

      <div>
        <h2>Mine bøger til salg</h2>
        {loading ? (
          <div className="loading">Indlæser bøger...</div>
        ) : (
          <div className="books-grid">
            {books.length > 0 ? (
              books.map((book) => (
                <div key={book.id} className="book-card-container">
                  <Link href={`/books/${book.slug}`} className="book-card">
                    <div className="book-card-img">
                      {book.featuredImage?.node?.sourceUrl ? (
                        <Image
                          src={book.featuredImage.node.sourceUrl}
                          // FIX: Access rendered title
                          alt={book.title.rendered}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <span className="book-placeholder">📖</span>
                      )}
                    </div>
                    <div className="book-card-body">
                      {/* FIX: Access rendered title */}
                      <div className="book-card-title">
                        {book.title.rendered}
                      </div>
                      {/* FIX: Use book_author */}
                      <div className="book-card-author">{book.book_author}</div>
                      <div className="book-card-footer">
                        {/* FIX: Use book_price and book_genre */}
                        <span className="book-card-price">
                          {book.book_price} kr
                        </span>
                        <span className="book-card-genre">
                          {book.book_genre}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <button
                    className="book-card-delete"
                    onClick={(e) => handleDelete(e, book.id)}
                  >
                    Slet
                  </button>
                  <Link
                    href={`/books/edit/${book.slug}`}
                    className="bg-yellow-500 text-white p-2 rounded"
                  >
                    Edit Book
                  </Link>
                </div>
              ))
            ) : (
              <p>Du har ikke oprettet nogen bøger endnu.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

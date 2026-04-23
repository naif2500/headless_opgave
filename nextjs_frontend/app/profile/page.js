"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import CreateBookForm from "../../components/CreateBookForm";
import { getBooks } from "../../lib/api"; // Corrected import usage

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

        // 2. Get all books (Corrected function name here)
        const allBooks = await getBooks();

        // 3. Filter using the real username
        const myBooks = allBooks.filter(
          (book) => book.postedBy === userData.username
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
                <Link
                  key={book.id}
                  href={`/books/${book.slug}`}
                  className="book-card"
                >
                  <div className="book-card-img">
                    {book.featuredImage?.node?.sourceUrl ? (
                      <Image
                        src={book.featuredImage.node.sourceUrl}
                        alt={book.title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <span className="book-placeholder">📖</span>
                    )}
                  </div>
                  <div className="book-card-body">
                    <div className="book-card-title">{book.title}</div>
                    <div className="book-card-author">{book.authorName}</div>
                    <div className="book-card-footer">
                      <span className="book-card-price">{book.price} kr</span>
                      <span className="book-card-genre">{book.genre}</span>
                    </div>
                  </div>
                </Link>
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
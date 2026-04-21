"use client";

import { useEffect, useState } from "react";
import { getBooks } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

const GENRES = ["All"];

export default function BooksPage() {
    const [books, setBooks] = useState([]);
    const [activeGenre, setActiveGenre] = useState("All");
    const [genres, setGenres] = useState(["All"]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getBooks().then((data) => {
            setBooks(data.data);
            const unique = [
                "All",
                ...new Set(data.data.map((b) => b.genre.name).filter(Boolean)),
            ];
            setGenres(unique);
            setLoading(false);
        });
    }, []);

    const filtered =
        activeGenre === "All"
            ? books
            : books.filter((b) => b.genre === activeGenre);

    return (
        <div className="page">
            <h1 className="page-title">Alle Bøger</h1>
            <p className="page-sub">{books.length} titler tilgængelige</p>

            <div className="filter-bar">
                {genres.map((g) => (
                    <button
                        key={g}
                        className={`filter-chip${activeGenre === g ? " active" : ""}`}
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
                    {filtered.map((book) => (
                        <Link
                            key={book.id}
                            href={`/books/${book.slug}`}
                            className="book-card"
                        >
                            <div className="book-card-img">
                                {book.image ? (
                                    <Image
                                        src={book.image}
                                        alt={book.title}
                                        fill
                                        style={{ objectFit: "cover" }}
                                    />
                                ) : (
                                    <span className="book-placeholder">📖</span>
                                )}
                            </div>
                            <div className="book-card-body">
                                <div className="book-card-title">
                                    {book.title}
                                </div>
                                {book.author.map((author) => (
                                    <div
                                        key={author.id}
                                        className="book-card-author"
                                    >
                                        {author.name}
                                    </div>
                                ))}
                                <div className="book-card-footer">
                                    <span className="book-card-price">
                                        {book.price} kr
                                    </span>
                                    <span className="book-card-genre">
                                        {book.genre.name}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

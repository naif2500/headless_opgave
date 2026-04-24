"use client";
import { getUserBooks } from "@/lib/api";
import { getAuth } from "@/lib/getAuth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const hasCookie = getAuth();

    useEffect(() => {
        if (!hasCookie) redirect("/login");
    }, [hasCookie]);

    useEffect(() => {
        getUserBooks().then((data) => {
            setBooks(data.data);
            setLoading(false);
        });
    }, []);

    return (
        <div className="page">
            <h1 className="page-title">Dine Bøger</h1>
            <p className="page-sub">{books.length} titler tilgængelige</p>

            {loading ? (
                <div className="loading">Indlæser bøger...</div>
            ) : (
                <div className="books-grid">
                    {books.map((book) => (
                        <div key={book.id} className="book-card">
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

                            <Link href={`/user-books/${book.id}`}>Rediger</Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Page;

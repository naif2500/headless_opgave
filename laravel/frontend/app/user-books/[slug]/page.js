"use client";

import { deleteBook, getBookBySlug, updateBook } from "@/lib/api";
import Link from "next/link";
import { redirect } from "next/navigation";
import { use, useEffect, useState } from "react";

const Page = ({ params }) => {
    const { slug } = use(params);
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getBookBySlug(slug).then((data) => {
            setBook(data.data);
            setLoading(false);
        });
    }, [slug]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        data.append("_method", "PUT");
        const res = await updateBook(data, book.id);

        if (res.message === "Book updated successfully") {
            redirect("/user-books");
        }
    };

    const handleDelete = async () => {
        const res = await deleteBook(book.id);

        if (res.message === "Book deleted successfully") {
            redirect("/user-books");
        }
    };

    return (
        <div className="page">
            <div className="breadcrumbs">
                <Link href="/" className="breadcrumb-link">
                    Hjem
                </Link>
                <span className="breadcrumb-sep">/</span>
                <Link href="/" className="breadcrumb-link">
                    Dine Bøger
                </Link>
                <span className="breadcrumb-sep">/</span>
                <span>{book?.title}</span>
            </div>

            {loading ? (
                <div className="loading">Indlæser bogen...</div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="inputs-row">
                        <div className="labeled-input">
                            <label htmlFor="price" className="form-label">
                                Pris
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                className="form-input"
                                required
                                defaultValue={book?.price}
                            ></input>
                        </div>
                        <div className="labeled-input">
                            <label htmlFor="image" className="form-label">
                                Billede
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                className="form-input"
                                accept=".png, .jpg, .jpeg"
                            ></input>
                        </div>
                    </div>

                    <div className="inputs-row">
                        <div className="labeled-input">
                            <label htmlFor="description" className="form-label">
                                Beskrivelse
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                className="form-input"
                                maxLength={255}
                                required
                                defaultValue={book?.description}
                            ></textarea>
                        </div>
                    </div>

                    <div className="buttons">
                        <button type="submit" className="submit-btn">
                            Indsend bogen
                        </button>

                        <button
                            type="button"
                            className="delete-btn"
                            onClick={handleDelete}
                        >
                            Slet bogen
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Page;

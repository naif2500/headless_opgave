"use client";

import { useEffect, useState, use } from "react";
import { getBookBySlug } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

function conditionColor(val) {
    if (val >= 70) return "#3B6D11";
    if (val >= 40) return "#BA7517";
    return "#A32D2D";
}

function conditionLabel(val) {
    if (val >= 85) return "Som ny";
    if (val >= 70) return "Meget god";
    if (val >= 50) return "God";
    if (val >= 30) return "Rimelig";
    return "Dårlig";
}

function ConditionMeter({ value }) {
    const num = parseInt(value) || 0;
    const color = conditionColor(num);
    return (
        <div className="condition-wrapper">
            <div className="condition-label">
                <span>Bogtilstand</span>
                <span className="condition-text" style={{ color }}>
                    {conditionLabel(num)}
                </span>
            </div>
            <div className="condition-bar-bg">
                <div
                    className="condition-bar-fill"
                    style={{ width: `${num}%`, background: color }}
                />
            </div>
            <div className="condition-scale">
                <span>Dårlig</span>
                <span>Som ny</span>
            </div>
        </div>
    );
}

export default function BookPage({ params }) {
    const { slug } = use(params);
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeThumb, setActiveThumb] = useState(0);
    const [added, setAdded] = useState(false);
    const { addToCart } = useCart();

    useEffect(() => {
        getBookBySlug(slug).then((data) => {
            setBook(data.data);
            setLoading(false);
        });
    }, [slug]);

    function handleAddToCart() {
        addToCart(book);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    }

    if (loading)
        return (
            <div className="page">
                <div className="loading">Indlæser...</div>
            </div>
        );
    if (!book)
        return (
            <div className="page">
                <p>Bogen blev ikke fundet.</p>
            </div>
        );

    const images = book.image ? [book.image] : [];

    return (
        <div className="page">
            <div className="breadcrumbs">
                <Link href="/" className="breadcrumb-link">
                    Hjem
                </Link>
                <span className="breadcrumb-sep">/</span>
                <Link href="/books" className="breadcrumb-link">
                    Bøger
                </Link>
                <span className="breadcrumb-sep">/</span>
                <span>{book.title}</span>
            </div>

            <div className="product-layout">
                <div>
                    <div className="product-main-img">
                        {images[activeThumb] ? (
                            <Image
                                src={images[activeThumb]}
                                alt={book.title}
                                fill
                                style={{
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                }}
                            />
                        ) : (
                            <span style={{ fontSize: "6rem" }}>📖</span>
                        )}
                    </div>
                    {images.length > 1 && (
                        <div className="img-carousel">
                            {images.map((src, i) => (
                                <div
                                    key={i}
                                    className={`img-thumb${activeThumb === i ? " active" : ""}`}
                                    onClick={() => setActiveThumb(i)}
                                >
                                    <Image
                                        src={src}
                                        alt=""
                                        fill
                                        style={{ objectFit: "cover" }}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    {book.genre && (
                        <span className="product-genre">{book.genre.name}</span>
                    )}
                    <h1 className="product-title">{book.title}</h1>
                    {book.author.map((author) => (
                        <p key={author.id} className="product-author">
                            af {author.name}
                        </p>
                    ))}
                    {book.publishing_date && (
                        <p className="product-pubdate">
                            Udgivet: {book.publishing_date}
                        </p>
                    )}
                    <p className="product-desc">
                        {book.description ||
                            (book.excerpt &&
                                book.excerpt.replace(/<[^>]*>/g, ""))}
                    </p>
                    <div className="product-price">{book.price} kr</div>
                    <button
                        className={`add-to-cart${added ? " added" : ""}`}
                        onClick={handleAddToCart}
                    >
                        {added ? "✓ Tilføjet til kurv" : "Tilføj til kurv"}
                    </button>
                    <ConditionMeter value={book.condition || 80} />
                </div>
            </div>
        </div>
    );
}

"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
    const { cartCount } = useCart();

    return (
        <nav className="navbar">
            <Link href="/" className="navbar-logo">
                MJJS
            </Link>
            <div className="navbar-links">
                <Link href="/books" className="navbar-link">
                    Gennemse Bøger
                </Link>
                <Link href="/" className="navbar-link">
                    Nye Ankomster
                </Link>
                <Link href="/sell-book" className="navbar-link">
                    Sælg en Bog
                </Link>
                <Link href="/user-books" className="navbar-link">
                    Dine Bøger
                </Link>
            </div>
            <Link href="/cart" className="cart-btn">
                Kurv
                {cartCount > 0 && (
                    <span className="cart-badge">{cartCount}</span>
                )}
            </Link>
            <Link href="/login" className="cart-btn">
                Login
                <span className="cart-badge"></span>
            </Link>
        </nav>
    );
}

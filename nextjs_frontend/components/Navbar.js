'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function Navbar() {
  const { cartCount } = useCart()

  return (
    <nav className="navbar">
      <Link href="/" className="navbar-logo">MJJS</Link>
      <div className="navbar-links">
        <Link href="/books" className="navbar-link">Browse Books</Link>
        <Link href="/" className="navbar-link">New Arrivals</Link>
      </div>
      <Link href="/cart" className="cart-btn">
         Cart
        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
      </Link>
    </nav>
  )
}
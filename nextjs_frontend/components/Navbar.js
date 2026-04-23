'use client'
import { useState } from 'react';
import Link from 'next/link';
// Remove useRouter
import { useCart } from '../context/CartContext';

export default function Navbar({ isLoggedIn }) {
  const { cartCount } = useCart();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setIsDropdownOpen(false); // Close menu
    window.location.href = '/'; 
  };

  return (
    <nav className="navbar">
      <Link href="/" className="navbar-logo">MJJS</Link>

      <div className="navbar-links">
        <Link href="/books" className="navbar-link">Gennemse Bøger</Link>
      </div>

      {isLoggedIn ? (
        /* The container handles the hover logic */
        <div 
          className="relative"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          {/* This is now a simple Link to your profile page */}
          <Link href="/profile" className="navbar-link">
            Min Profil
          </Link>
          
          {/* The dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white border border-[#e8e4de] shadow-lg rounded-md p-2 z-50">
              <button 
                onClick={handleLogout} 
                className="navbar-link"
                style={{ color: '#e24b4a', display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Log Ud
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link href="/login" className="navbar-link">Log Ind</Link>
      )}

      <Link href="/cart" className="cart-btn">
        Kurv
        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
      </Link>
    </nav>
  );
}
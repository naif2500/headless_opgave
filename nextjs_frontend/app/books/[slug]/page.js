'use client'

import { useEffect, useState, use } from 'react'
import { getBookBySlug } from '../../../lib/api'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '../../../context/CartContext'

// Helper function to safely get the image URL
const getImageUrl = (book) => {
  if (!book._embedded) return null;
  const media = book._embedded['wp:featuredmedia'];
  if (media && media[0] && media[0].source_url) {
    return media[0].source_url;
  }
  return null;
};

function conditionColor(val) {
  if (val >= 70) return '#3B6D11'
  if (val >= 40) return '#BA7517'
  return '#A32D2D'
}

function conditionLabel(val) {
  if (val >= 85) return 'Som ny'
  if (val >= 70) return 'Meget god'
  if (val >= 50) return 'God'
  if (val >= 30) return 'Rimelig'
  return 'Dårlig'
}

function ConditionMeter({ value }) {
  const num = parseInt(value) || 0
  const color = conditionColor(num)
  return (
    <div className="condition-wrapper">
      <div className="condition-label">
        <span>Bogtilstand</span>
        <span className="condition-text" style={{ color }}>{conditionLabel(num)}</span>
      </div>
      <div className="condition-bar-bg">
        <div className="condition-bar-fill" style={{ width: `${num}%`, background: color }} />
      </div>
      <div className="condition-scale">
        <span>Dårlig</span>
        <span>Som ny</span>
      </div>
    </div>
  )
}

export default function BookPage({ params }) {
  // Unwrap params using React.use()
  const { slug } = use(params)
  
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeThumb, setActiveThumb] = useState(0)
  const [added, setAdded] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    getBookBySlug(slug).then(data => {
      setBook(data)
      setLoading(false)
    })
  }, [slug])

  function handleAddToCart() {
    addToCart(book)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) return <div className="page"><div className="loading">Indlæser...</div></div>
  if (!book) return <div className="page"><p>Bogen blev ikke fundet.</p></div>

  const imageUrl = getImageUrl(book);
  const images = imageUrl ? [imageUrl] : [];

  return (
    <div className="page">
      <div className="breadcrumbs">
        <Link href="/" className="breadcrumb-link">Hjem</Link>
        <span className="breadcrumb-sep">/</span>
        <Link href="/books" className="breadcrumb-link">Bøger</Link>
        <span className="breadcrumb-sep">/</span>
        <span>{book.title?.rendered}</span>
      </div>

      <div className="product-layout">
        <div>
          <div className="product-main-img">
            {images[activeThumb] ? (
              <Image
                src={images[activeThumb]}
                alt={book.title?.rendered}
                fill
                style={{ objectFit: 'cover', borderRadius: '8px' }}
              />
            ) : (
              <span style={{ fontSize: '6rem' }}>📖</span>
            )}
          </div>
          {images.length > 1 && (
            <div className="img-carousel">
              {images.map((src, i) => (
                <div
                  key={i}
                  className={`img-thumb${activeThumb === i ? ' active' : ''}`}
                  onClick={() => setActiveThumb(i)}
                >
                  <Image src={src} alt="" fill style={{ objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          {book.book_genre && <span className="product-genre">{book.book_genre}</span>}
          
          <h1 className="product-title">{book.title?.rendered}</h1>
          
          <p className="product-author">af {book.book_author}</p>
          
          {book.publishingDate && (
            <p className="product-pubdate">Udgivet: {book.publishingDate}</p>
          )}
          
          {book.book_posted_by && (
            <p className="product-posted-by">Sælges af: {book.book_posted_by}</p>
          )}
          
          <p className="product-desc">
            {book.book_description}
          </p>
          
          <div className="product-price">{book.book_price} kr</div>
          
          <div className="button-group" style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
            <button
              className={`add-to-cart${added ? ' added' : ''}`}
              onClick={handleAddToCart}
            >
              {added ? "Tilføjet!" : "Tilføj til kurv"}
            </button>

            {/* Edit Button */}
            <Link href={`/books/edit/${slug}`} className="edit-book-btn" style={{ padding: '10px', background: '#eee', borderRadius: '5px', textDecoration: 'none', color: '#333' }}>
              Rediger bog
            </Link>
          </div>
          
          <ConditionMeter value={book.book_condition || 80} />
        </div>
      </div>
    </div>
  )
}
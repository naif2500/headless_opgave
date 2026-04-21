
'use client'

import { useEffect, useState, use } from 'react'
import { getBookBySlug } from '@/lib/api'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'

function conditionColor(val) {
  if (val >= 70) return '#3B6D11'
  if (val >= 40) return '#BA7517'
  return '#A32D2D'
}

function conditionLabel(val) {
  if (val >= 85) return 'As good as new'
  if (val >= 70) return 'Very good'
  if (val >= 50) return 'Good'
  if (val >= 30) return 'Fair'
  return 'Poor'
}

function ConditionMeter({ value }) {
  const num = parseInt(value) || 0
  const color = conditionColor(num)
  return (
    <div className="condition-wrapper">
      <div className="condition-label">
        <span>Book condition</span>
        <span className="condition-text" style={{ color }}>{conditionLabel(num)}</span>
      </div>
      <div className="condition-bar-bg">
        <div className="condition-bar-fill" style={{ width: `${num}%`, background: color }} />
      </div>
      <div className="condition-scale">
        <span>Poor</span>
        <span>As good as new</span>
      </div>
    </div>
  )
}

export default function BookPage({ params }) {
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

  if (loading) return <div className="page"><div className="loading">Loading...</div></div>
  if (!book) return <div className="page"><p>Book not found.</p></div>

  const images = book.featuredImage?.node?.sourceUrl
    ? [book.featuredImage.node.sourceUrl]
    : []

  return (
    <div className="page">
      <div className="breadcrumbs">
        <Link href="/" className="breadcrumb-link">Home</Link>
        <span className="breadcrumb-sep">/</span>
        <Link href="/books" className="breadcrumb-link">Books</Link>
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
          {book.genre && <span className="product-genre">{book.genre}</span>}
          <h1 className="product-title">{book.title}</h1>
          <p className="product-author">by {book.authorName}</p>
          {book.publishingDate && (
            <p className="product-pubdate">Published: {book.publishingDate}</p>
          )}
          <p className="product-desc">
            {book.description || (book.excerpt && book.excerpt.replace(/<[^>]*>/g, ''))}
          </p>
          <div className="product-price">{book.price} kr</div>
          <button
            className={`add-to-cart${added ? ' added' : ''}`}
            onClick={handleAddToCart}
          >
            {added ? '✓ Added to cart' : 'Add to cart'}
          </button>
          <ConditionMeter value={book.condition || 80} />
        </div>
      </div>
    </div>
  )
}

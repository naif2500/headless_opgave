'use client'

import { useCart } from '../context/CartContext'
import Link from 'next/link'
import Image from 'next/image'

export default function CartPage() {
  const { cart, updateQty, removeItem, cartTotal } = useCart()
  const shipping = cartTotal > 200 ? 0 : 49

  return (
    <div className="page">
      <h1 className="page-title">Din kurv</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <p>Din kurv er tom</p>
          <Link href="/books" className="hero-cta">Gennemse bøger</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div>
            {cart.map(item => (
              <div key={item.book.id} className="cart-item">
                <div className="cart-item-img">
                  {item.book.featuredImage?.node?.sourceUrl ? (
                    <Image
                      src={item.book.featuredImage.node.sourceUrl}
                      alt={item.book.title}
                      fill
                      style={{ objectFit: 'cover', borderRadius: '4px' }}
                    />
                  ) : (
                    <span style={{ fontSize: '1.8rem' }}>📖</span>
                  )}
                </div>
                <div className="cart-item-info">
                  <div className="cart-item-title">{item.book.title}</div>
                  <div className="cart-item-author">{item.book.authorName}</div>
                  <div className="qty-control">
                    <button className="qty-btn" onClick={() => updateQty(item.book.id, item.qty - 1)}>−</button>
                    <span className="qty-num">{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.book.id, item.qty + 1)}>+</button>
                  </div>
                </div>
                <span className="cart-item-price">{item.book.price * item.qty} kr</span>
                <button className="remove-btn" onClick={() => removeItem(item.book.id)}>✕</button>
              </div>
            ))}
          </div>

          <div className="order-summary">
            <div className="summary-title">Ordresammendrag</div>
            {cart.map(item => (
              <div key={item.book.id} className="summary-row">
                <span>{item.book.title} × {item.qty}</span>
                <span>{item.book.price * item.qty} kr</span>
              </div>
            ))}
            <div className="summary-row">
              <span>Levering</span>
              <span>{shipping === 0 ? 'Gratis' : `${shipping} kr`}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{cartTotal + shipping} kr</span>
            </div>
            {shipping > 0 && (
              <p className="shipping-note">Gratis levering på ordrer over 200 kr</p>
            )}
            <Link href="/checkout" className="checkout-btn">Gå til kassen</Link>
          </div>
        </div>
      )}
    </div>
  )
}
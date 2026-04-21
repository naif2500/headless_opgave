'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const { cart, cartTotal, clearCart } = useCart()
  const router = useRouter()
  const shipping = cartTotal > 200 ? 0 : 49

  function handleOrder() {
    clearCart()
    router.push('/checkout/success')
  }

  return (
    <div className="page">
      <h1 className="page-title">Checkout</h1>

      {/* Steps */}
      <div className="steps">
        {['Delivery', 'Payment', 'Review'].map((label, i) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
            <div className={`step ${step > i + 1 ? 'done' : step === i + 1 ? 'active' : 'pending'}`}>
              <div className="step-num">{step > i + 1 ? '✓' : i + 1}</div>
              <span>{label}</span>
            </div>
            {i < 2 && <div className="step-line" />}
          </div>
        ))}
      </div>

      <div className="checkout-layout">
        <div>
          {step === 1 && (
            <div className="form-section">
              <div className="form-section-title">Delivery information</div>
              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label">First name</label>
                  <input className="form-input" placeholder="Anna" />
                </div>
                <div className="form-field">
                  <label className="form-label">Last name</label>
                  <input className="form-input" placeholder="Jensen" />
                </div>
                <div className="form-field full">
                  <label className="form-label">Address</label>
                  <input className="form-input" placeholder="Østerbrogade 42" />
                </div>
                <div className="form-field">
                  <label className="form-label">Postal code</label>
                  <input className="form-input" placeholder="2100" />
                </div>
                <div className="form-field">
                  <label className="form-label">City</label>
                  <input className="form-input" placeholder="Copenhagen" />
                </div>
                <div className="form-field full">
                  <label className="form-label">Email</label>
                  <input className="form-input" placeholder="anna@example.com" type="email" />
                </div>
              </div>
              <button className="checkout-btn" onClick={() => setStep(2)}>Continue to payment</button>
            </div>
          )}

          {step === 2 && (
            <div className="form-section">
              <div className="form-section-title">Payment details</div>
              <div className="form-grid">
                <div className="form-field full">
                  <label className="form-label">Card number</label>
                  <input className="form-input" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="form-field">
                  <label className="form-label">Expiry</label>
                  <input className="form-input" placeholder="MM/YY" />
                </div>
                <div className="form-field">
                  <label className="form-label">CVV</label>
                  <input className="form-input" placeholder="123" />
                </div>
                <div className="form-field full">
                  <label className="form-label">Name on card</label>
                  <input className="form-input" placeholder="Anna Jensen" />
                </div>
              </div>
              <button className="checkout-btn" onClick={() => setStep(3)}>Review order</button>
            </div>
          )}

          {step === 3 && (
            <div className="form-section">
              <div className="form-section-title">Review your order</div>
              {cart.map(item => (
                <div key={item.book.id} className="review-item">
                  <span style={{ fontSize: '1.2rem' }}>📖</span>
                  <div style={{ flex: 1 }}>
                    <div className="review-item-title">{item.book.title}</div>
                    <div className="review-item-qty">Qty: {item.qty}</div>
                  </div>
                  <div className="review-item-price">{item.book.price * item.qty} kr</div>
                </div>
              ))}
              <button className="checkout-btn" style={{ marginTop: '1.5rem' }} onClick={handleOrder}>
                Place order
              </button>
            </div>
          )}
        </div>

        <div className="order-summary">
          <div className="summary-title">Order summary</div>
          {cart.map(item => (
            <div key={item.book.id} className="summary-row">
              <span>{item.book.title} × {item.qty}</span>
              <span>{item.book.price * item.qty} kr</span>
            </div>
          ))}
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `${shipping} kr`}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>{cartTotal + shipping} kr</span>
          </div>
        </div>
      </div>
    </div>
  )
}
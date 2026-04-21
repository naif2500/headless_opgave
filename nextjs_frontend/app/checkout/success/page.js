import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className="success-page">
      <h1 className="success-title">Order confirmed!</h1>
      <p className="success-sub">
        Thank you for your purchase. You will receive a confirmation email shortly with your order details.
      </p>
      <Link href="/books" className="hero-cta">Continue shopping</Link>
    </div>
  )
}
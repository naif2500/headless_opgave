import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className="success-page">
      <h1 className="success-title">Ordre bekræftet!</h1>
      <p className="success-sub">
        Tak for dit køb. Du vil modtage en bekræftelsesemail snart med dine ordredetaljer.
      </p>
      <Link href="/books" className="hero-cta">Fortsæt med at handle</Link>
    </div>
  )
}
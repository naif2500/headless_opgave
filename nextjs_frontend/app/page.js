import { getBooks } from "../lib/api";
import Link from "next/link";
import Image from "next/image";

// 1. Helper to safely get the image URL
const getImageUrl = (book) => {
  if (!book._embedded) return null;
  const media = book._embedded['wp:featuredmedia'];
  if (media && media[0] && media[0].source_url) {
    return media[0].source_url;
  }
  return null;
};

export default async function Home() {
  const books = await getBooks();
  // Ensure we have data before slicing
  const featured = Array.isArray(books) ? books.slice(0, 5) : [];
  const popular = Array.isArray(books) ? books.slice(5, 10) : [];

  return (
    <main>
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-tag">Kuratérte brugte bøger</div>
          <h1 className="hero-title">Historier værd at læse, to gange.</h1>
          <p className="hero-sub">
            Opdag pre-loved bøger i fremragende stand — håndplukket til
            nysgerrige sind.
          </p>
          <Link href="/books" className="hero-cta">
            Gennemse samling
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Udvalgte bøger</h2>
          <Link href="/books" className="section-link">
            Se alle →
          </Link>
        </div>
        <div className="carousel">
          {featured.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {popular.length > 0 && (
        <section className="section section-alt">
          <div className="section-header">
            <h2 className="section-title">Populære valg</h2>
            <Link href="/books" className="section-link">
              Se alle →
            </Link>
          </div>
          <div className="carousel">
            {popular.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

// 2. Updated BookCard with correct field names
function BookCard({ book }) {
  const imageUrl = getImageUrl(book);

  return (
    <Link href={`/books/${book.slug}`} className="book-card">
      <div className="book-card-img">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={book.title.rendered}
            fill
            style={{ objectFit: "cover" }}
          />
        ) : (
          <span className="book-placeholder">📖</span>
        )}
      </div>
      <div className="book-card-body">
        <div className="book-card-title">{book.title.rendered}</div>
        <div className="book-card-author">{book.book_author}</div>
        <div className="book-card-footer">
          <span className="book-card-price">{book.book_price} kr</span>
          <span className="book-card-genre">{book.book_genre}</span>
        </div>
      </div>
    </Link>
  );
}
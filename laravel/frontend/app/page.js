import { getBooks } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
    const data = await getBooks();
    const books = data.data;
    const featured = books.slice(0, 5);
    const popular = books.slice(5, 10);

    console.log("featured", featured);

    return (
        <main>
            {/* Hero */}
            <section className="hero">
                <div className="hero-overlay">
                    <div className="hero-tag">Kuratérte brugte bøger</div>
                    <h1 className="hero-title">
                        Historier værd at læse, to gange.
                    </h1>
                    <p className="hero-sub">
                        Opdag pre-loved bøger i fremragende stand — håndplukket
                        til nysgerrige sind.
                    </p>
                    <Link href="/books" className="hero-cta">
                        Gennemse samling
                    </Link>
                </div>
            </section>

            {/* Featured carousel */}
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

            {/* Popular carousel */}
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

function BookCard({ book }) {
    return (
        <Link href={`/books/${book.id}`} className="book-card">
            <div className="book-card-img">
                {book.image ? (
                    <Image
                        src={book.image}
                        alt={book.title}
                        fill
                        style={{ objectFit: "cover" }}
                    />
                ) : (
                    <span className="book-placeholder">📖</span>
                )}
            </div>
            <div className="book-card-body">
                <div className="book-card-title">{book.title}</div>
                {book.author.map((author) => (
                    <div key={author.id} className="book-card-author">
                        {author.name}
                    </div>
                ))}
                <div className="book-card-footer">
                    <span className="book-card-price">{book.price} kr</span>
                    <span className="book-card-genre">{book.genre.name}</span>
                </div>
            </div>
        </Link>
    );
}

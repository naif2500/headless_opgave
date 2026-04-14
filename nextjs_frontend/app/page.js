import { getBooks } from '../lib/api'; // Ensure this path matches your file structure

export default async function BookstorePage() {
  const books = await getBooks();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">📚 The Headless Bookstore</h1>
        <p className="text-gray-600 mt-2">Powered by WordPress & Next.js</p>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <article key={book.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform">
            {/* Image Section */}
            <div className="h-64 bg-gray-200 relative">
              {book.featuredImage?.node?.sourceUrl ? (
                <img 
                  src={book.featuredImage.node.sourceUrl} 
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No Cover Image
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{book.title}</h2>
              <p className="text-sm text-blue-600 font-semibold uppercase tracking-wider mb-4">
                By {book.authorName || 'Unknown Author'}
              </p>
              
              <div className="flex items-center justify-between mt-4">
                <span className="text-2xl font-bold text-green-600">
                  {book.price ? `${book.price}` : 'Price TBD'}
                </span>
                <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                  View Details
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import { getBooks } from "../services/bookService";
import { Toaster, toast } from "react-hot-toast";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (err) {
        toast.error(`Failed to fetch books. - ${err}`);
        setError(`Failed to fetch books. - ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl font-medium text-red-600">{error}</div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl font-medium text-gray-700">No books available. Please add some!</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Book List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{book.title}</h3>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Author:</span> {book.author}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Category:</span> {book.category}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Price:</span> ${book.price.toFixed(2)}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Rating:</span> {book.rating.toFixed(1)}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Stock:</span> {book.stock}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Genres:</span> {book.genres.join(", ")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default BookList;

import { useEffect, useState } from "react";
import { getBooks } from "../services/bookService";
import "./BookList.css";

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
        setError(`Failed to fetch books. Please try again later - ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="container">
      {loading ? (
        <p className="message">Loading...</p>
      ) : error ? (
        <p className="message error">{error}</p>
      ) : books.length === 0 ? (
        <p className="message">No books available. Please add some!</p>
      ) : (
        <div className="book-list">
          <h1 className="title">Book List</h1>
          <div className="book-grid">
            {books.map((book, index) => (
              <div key={index} className="book-item">
                <h3 className="book-title">{book.title}</h3>
                <p>
                  <strong>Author:</strong> {book.author}
                </p>
                <p>
                  <strong>Category:</strong> {book.category}
                </p>
                <p>
                  <strong>Price:</strong> {book.price}
                </p>
                <p>
                  <strong>Rating:</strong> {book.rating}
                </p>
                <p>
                  <strong>Stocks:</strong> {book.stock}
                </p>
                <p>
                  <strong>Genre:</strong> {book.genres.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;

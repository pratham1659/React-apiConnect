import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getBookById, updateBook } from "../services/bookService";
import { Toaster, toast } from "react-hot-toast";

const BookUpdate = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(
    location.state?.book || {
      title: "",
      author: "",
      category: "",
      price: "",
      stock: "",
      rating: "",
      genres: [],
    }
  );

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const book = await getBookById(id);
        setFormData({
          ...book,
          genres: Array.isArray(book.genres) ? book.genres : [],
        });
        console.log("Fetched book:", book); // Log the response
        setFormData(book);
      } catch (error) {
        toast.error(`Failed to fetch book details - ${error}`);
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenresChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      genres: value.split(",").map((genre) => genre.trim()),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBook(id, formData);
      toast.success("Book updated successfully");
      setTimeout(() => navigate("/booklist"), 1000);
    } catch (error) {
      toast.error(`Failed to update book - ${error}`);
    }
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Edit Book</h2>

      {/* Title Field */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter book title"
          className="w-full p-2 border rounded mt-1"
        />
      </div>
      {/* Author Field */}
      <div className="mb-4">
        <label htmlFor="author" className="block text-sm font-medium text-gray-700">
          Author
        </label>
        <input
          type="text"
          name="author"
          id="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Enter author's name"
          className="w-full p-2 border rounded mt-1"
        />
      </div>
      {/* Category Field */}
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <input
          type="text"
          name="category"
          id="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Enter book category"
          className="w-full p-2 border rounded mt-1"
        />
      </div>
      {/* Price Field */}
      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price
        </label>
        <input
          type="number"
          name="price"
          id="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Enter book price"
          className="w-full p-2 border rounded mt-1"
        />
      </div>

      {/* Stock Field */}
      <div className="mb-4">
        <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
          Stock
        </label>
        <input
          type="number"
          name="stock"
          id="stock"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Enter stock quantity"
          className="w-full p-2 border rounded mt-1"
        />
      </div>

      {/* Rating Field */}
      <div className="mb-4">
        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
          Rating
        </label>
        <input
          type="number"
          name="rating"
          id="rating"
          value={formData.rating}
          onChange={handleChange}
          placeholder="Enter book rating (1-5)"
          className="w-full p-2 border rounded mt-1"
          step={0.1}
          min="1"
          max="5"
        />
      </div>

      {/* Genres Field */}
      <div className="mb-4">
        <label htmlFor="genres" className="block text-sm font-medium text-gray-700">
          Genres
        </label>
        <input
          type="text"
          name="genres"
          id="genres"
          value={Array.isArray(formData.genres) ? formData.genres.join(", ") : ""}
          onChange={handleGenresChange}
          placeholder="Enter genres (comma separated)"
          className="w-full p-2 border rounded mt-1"
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Update Book
      </button>
      <Toaster position="top-right" reverseOrder={false} />
    </form>
  );
};

export default BookUpdate;

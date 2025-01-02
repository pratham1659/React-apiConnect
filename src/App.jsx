import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
        <nav className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between">
              <div className="flex space-x-7">
                <div>
                  <Link to="/" className="flex items-center py-4 px-2">
                    <span className="font-semibold text-gray-500 text-lg">Book Management</span>
                  </Link>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-1">
                <Link to="/" className="py-4 px-2 text-gray-500 font-semibold hover:text-purple-500 transition duration-300">
                  Home
                </Link>
                <Link to="/books" className="py-4 px-2 text-gray-500 font-semibold hover:text-purple-500 transition duration-300">
                  Book List
                </Link>
                <Link to="/add-book" className="py-4 px-2 text-gray-500 font-semibold hover:text-purple-500 transition duration-300">
                  Add Book
                </Link>
              </div>
              <div className="md:hidden flex items-center">
                <button className="outline-none mobile-menu-button" onClick={toggleMenu}>
                  <svg
                    className="w-6 h-6 text-gray-500 hover:text-purple-500"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
            <Link to="/" className="block py-2 px-4 text-sm hover:bg-purple-500 hover:text-white transition duration-300">
              Home
            </Link>
            <Link to="/books" className="block py-2 px-4 text-sm hover:bg-purple-500 hover:text-white transition duration-300">
              Book List
            </Link>
            <Link to="/add-book" className="block py-2 px-4 text-sm hover:bg-purple-500 hover:text-white transition duration-300">
              Add Book
            </Link>
          </div>
        </nav>

        <main className="container mx-auto mt-8 px-4">
          <Routes>
            <Route
              path="/"
              element={
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Book Management App</h1>
                  <p className="text-xl text-gray-600">Manage your book collection with ease</p>
                </div>
              }
            />
            <Route path="/books" element={<BookList />} />
            <Route path="/add-book" element={<BookForm />} />
          </Routes>
        </main>

        <footer className="bg-white shadow-lg mt-8">
          <div className="max-w-6xl mx-auto py-4 px-4 text-center text-gray-500">© 2023 Book Management App. All rights reserved.</div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

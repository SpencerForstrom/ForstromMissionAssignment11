import { useEffect, useState } from 'react';
import { Bookstore } from './types/Bookstore';
import { useCart } from './context/CartContext'; // 👈 import this at the top
import { useLocation } from 'react-router-dom'; // for "Continue Shopping" feature
import CartSummary from './components/CartSummary';


function BookstoreList() {
  const [bookstore, setBookstore] = useState<Bookstore[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const [sortAsc, setSortAsc] = useState(true); // Currently not sent to backend
  const { addToCart } = useCart();
  const location = useLocation(); // used to save return path

  // Fetch list of categories for the filter dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('https://localhost:7245/api/Bookstore/categories');
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  // Fetch list of books based on selected category, page, and page size
  useEffect(() => {
    const fetchBookstore = async () => {
      const res = await fetch(
        `https://localhost:7245/api/Bookstore?category=${selectedCategory}&page=${page}&pageSize=${pageSize}`
      );
      const data = await res.json();
      setBookstore(data.books);
      setTotalBooks(data.totalBooks);
    };

    fetchBookstore();
  }, [selectedCategory, page, pageSize]);

  return (
    <>
      <h1>Bookstore</h1>
      <CartSummary />
      <br />

      {/* Category Filter Dropdown */}
      <div className="mb-3">
        <label className="form-label">Filter by Category:</label>
        <select
          className="form-select"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setPage(1); // Reset to first page when filter changes
          }}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Button */}
      <button
        className="btn btn-outline-primary mb-3"
        onClick={() => setSortAsc(!sortAsc)}
      >
        Sort by Title: {sortAsc ? 'A → Z' : 'Z → A'}
      </button>

      {/* Book Cards */}
      {bookstore
    .sort((a, b) => {
      if (a.title < b.title) return sortAsc ? -1 : 1;
      if (a.title > b.title) return sortAsc ? 1 : -1;
      return 0;
    })
    .map((book) => (
      <div id="bookCard" key={book.bookID} className="card mb-3 p-3">
        <h3 className="card-title">{book.title}</h3>
        <div className="card-body">
          <ul className="list-unstyled">
            <li><strong>Book Title:</strong> {book.title}</li>
            <li><strong>Author:</strong> {book.author}</li>
            <li><strong>Publisher:</strong> {book.publisher}</li>
            <li><strong>ISBN:</strong> {book.isbn}</li>
            <li><strong>Classification:</strong> {book.classification}</li>
            <li><strong>Category:</strong> {book.category}</li>
            <li><strong>Number of Pages:</strong> {book.pageCount}</li>
            <li><strong>Price:</strong> ${book.price.toFixed(2)}</li>
          </ul>

          <button
            className="btn btn-sm btn-outline-success mt-2"
            onClick={() => {
              console.log('Adding book to cart:', book.title);
            
              addToCart({
                bookID: book.bookID,
                title: book.title,
                price: book.price
              });
            
              sessionStorage.setItem('returnPath', location.pathname + location.search);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    ))}
      <br />

      {/* Pagination Buttons */}
      <div className="btn-group mb-3">
        {[...Array(Math.ceil(totalBooks / pageSize)).keys()].map((num) => (
          <button
            key={num + 1}
            className={`btn btn-outline-secondary ${page === num + 1 ? 'active' : ''}`}
            onClick={() => setPage(num + 1)}
          >
            {num + 1}
          </button>
        ))}
      </div>

      {/* Results Per Page Selector */}
      <div className="mb-3">
        <label>
          Results per page:
          <select
            className="form-select w-auto d-inline ms-2"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1); // Reset to first page on page size change
            }}
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </label>
      </div>
    </>
  );
}

export default BookstoreList;


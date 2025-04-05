import { useEffect, useState } from 'react';
import { Bookstore } from '../types/Bookstore';
import { useCart } from '../context/CartContext';
import { useLocation } from 'react-router-dom'; // This is for "Continue Shopping" feature
import CartSummary from './CartSummary';
import { Toast, ToastContainer } from 'react-bootstrap'; // THIS IS THE TOAST FEATURE
import 'bootstrap/dist/css/bootstrap.min.css'; // ✅ Still required
import { fetchBooks } from '../api/BookstoreAPI';


function BookstoreList() {
  const [bookstore, setBookstore] = useState<Bookstore[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const [sortAsc, setSortAsc] = useState(true);
  // part of the TOAST FEATURE
  const [showToast, setShowToast] = useState(false);
  const { addToCart } = useCart();
  const location = useLocation(); // used to save return path
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // This code is meant to fetch list of categories for the filter dropdown
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     const res = await fetch('https://localhost:7245/api/Bookstore/categories');
  //     const data = await res.json();
  //     setCategories(data);
  //   };
  //   fetchCategories();
  // }, []);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(pageSize, page, selectedCategory);

        setBookstore(data.books);
        setCategories(data.categories);
        setTotalBooks(data.totalNumBooks);

      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
  
    loadBooks();
  }, [pageSize, page, selectedCategory]);
  

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p className="text-red-500">Error {error}</p>;



  // What this does is fetch the list of books based on selected category, page, and page size
  // useEffect(() => {
  //   const fetchBookstore = async () => {
  //     const res = await fetch(
  //       `https://localhost:7245/api/Bookstore?category=${selectedCategory}&page=${page}&pageSize=${pageSize}`
  //     );
  //     const data = await res.json();
  //     setBookstore(data.books);
  //     setTotalBooks(data.totalBooks);
  //   };

  //   fetchBookstore();
  // }, [selectedCategory, page, pageSize]);

  return (
    <>
      {/* THIS IS THE FIRST BOOTSTRAP FEATURE I ADDED - Collapsing filters that can be toggled */}
      <h1>Bookstore</h1>
      <CartSummary />
      <br />
      <button
        className="btn btn-outline-secondary mb-2"
        data-bs-toggle="collapse"
        data-bs-target="#filterSection">
        Toggle Filters
      </button>

      <div className="collapse mb-3" id="filterSection">
        <div className="card card-body">
          {/* Filter dropdown */}
          <div className="mb-3">
            <label className="form-label">Filter by Category:</label>
            <select
              className="form-select"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Sort button */}
          <button
            className="btn btn-outline-primary"
            onClick={() => setSortAsc(!sortAsc)}
          >
            Sort by Title: {sortAsc ? 'A → Z' : 'Z → A'}
          </button>
        </div>
      </div>

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
              setShowToast(true);
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
  {/* THIS IS THE SECOND BOOTSTRAP FEATURE I ADDED - toast pop ups for adding items to the cart */}
  <ToastContainer position="bottom-end" className="p-3">
  <Toast
    bg="success"
    show={showToast}
    onClose={() => setShowToast(false)}
    delay={2000}
    autohide
  >
    <Toast.Body className="text-white">✅ Book added to cart!</Toast.Body>
  </Toast>
</ToastContainer>
    </>
  );
}

export default BookstoreList;


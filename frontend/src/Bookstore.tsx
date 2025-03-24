import { useEffect, useState } from "react";
import { Bookstore } from './types/Bookstore';

// This component displays a list of books retrieved from the backend API
function BookstoreList() {
    // Stores the list of books
  const [bookstore, setBookstore] = useState<Bookstore[]>([]);
    // controls the number of books displayed per page
  const [pageSize, setPageSize] = useState<number>(10);
    // toggles sorting direction (ascending vs. descending)
  const [sortAsc, setSortAsc] = useState(true);

  // I'm pretty sure the useEffect fetches data from the API whenever pageSize changes
  useEffect(() => {
    const fetchBookstore = async () => {
      const response = await fetch(
        `https://localhost:7245/api/Bookstore?pageCount=${pageSize}`
      );
      const data = await response.json();
      setBookstore(data);
    };

    fetchBookstore();
  }, [pageSize]);

  // With assistance from chat, I know that this sorts the books by title (A–Z or Z–A) based on sortAsc state
  const sortedBooks = [...bookstore].sort((a, b) => {
    if (a.title < b.title) return sortAsc ? -1 : 1;
    if (a.title > b.title) return sortAsc ? 1 : -1;
    return 0;
    });

  // This is what we see on the react page
  return (
    <>
      <h1>Bookstore</h1>
      <br />

      <button
        className="btn btn-outline-primary mb-3"
        onClick={() => setSortAsc(!sortAsc)}>
        Sort by Title: {sortAsc ? 'A → Z' : 'Z → A'}
      </button>

      {sortedBooks.map((book) => (
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
          </div>
        </div>
      ))}


      <br />
      <label>
        Results per page:
        <select className="form-select w-auto d-inline ms-2" value={pageSize} onChange={(b) => setPageSize(Number(b.target.value))}>
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </label>
    </>
  );
}

export default BookstoreList;

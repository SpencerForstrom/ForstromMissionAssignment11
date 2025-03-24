import { useEffect, useState } from "react";
import { Bookstore } from './types/Bookstore';

function BookstoreList() {
  const [bookstore, setBookstore] = useState<Bookstore[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);

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

  return (
    <>
      <h1>Bookstore</h1>
      <br />
      {bookstore.map((book) => (
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
        <select value={pageSize} onChange={(b) => setPageSize(Number(b.target.value))}>
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </label>
    </>
  );
}

export default BookstoreList;

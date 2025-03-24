import { useEffect, useState } from "react";
import { Bookstore } from './types/Bookstore';

function BookstoreList() {
  const [bookstore, setBookstore] = useState<Bookstore[]>([]);

  useEffect(() => {
    const fetchBookstore = async () => {
        const response = await fetch('https://localhost:7245/api/Bookstore');
        const data = await response.json();
        setBookstore(data);
    };

    fetchBookstore();
  }, []);

  return (
    <>
      <h1>Bookstore</h1>
      <br />
      {bookstore.map((book) => (
        <div id="bookCard" key={book.bookID}>
          <h3>{book.title}</h3>
          <ul>
            <li>Book Title: {book.title}</li>
            <li>Author: {book.author}</li>
            <li>Publisher: {book.publisher}</li>
            <li>ISBN: {book.isbn}</li>
            <li>Classification: {book.classification}</li>
            <li>Category: {book.category}</li>
            <li>Number of Pages: {book.pageCount}</li>
            <li>Price: ${book.price.toFixed(2)}</li>
          </ul>
        </div>
      ))}
    </>
  );
}

export default BookstoreList;

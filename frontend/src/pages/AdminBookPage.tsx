import { useEffect, useState } from 'react';
import { Bookstore } from '../types/Bookstore';
import { deleteBook, fetchBooks } from '../api/BookstoreAPI';
import { NewBookForm } from '../components/NewBookForm'
import Pagination from '../components/Pagination'; // Ensure you import your custom Pagination component
import { EditBookForm } from '../components/EditBookForm';

const AdminProjectPage = () => {
  const [bookstore, setBookstore] = useState<Bookstore[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Bookstore | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks(pageSize, page, '');
        setBookstore(data.books);
        setTotalBooks(data.totalNumBooks);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [page, pageSize]);

  const handleDelete = async (bookID: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this book?');
    if (!confirmDelete) return;

    try {
        await deleteBook(bookID);
        setBookstore(bookstore.filter((p) => p.bookID !== bookID));
    } catch (error) {
        alert('Failed to delete project. Please try again.')
    }
  };

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <h1>Admin - Books</h1>

        {!showForm && (
            <button className="btn btn-success mb-3"
            onClick={() => setShowForm(true)}
            >Add Book</button>
        )}


        {showForm && (
            <NewBookForm 
                onSuccess={() => {
                    setShowForm(false); 
                    fetchBooks(pageSize, page, '').then((data) => 
                        setBookstore(data.books)
                );
            }}
            onCancel={() => setShowForm(false)}
            />
        )}

        {editingBook && (
            <EditBookForm book={editingBook} onSuccess={() => {
                setEditingBook(null);
                fetchBooks(pageSize,page,'').then((data) => setBookstore(data.books));
            }}
            onCancel={() => setEditingBook(null)}
            />
        )}


      <table className="table table-bordered table-striped">
        <thead className ="table-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
            <th>Classification</th>
            <th>Category</th>
            <th>Page Count</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookstore.map((p) => (
            <tr key={p.bookID}>
              <td>{p.bookID}</td>
              <td>{p.title}</td>
              <td>{p.author}</td>
              <td>{p.publisher}</td>
              <td>{p.isbn}</td>
              <td>{p.classification}</td>
              <td>{p.category}</td>
              <td>{p.pageCount}</td>
              <td>${p.price.toFixed(2)}</td>
              <td>
                <button 
                className="btn btn-primary btn-sm w-100 mb-1" 
                onClick={() => setEditingBook(p)}
                >Edit</button>

                <button className="btn btn-danger btn-sm w-100 mb-1" 
                onClick={() => handleDelete(p.bookID)}
                >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={page}
        totalPages={Math.ceil(totalBooks / pageSize)}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPage(1);
        }}
      />
    </div>
  );
};

export default AdminProjectPage;
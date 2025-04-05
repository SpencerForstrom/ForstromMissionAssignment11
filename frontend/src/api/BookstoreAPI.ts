import { Bookstore } from '../types/Bookstore';

// Define the shape of the data returned from the API
interface FetchBookstoreResponse {
  books: Bookstore[];
  totalNumBooks: number;
  categories: string[];
}

const API_URL = 'https://bookstore-forstrom-backend2-a6fzd0dufjeffkhj.eastus-01.azurewebsites.net/api';

// Export a function that fetches books with optional filtering by category
export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  selectedCategory: string
): Promise<FetchBookstoreResponse> => {
  try {
    // Fetch both the books and categories
    const [booksRes, categoriesRes] = await Promise.all([
      fetch(`${API_URL}/Bookstore?category=${selectedCategory}&page=${pageNum}&pageSize=${pageSize}`),
      fetch(`${API_URL}/Bookstore/categories`)
    ]);

    if (!booksRes.ok || !categoriesRes.ok) {
      throw new Error('Failed to fetch data');
    }

    const booksData = await booksRes.json();
    const categoriesData = await categoriesRes.json();

    return {
      books: booksData.books,
      totalNumBooks: booksData.totalBooks,
      categories: categoriesData
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const addBook = async (newBook: Bookstore): Promise<Bookstore> => {
    try {
        const response = await fetch(`${API_URL}/Bookstore/AddBook`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBook)
            });

            if (!response.ok) {
                throw new Error('Failed to add project');
            }

            return await response.json();
        } catch (error) {
            console.error('Error adding project', error);
            throw error;
        }
    };

export const updateBook = async (bookID: number, updatedBook: Bookstore) : Promise<Bookstore> => {
    try {
        const response = await fetch(`${API_URL}/Bookstore/UpdateBook/${bookID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBook)
            });

            return await response.json();
        } catch (error) {
            console.error('Error updating project', error);
            throw error;
        }
    };


export const deleteBook = async (bookID: number): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/Bookstore/DeleteBook/${bookID}`,
            {
                method: 'DELETE',
            });

        if (!response.ok) {
            throw new Error('Failed to delete book');
        }
    } catch (error) {
        console.error('Error deleting project:', error);
        throw error;
    }
}
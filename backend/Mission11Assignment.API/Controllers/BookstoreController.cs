using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11Assignment.API.Data;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Mission11Assignment.API.Data;
using System.Linq;

namespace Mission11Assignment.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookstoreController : ControllerBase
    {
        private readonly BookDbContext _bookstoreContext;

        public BookstoreController(BookDbContext temp)
        {
            _bookstoreContext = temp;
        }

        // GET: api/bookstore
        [HttpGet]
        public IActionResult GetBooks(string? category, int page = 1, int pageSize = 5)
        {
            var query = _bookstoreContext.Books.AsQueryable();

            if (!string.IsNullOrEmpty(category))
            {
                query = query.Where(b => b.Category == category);
            }

            var totalBooks = query.Count();

            var books = query
                .OrderBy(b => b.Title)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(new
            {
                books,
                totalBooks
            });
        }

        // GET: api/bookstore/categories
        [HttpGet("categories")]
        public IActionResult GetCategories()
        {
            var categories = _bookstoreContext.Books
                .Select(b => b.Category)
                .Distinct()
                .OrderBy(c => c)
                .ToList();

            return Ok(categories);
        }

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _bookstoreContext.Books.Add(newBook);
            _bookstoreContext.SaveChanges();
            return Ok(newBook);

        }

        [HttpPut("UpdateBook/{BookID}")]
        public IActionResult UpdateBook(int BookID, [FromBody] Book updatedBook)
        {
            var existingBook = _bookstoreContext.Books.Find(BookID);

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;

            _bookstoreContext.Books.Update(existingBook);
            _bookstoreContext.SaveChanges();

            return Ok(existingBook);
        }

        [HttpDelete("DeleteBook/{BookID}")]
        public IActionResult DeleteBook(int BookID)
        {
            var book = _bookstoreContext.Books.Find(BookID);

            if (book == null)
            {
                return NotFound(new { message = "Project is not found" });
            }

            _bookstoreContext.Books.Remove(book);
            _bookstoreContext.SaveChanges();

            return NoContent();
        }
    }
}

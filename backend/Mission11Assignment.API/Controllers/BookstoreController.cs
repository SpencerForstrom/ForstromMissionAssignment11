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
    }
}

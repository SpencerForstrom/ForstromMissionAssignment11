using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11Assignment.API.Data;
using System.Collections.Generic;
using System.Linq;

namespace Mission11Assignment.API.Controllers
{
    // This controller handles API requests related to the Bookstore.
    // The base route for this controller is "api/bookstore".
    [Route("api/[controller]")]
    [ApiController]
    public class BookstoreController : ControllerBase
    {
        private BookDbContext _bookstoreContext;

        // Reference to the BookDbContext
        public BookstoreController(BookDbContext temp)
        {
            _bookstoreContext = temp;
        }

        // This code returns a list of books from the database.
        [HttpGet]
        public IEnumerable<Book> Get(int pageCount = 10)
        {
            return _bookstoreContext.Books.Take(pageCount).ToList(); // or just .ToList()
        }
    }
}

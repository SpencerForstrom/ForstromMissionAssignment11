using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11Assignment.API.Data;
using System.Collections.Generic;
using System.Linq;

namespace Mission11Assignment.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookstoreController : ControllerBase
    {
        private BookDbContext _bookstoreContext;

        public BookstoreController(BookDbContext temp)
        {
            _bookstoreContext = temp;
        }

        [HttpGet]
        public IEnumerable<Book> Get(int pageCount = 10)
        {
            return _bookstoreContext.Books.Take(pageCount).ToList(); // or just .ToList()
        }
    }
}

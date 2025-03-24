using Microsoft.EntityFrameworkCore;

namespace Mission11Assignment.API.Data
{
    // If I'm not mistaken, the BookDbContext class provides a kind of bridge between your C# models and the SQLite database.
    // And tt inherits from Entity Framework's DbContext, enabling querying and saving of data.
    public class BookDbContext : DbContext
    {
        public BookDbContext(DbContextOptions<BookDbContext> options) : base(options) { }

        public DbSet<Book> Books { get; set; }
    }
}


using System.ComponentModel.DataAnnotations;

namespace Mission11Assignment.API.Data
{
    // This is the Book class and it defines the structure of the "Books" table in the database.
    public class Book
    {
        // Primary key for the Book table
        [Key]
        public int BookID { get; set; }

        // Required:
        [Required]
        public string Title { get; set; }

        [Required]
        public string Author { get; set; }

        [Required]
        public string Publisher { get; set; }

        [Required]
        public string ISBN { get; set; }

        [Required]
        public string Classification { get; set; }

        [Required]
        public string Category { get; set; }

        [Required]
        public int PageCount { get; set; }

        [Required]
        public decimal Price { get; set; }
    }
}
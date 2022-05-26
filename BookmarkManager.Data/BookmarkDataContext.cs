using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace BookmarkManager.Data
{
    public class BookmarkDataContext : DbContext
    {
        private string _connectionString;
        public BookmarkDataContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Bookmark> Bookmarks { get; set; }
    }
}

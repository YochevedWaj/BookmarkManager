using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace BookmarkManager.Data
{
    public class BookmarkContextFactory : IDesignTimeDbContextFactory<BookmarkDataContext>
    {
        public BookmarkDataContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), $"..{Path.DirectorySeparatorChar}BookmarkManager.Web"))
                .AddJsonFile("appsettings.json")
                .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

            return new BookmarkDataContext(config.GetConnectionString("ConStr"));
        }

    }
}

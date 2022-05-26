using System;
using System.Collections.Generic;
using System.Linq;

namespace BookmarkManager.Data
{
    public class BookmarkRepository
    {
        private string _connectionString;
        public BookmarkRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<CountedBookmark> GetTopFive()
        {
            using var context = new BookmarkDataContext(_connectionString);
            var countedBookmarks = context.Bookmarks
                .Select(b => b.URL).ToHashSet()
                .Select(u => 
                {
                    return new CountedBookmark
                    {
                        URL = u,
                        Count = context.Bookmarks.Count(b => u == b.URL)
                    };
                }); 
            return countedBookmarks.OrderByDescending(b => b.Count).Take(5).ToList();
        }

        public List<Bookmark> GetMyBookmarks(int userId)
        {
            using var context = new BookmarkDataContext(_connectionString);
            return context.Bookmarks.Where(b => b.UserID == userId).ToList();
        }

        public void AddBookmark(Bookmark bookmark)
        {
            using var context = new BookmarkDataContext(_connectionString);
            context.Bookmarks.Add(bookmark);
            context.SaveChanges();
        }

        public void DeleteBookmark(Bookmark bookmark)
        {
            using var context = new BookmarkDataContext(_connectionString);
            context.Bookmarks.Remove(bookmark);
            context.SaveChanges();
        }

        public void EditBookmark(Bookmark bookmark)
        {
            using var context = new BookmarkDataContext(_connectionString);
            context.Bookmarks.Update(bookmark);
            context.SaveChanges();
        }

    }
}

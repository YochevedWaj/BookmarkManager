using System;

namespace BookmarkManager.Data
{
    public class Bookmark
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string URL { get; set; }
        public int UserID { get; set; }
        public User User { get; set; }

    }
}

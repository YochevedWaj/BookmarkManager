﻿using BookmarkManager.Data;
using BookmarkManager.Web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookmarkManager.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarkController : ControllerBase
    {
        private readonly string _connectionString;

        public BookmarkController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("gettopfive")]
        public List<CountedBookmark> GetTopFive()
        {
            var repo = new BookmarkRepository(_connectionString);
            return repo.GetTopFive();
        }

        [HttpGet]
        [Route("getmybookmarks")]
        public List<Bookmark> GetMyBookmarks()
        {
            var repo = new BookmarkRepository(_connectionString);
            var accountRepo = new AccountRepository(_connectionString);
            var userId = accountRepo.GetUserId(User.Identity.Name);
            return repo.GetMyBookmarks(userId);
        }

        [HttpPost]
        [Route("addbookmark")]
        public void AddBookmark(Bookmark bookmark)
        {       
            if (!User.Identity.IsAuthenticated)
            {
                return;
            }
            var repo = new BookmarkRepository(_connectionString);
            var accountRepo = new AccountRepository(_connectionString);
            bookmark.UserID = accountRepo.GetUserId(User.Identity.Name);
            repo.AddBookmark(bookmark);
        }

        [HttpPost]
        [Route("deletebookmark")]
        public void DeleteBookmark(Bookmark bookmark)
        {
            if (!User.Identity.IsAuthenticated)
            {
                return;
            }
            var repo = new BookmarkRepository(_connectionString);
            repo.DeleteBookmark(bookmark);
        }

        [HttpPost]
        [Route("editbookmark")]
        public void EditBookmark(Bookmark bookmark)
        {
            if (!User.Identity.IsAuthenticated)
            {
                return;
            }
            var repo = new BookmarkRepository(_connectionString);
            repo.EditBookmark(bookmark);
        }

    }
}
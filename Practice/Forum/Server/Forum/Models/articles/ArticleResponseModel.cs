using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace Forum.Models.articles
{
    public class ArticleResponseModel
    {
        public string Title { get; set; }

        public string Content { get; set; }

        public string Author { get; set; }

        public static Expression<Func<Article, ArticleResponseModel>> FromModel
        {
            get
            {
                return a => new ArticleResponseModel
                {
                    Author = a.Author.UserName,
                    Content = a.Content,
                    Title = a.Title
                };
            }
        }
    }
}
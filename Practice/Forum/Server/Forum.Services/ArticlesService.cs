using ChatSystem.Data.Repository;
using Forum.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Forum.Services
{
    public class ArticlesService
    {
        private IRepository<Article> articlesRepo;

        public ArticlesService(IRepository<Article> articlesRepo)
        {
            this.articlesRepo = articlesRepo;
        }

        public void Add(Article article)
        {
            this.articlesRepo.Add(article);
            this.articlesRepo.SaveChanges();
        }

        public IQueryable<Article> getAll()
        {
            var articles = this.articlesRepo.All();
            return articles;
        }

        public IQueryable<Article> GetByPage(int page, int size)
        {
            var articles = this.articlesRepo.All()
                .OrderBy(a => a.DateCreated)
                .Skip(page * size)
                .Take(size);

            return articles;
        }
    }
}

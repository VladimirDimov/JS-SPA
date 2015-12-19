namespace Forum.Services
{
    using ChatSystem.Data.Repository;
    using Forum.Models;
    using System.Collections.Generic;
    using System.Linq;

    public class CategoriesService
    {
        private IRepository<Category> categoriesRepo;

        public CategoriesService(IRepository<Category> categoriesRepo)
        {
            this.categoriesRepo = categoriesRepo;
        }

        public void Add(Category category)
        {
            this.categoriesRepo.Add(category);
            this.categoriesRepo.SaveChanges();
        }

        public Category AddByName(string name)
        {
            var categoryToAdd = new Category
            {
                Name = name
            };

            this.categoriesRepo.Add(categoryToAdd);
            return categoryToAdd;
        }

        public Category GetByName(string name)
        {
            return this.categoriesRepo.All()
                .FirstOrDefault(c => c.Name == name);
        }
    }
}

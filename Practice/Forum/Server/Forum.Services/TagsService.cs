using ChatSystem.Data.Repository;
using Forum.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Forum.Services
{
    public class TagsService
    {
        private IRepository<Tag> tagsRepo;

        public TagsService(IRepository<Tag> tagsRepo)
        {
            this.tagsRepo = tagsRepo;
        }

        public IQueryable<Tag> All()
        {
            var tags = this.tagsRepo.All();
            return tags;
        }

        public void Add(Tag tag)
        {
            this.tagsRepo.Add(tag);
            this.tagsRepo.SaveChanges();
        }

        public Tag AddByName(string name)
        {
            var tagToAdd = new Tag
            {
                Name = name
            };

            this.tagsRepo.Add(tagToAdd);
            return tagToAdd;
        }

        public Tag GetByName(string name)
        {
            return this.tagsRepo.All()
                 .FirstOrDefault(t => t.Name == name);
        }

        /// <summary>
        /// Return collection of tags by name. For each name creates new tag if such doesen't exist.
        /// </summary>
        /// <param name="names"></param>
        /// <returns>Return collection of tags.</returns>
        public ICollection<Tag> GetManyByName(ICollection<string> names)
        {
            var tags = new List<Tag>();

            foreach (var name in names)
            {
                var tag = this.GetByName(name);
                if (tag == null)
                {
                    tag = this.AddByName(name);
                }

                tags.Add(tag);
            }

            return tags;
        }
    }
}

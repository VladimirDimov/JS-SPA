namespace Forum.Data
{
    using ChatSystem.Data;
    using Forum.Models;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System.Data.Entity;

    public class ForumDbContext : IdentityDbContext<User>, IForumDbContext
    {
        public ForumDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        public virtual DbSet<Article> Articles { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Tag> Tags { get; set; }
        public virtual DbSet<Like> Likes { get; set; }
        public virtual DbSet<Dislike> Dislikes { get; set; }

        public static ForumDbContext Create()
        {
            return new ForumDbContext();
        }
    }
}

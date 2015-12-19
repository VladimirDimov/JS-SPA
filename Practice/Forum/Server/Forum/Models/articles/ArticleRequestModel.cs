namespace Forum.Models.articles
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class ArticleRequestModel
    {
        [Required]
        [MinLength(2)]
        [MaxLength(50)]
        public string Title { get; set; }

        [Required]
        [MinLength(5)]
        [MaxLength(200)]
        public string Content { get; set; }

        public ICollection<string> Tags { get; set; }

        [Required]
        public string Category { get; set; }
    }
}
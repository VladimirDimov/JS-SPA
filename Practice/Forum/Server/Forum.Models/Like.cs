namespace Forum.Models
{
    public class Like
    {
        public int Id { get; set; }

        public int ArticleId { get; set; }

        public virtual Article Article { get; set; }

        public string VoterId { get; set; }

        public virtual User Voter { get; set; }

        public string VotedUserId { get; set; }

        public virtual User VotedUser { get; set; }
    }
}
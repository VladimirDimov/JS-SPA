namespace Forum.Models
{
    public class Dislike
    {
        public int Id { get; set; }

        public string VoterId { get; set; }

        public virtual User Voter { get; set; }

        public string VotedUserId { get; set; }

        public virtual User VotedUser { get; set; }
    }
}
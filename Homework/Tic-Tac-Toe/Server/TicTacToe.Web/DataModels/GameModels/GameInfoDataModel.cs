namespace TicTacToe.Web.DataModels.GameModels
{
    using System;
    using System.Linq.Expressions;
    using TicTacToe.Models;

    public class GameInfoDataModel
    {
        public Guid Id { get; set; }

        public string Board { get; set; }

        public string FirstPlayerName { get; set; }

        public string SecondPlayerName { get; set; }

        public string Name { get; set; }

        public GameState State { get; set; }

        public int FirstPlayerPoints { get; set; }

        public int SecondPlayerPoints { get; set; }

        public static Expression<Func<Game, GameInfoDataModel>> FromModel
        {
            get
            {
                return game => new GameInfoDataModel
                {
                    Id = game.Id,
                    State = game.State,
                    Board = game.Board,
                    FirstPlayerName = game.FirstPlayer.UserName,
                    SecondPlayerName = game.SecondPlayer != null ? game.SecondPlayer.UserName : "Waiting...",
                    Name = game.Name,
                    FirstPlayerPoints = game.FirstPlayerPoints,
                    SecondPlayerPoints = game.SecondPlayerPoints
                };
            }
        }

        public static GameInfoDataModel GetFromModel(Game game)
        {
            return new GameInfoDataModel
            {
                Id = game.Id,
                State = game.State,
                Board = game.Board,
                FirstPlayerName = game.FirstPlayer.UserName,
                SecondPlayerName = game.SecondPlayer != null ? game.SecondPlayer.UserName : "Waiting...",
                Name = game.Name,
                FirstPlayerPoints = game.FirstPlayerPoints,
                SecondPlayerPoints = game.SecondPlayerPoints
            };
        }
    }
}
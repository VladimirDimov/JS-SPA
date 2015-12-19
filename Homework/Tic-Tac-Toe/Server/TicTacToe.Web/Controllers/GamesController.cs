namespace TicTacToe.Web.Controllers
{
    using System.Linq;
    using System.Web.Http;

    using Microsoft.AspNet.Identity;

    using TicTacToe.Data;
    using TicTacToe.Models;
    using System;
    using TicTacToe.Web.DataModels;
    using System.Text;
    using TicTacToe.GameLogic;
    using TicTacToe.Web.Infrastructure;
    using DataModels.Game;
    using DataModels.GameModels;

    [RoutePrefix("api/games")]
    public class GamesController : BaseApiController
    {
        private IGameResultValidator resultValidator;
        private IUserIdProvider userIdProvider;

        public GamesController()
            : base(new TicTacToeData(new TicTacToeDbContext()))
        {
            this.resultValidator = new GameResultValidator();
            this.userIdProvider = new AspNetUserIdProvider();
        }

        public GamesController(
            ITicTacToeData data,
            IGameResultValidator resultValidator,
            IUserIdProvider userIdProvider)
            : base(data)
        {
            this.resultValidator = resultValidator;
            this.userIdProvider = userIdProvider;
        }

        [HttpPost]
        [Route("create")]
        public IHttpActionResult Create(GameCreateModel model)
        {
            var currentUserId = this.userIdProvider.GetUserId();

            var user = this.data.Users.All()
                .FirstOrDefault(u => u.Id == currentUserId);

            if (user == null)
            {
                return this.InternalServerError(new InvalidOperationException("Server error!"));
            }

            if (user.HasJoinedGame)
            {
                return this.BadRequest("Yuo have already joined a game!");
            }
            else
            {
                user.HasJoinedGame = true;
            }

            var newGame = new Game
            {
                FirstPlayerId = currentUserId,
                Name = model.Name,
                FirstPlayerPoints = 0,
                SecondPlayerPoints = 0,
                LastPlayerStart = 1
            };

            this.data.Games.Add(newGame);
            this.data.SaveChanges();

            return Ok(newGame.Id);
        }

        [HttpPost]
        [Route("join")]
        public IHttpActionResult Join(string id)
        {
            var currentUserId = this.userIdProvider.GetUserId();

            var user = this.data.Users.All()
                .FirstOrDefault(u => u.Id == currentUserId);

            if (user.HasJoinedGame)
            {
                return this.BadRequest("Yuo have already joined a game!");
            }
            else
            {
                user.HasJoinedGame = true;
            }

            var game = this.data.Games
                .All()
                .FirstOrDefault(g => g.Id == new Guid(id));

            if (game == null)
            {
                return this.BadRequest("Game doesn't exist!");
            }

            if (game.FirstPlayerId == currentUserId)
            {
                return this.BadRequest("You cannot join a game that is yours!");
            }

            if (game == null)
            {
                return NotFound();
            }

            game.SecondPlayerId = currentUserId;

            if (game.LastPlayerStart == 2)
            {
                game.State = GameState.TurnX;
                game.LastPlayerStart = 2;
            }
            else
            {
                game.State = GameState.TurnO;
                game.LastPlayerStart = 1;
            }

            this.data.SaveChanges();

            return Ok(game.Id);
        }

        [HttpGet]
        [Route("all")]
        public IHttpActionResult GetAll()
        {
            try
            {
                var games = this.data.Games.All()
                    .Select(GameInfoDataModel.FromModel)
                    .ToList();

                return this.Ok(games);
            }
            catch (Exception ex)
            {
                return this.InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("getById")]
        public IHttpActionResult Status(string gameId)
        {
            var currentUserId = this.userIdProvider.GetUserId();
            var idAsGuid = new Guid(gameId);

            var game = this.data.Games.All()
                .Where(x => x.Id == idAsGuid)
                .Select(x => new { x.FirstPlayerId, x.SecondPlayerId })
                .FirstOrDefault();
            if (game == null)
            {
                return this.NotFound();
            }

            if (game.FirstPlayerId != currentUserId &&
                game.SecondPlayerId != currentUserId)
            {
                return this.BadRequest("This is not your game!");
            }

            var gameInfo = this.data.Games.All()
                .Where(g => g.Id == idAsGuid)
                .Select(GameInfoDataModel.FromModel)
                .FirstOrDefault();

            return Ok(gameInfo);
        }

        /// <param name="row">1,2 or 3</param>
        /// <param name="col">1,2 or 3</param>
        [HttpPost]
        [Route("play")]
        public IHttpActionResult Play(PlayRequestDataModel request)
        {
            var currentUserId = this.userIdProvider.GetUserId();

            if (request == null || !ModelState.IsValid)
            {
                return this.BadRequest(ModelState);
            }

            var idAsGuid = new Guid(request.GameId);

            var game = this.data.Games.Find(idAsGuid);
            if (game == null)
            {
                return this.BadRequest("Invalid game id!");
            }

            if (game.FirstPlayerId != currentUserId &&
                game.SecondPlayerId != currentUserId)
            {
                return this.BadRequest("This is not your game!");
            }

            if (game.State != GameState.TurnX &&
                game.State != GameState.TurnO)
            {
                return this.BadRequest("Invalid game state!");
            }

            if ((game.State == GameState.TurnX &&
                game.FirstPlayerId != currentUserId)
                ||
                (game.State == GameState.TurnO &&
                game.SecondPlayerId != currentUserId))
            {
                return this.BadRequest("It's not your turn!");
            }

            var positionIndex = (request.Row - 1) * 3 + request.Col - 1;
            if (game.Board[positionIndex] != '-')
            {
                return this.BadRequest("Invalid position!");
            }

            // Update games state and board
            var boardAsStringBuilder = new StringBuilder(game.Board);
            boardAsStringBuilder[positionIndex] =
                game.State == GameState.TurnX ? 'X' : 'O';
            game.Board = boardAsStringBuilder.ToString();

            game.State = game.State == GameState.TurnX ?
                GameState.TurnO : GameState.TurnX;

            this.data.SaveChanges();

            var gameResult = resultValidator.GetResult(game.Board);
            switch (gameResult)
            {
                case GameResult.NotFinished:
                    break;
                case GameResult.WonByX:
                    game.State = GameState.WonByX;
                    game.FirstPlayerPoints++;
                    this.data.SaveChanges();
                    break;
                case GameResult.WonByO:
                    game.State = GameState.WonByO;
                    game.SecondPlayerPoints++;
                    this.data.SaveChanges();
                    break;
                case GameResult.Draw:
                    game.State = GameState.Draw;
                    this.data.SaveChanges();
                    break;
                default:
                    break;
            }

            return this.Ok();
        }
        [HttpPut]
        [Route("leave")]
        public IHttpActionResult Leave(string gameId)
        {
            if (gameId == null)
            {
                return this.BadRequest("Invalid game id!");
            }

            var currentUserId = this.userIdProvider.GetUserId();
            var idAsGuid = new Guid(gameId);

            var game = this.data.Games.All()
                .FirstOrDefault(g => g.Id == idAsGuid);

            if (game == null)
            {
                return this.BadRequest("The game is invallid or it was deleted!");
            }

            if (game.FirstPlayer.Id == currentUserId)
            {
                if (game.SecondPlayer != null)
                {
                    game.SecondPlayer.HasJoinedGame = false;
                }
                game.FirstPlayer.HasJoinedGame = false;
                this.data.Games.Delete(game);
                this.data.SaveChanges();
                return this.Ok("The game has been deleted!");
            }
            else if (game.SecondPlayer.Id == currentUserId)
            {
                game.SecondPlayer.HasJoinedGame = false;
                game.SecondPlayer = null;
                game.SecondPlayerId = null;
                game.State = GameState.Finished;
                this.data.SaveChanges();
                return this.Ok("You exeted the game!");
            }
            else
            {
                return this.BadRequest("This is not your game!");
            }
        }

        [Route("GetMyGame")]
        [HttpGet]
        public IHttpActionResult GetMyGame()
        {
            var currentUserId = this.userIdProvider.GetUserId();

            var game = this.data.Games.All()
                .FirstOrDefault(
                g => g.FirstPlayerId == currentUserId ||
                g.SecondPlayerId == currentUserId);

            if (game == null)
            {
                Game nullRes = null;
                return this.Ok(nullRes);
            }

            return this.Ok(GameInfoDataModel.GetFromModel(game));
        }

        [HttpPut]
        [Route("restart")]
        public IHttpActionResult Restart()
        {
            var currentUserId = this.userIdProvider.GetUserId();

            var game = this.data.Games.All()
                .FirstOrDefault(
                g => g.FirstPlayerId == currentUserId ||
                g.SecondPlayerId == currentUserId);

            if (game == null)
            {
                return this.BadRequest("Invalid game!");
            }

            game.Board = "---------";
            game.State = GameState.TurnO;
            this.data.Games.SaveChanges();
            return this.Ok("Game restrarted!");
        }
    }
}
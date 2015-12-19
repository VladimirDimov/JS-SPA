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

    [RoutePrefix("api/users")]
    [Authorize]
    public class UsersController : BaseApiController
    {
        private IGameResultValidator resultValidator;
        private IUserIdProvider userIdProvider;

        public UsersController()
            : base(new TicTacToeData(new TicTacToeDbContext()))
        {
            this.resultValidator = new GameResultValidator();
            this.userIdProvider = new AspNetUserIdProvider();
        }

        public UsersController(
            ITicTacToeData data,
            IGameResultValidator resultValidator,
            IUserIdProvider userIdProvider)
            : base(data)
        {
            this.resultValidator = resultValidator;
            this.userIdProvider = userIdProvider;
        }

        [HttpGet]
        [Route("hasGame")]
        public IHttpActionResult HasGame()
        {
            var user = this.data.Users.All()
                .FirstOrDefault(u => u.Id == this.User.Identity.GetUserId());

            return this.Ok(user.HasJoinedGame);
        }
    }
}
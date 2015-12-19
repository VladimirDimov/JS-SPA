namespace Forum.Controllers
{
    using Forum.Common;
    using Forum.Models;
    using Forum.Models.articles;
    using Forum.Services;
    using Microsoft.AspNet.Identity;
    using System;
    using System.Linq;
    using System.Web.Http;
    using System.Web.Http.Cors;

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ArticlesController : ApiController
    {
        private ArticlesService articlesService;
        private CategoriesService categoriesService;
        private TagsService tagsService;

        public ArticlesController(
            ArticlesService articlesService,
            CategoriesService categoriesService,
            TagsService tagsService)
        {
            this.articlesService = articlesService;
            this.categoriesService = categoriesService;
            this.tagsService = tagsService;
        }

        public IHttpActionResult Get()
        {
            var articles = articlesService
                .getAll()
                .Select(ArticleResponseModel.FromModel)
                .ToList();

            return this.Ok(articles);
        }

        public IHttpActionResult Get(string page, string size = GlobalConstants.GlobalPageSize)
        {
            int pageAsInt, sizeAsInt;

            if (!int.TryParse(page, out pageAsInt))
            {
                return this.BadRequest(GlobalMessages.InvalidPageFormat);
            }
            else
            {
                if (pageAsInt <= 0)
                {
                    return this.BadRequest(GlobalMessages.InvalidPageNumber);
                }
            }

            if (!int.TryParse(size, out sizeAsInt))
            {
                return this.BadRequest(GlobalMessages.InvalidPageSizeFormat);
            }
            else
            {
                if (pageAsInt <= 0)
                {
                    return this.BadRequest(GlobalMessages.InvalidPageSizeNumber);
                }
            }

            var articles = articlesService
                .GetByPage(pageAsInt, sizeAsInt)
                .Select(ArticleResponseModel.FromModel)
                .ToList();

            return this.Ok(articles);
        }

        [Authorize]
        public IHttpActionResult Post(ArticleRequestModel model)
        {
            if (model == null || !ModelState.IsValid)
            {
                return this.BadRequest(ModelState);
            }

            var category = this.categoriesService.GetByName(model.Category);
            if (category == null)
            {
                category = this.categoriesService.AddByName(model.Category);
            }

            var tags = this.tagsService
                .GetManyByName(model.Tags);

            var articleToAdd = new Article
            {
                AuthorId = this.User.Identity.GetUserId(),
                Title = model.Title,
                Content = model.Content,
                DateCreated = DateTime.Now,
                Category = category,
                Tags = tags
            };

            //try
            //{
                this.articlesService.Add(articleToAdd);
            //}
            //catch (Exception ex)
            //{
            //    return this.BadRequest(ex.Message);
            //}

            return this.Ok();
        }
    }
}

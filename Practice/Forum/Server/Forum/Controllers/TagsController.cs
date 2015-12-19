using Forum.Models;
using Forum.Models.tags;
using Forum.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Forum.Controllers
{
    [Authorize]
    public class TagsController : ApiController
    {
        private TagsService tagsService;

        public TagsController(TagsService tagsService)
        {
            this.tagsService = tagsService;
        }

        public IHttpActionResult Get()
        {
            var tags = this.tagsService.All()
                .Select(x => x.Name)
                .ToList();

            return this.Ok(tags);
        }

        public IHttpActionResult Post(TagRequestModel model)
        {
            var tag = new Tag
            {
                Name = model.Name
            };

            try
            {
                this.tagsService.Add(tag);
            }
            catch (Exception ex)
            {
                return this.BadRequest(ex.Message);
            }

            return this.Ok();
        }
    }
}

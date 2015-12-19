using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Forum.Startup))]

namespace Forum
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
            ConfigureAuth(app);
        }
    }
}

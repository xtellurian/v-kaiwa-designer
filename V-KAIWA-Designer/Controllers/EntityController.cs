using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using V_KAIWA_Designer.Repository;

namespace V_KAIWA_Designer.Controllers
{
    [Route("api/[controller]")]
    public class EntityController : Controller
    {
        private readonly IEntityRepository repo;

        public EntityController(IEntityRepository repo)
        {
            this.repo = repo;
        }

        [HttpGet("names")]
        public async Task<IEnumerable<string>> IntentNamesAsync()
        {
            return await LoadEntitiesAsync();
        }

        private async Task<IEnumerable<string>> LoadEntitiesAsync()
        {
            if (this.repo.IsAvailable)
            {
                return await repo.GetEntities();
            }
            else
            {
                return new List<string>
                {
                "Hot Dog",
                "Newspaper"
                };
            }
        }
    }
}
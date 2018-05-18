using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace V_KAIWA_Designer.Controllers
{
    [Route("api/[controller]")]
    public class EntityController : Controller
    {
        [HttpGet("names")]
        public async Task<IEnumerable<string>> IntentNamesAsync()
        {
            return await LoadEntitiesAsync();
        }

        private async Task<IEnumerable<string>> LoadEntitiesAsync()
        {
            return new List<string>
            {
                "Hot Dog",
                "Newspaper"
            };
        }
    }
}
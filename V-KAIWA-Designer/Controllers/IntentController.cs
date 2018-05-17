using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using V_KAIWA_Designer.Repository;

namespace V_KAIWA_Designer.Controllers
{
    [Route("api/[controller]")]
    public class IntentController : Controller
    {
        private readonly IIntentRepository repo;

        public IntentController(IIntentRepository repo)
        {
            this.repo = repo;
        }
        [HttpGet("names")]
        public async Task<IEnumerable<string>> IntentNamesAsync()
        {
            return await LoadIntentsAsync();
        }

        [HttpGet("names/{npcName}")]
        public async Task<IEnumerable<string>> GetQueryAsync(string npcName)
        {
            return await LoadIntentsAsync();
        }

        private async Task<IEnumerable<string>> LoadIntentsAsync()
        {
            if (repo.IsAvailable)
            {
                return await repo.GetIntents();
            }
            else
            {
                return new List<string>
                {
                    "Greeting",
                    "HelpMe",
                    "AskForItem",
                    "GiveItem",
                    "Yes",
                    "No"
                };
            }
        }
    }
}
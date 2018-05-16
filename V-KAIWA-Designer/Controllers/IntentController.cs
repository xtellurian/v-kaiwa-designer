using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace V_KAIWA_Designer.Controllers
{
    [Route("api/[controller]")]
    public class IntentController : Controller
    {

        [HttpGet("names")]
        public IEnumerable<string> IntentNames()
        {
            return LoadIntents();
        }

        [HttpGet("names/{npcName}")]
        public IEnumerable<string> GetQuery(string npcName)
        {
            return LoadIntents();
        }

        private List<string> LoadIntents()
        {
            return new List<string>
            {
                "Intent1",
                "Intent2"
            };
        }
    }
}
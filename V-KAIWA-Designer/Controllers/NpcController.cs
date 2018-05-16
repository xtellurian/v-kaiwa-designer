using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace V_KAIWA_Designer.Controllers
{
    [Route("api/[controller]")]
    public class NpcController : Controller
    {
        [HttpGet("names")]
        public IEnumerable<string> Names()
        {
            return LoadNpcNames();
        }

        private List<string> LoadNpcNames()
        {
            return new List<string>
            {
                "Name1",
                "Name2"
            };
        }
    }
}
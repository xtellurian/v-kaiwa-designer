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
                "Biker",
                "Fast food guy",
                "Fire fighter",
                "Gamer girl",
                "Gangster",
                "Grandma",
                "Grandpa",
                "Hipster",
                "Girl",
                "Hipster guy",
                "hobo",
                "hotdog guy",
                "Jock",
                "Paramedic",
                "Punk girl",
                "Punk guy",
                "Road worker",
                "Shop Keeper",
                "Summer girl",
                "Tourist",
                "Business man",
                "Dad",
                "Business woman",
                "Woman in coat",
                "woman in jacket",
                "Police woman",
                "Police man",
                "Hoodie male",
                "Jacket male"
            };
        }
    }
}
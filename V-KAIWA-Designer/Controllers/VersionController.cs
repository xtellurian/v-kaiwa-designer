using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace V_KAIWA_Designer.Controllers
{
    [Route("api/[controller]")]
    public class VersionController : Controller
    {
        private string _version;

        public VersionController()
        {
            var info = Assembly.GetEntryAssembly().GetCustomAttribute<AssemblyInformationalVersionAttribute>();
            _version = info.InformationalVersion;

        }
        [HttpGet()]
        public string Version()
        {
            return _version;
        }
    }
}
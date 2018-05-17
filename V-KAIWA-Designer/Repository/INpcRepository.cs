using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace V_KAIWA_Designer.Repository
{
    public interface INpcRepository
    {
        Task<IEnumerable<string>> GetNpcNames();
        bool IsAvailable { get; }
    }
}

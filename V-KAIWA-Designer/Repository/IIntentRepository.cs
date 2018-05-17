using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace V_KAIWA_Designer.Repository
{
    public interface IIntentRepository
    {
        Task<IEnumerable<string>> GetIntents();
        bool IsAvailable { get; }
    }
}

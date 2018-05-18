using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace V_KAIWA_Designer.Repository
{
    public interface IEntityRepository
    {
        Task<IEnumerable<string>> GetEntities();
        bool IsAvailable { get; }
    }
}

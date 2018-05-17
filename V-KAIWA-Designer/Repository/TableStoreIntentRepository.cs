using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace V_KAIWA_Designer.Repository
{
    public class TableStoreIntentRepository : IIntentRepository
    {
        private string _connectionString;

        public TableStoreIntentRepository()
        {
            _connectionString = Program.Configuration["TableStorageConnectionString"];
            IsAvailable = ! string.IsNullOrEmpty(_connectionString);

        }

        public bool IsAvailable { get; private set; }

        Task<IEnumerable<string>> IIntentRepository.GetIntents()
        {
            throw new NotImplementedException();
        }
    }
}

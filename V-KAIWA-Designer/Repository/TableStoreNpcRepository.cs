using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace V_KAIWA_Designer.Repository
{
    public class TableStoreNpcRepository : INpcRepository
    {
        public bool IsAvailable { get; private set; }

        private string _connectionString;
        private string _tableName;
        private CloudStorageAccount _storageAccount;

        public TableStoreNpcRepository()
        {
            // these come from App Settings
            _connectionString = Program.Configuration["Storage:ConnectionString"];
            _tableName = Program.Configuration["Storage:NpcTableName"];

            IsAvailable = ! string.IsNullOrEmpty(_connectionString) && !string.IsNullOrEmpty(_tableName);
            if (IsAvailable) _storageAccount = CloudStorageAccount.Parse(_connectionString);
        }

        async Task<IEnumerable<string>> INpcRepository.GetNpcNames()
        {
            // get from table storage
            var tableClient = _storageAccount.CreateCloudTableClient();
            var table = tableClient.GetTableReference(_tableName);
            var query = new TableQuery<NpcTableEntity>();
            TableContinuationToken token = null; // if there's more than 1000 rows in the table, this will need to be checked
            var queryResult = await table.ExecuteQuerySegmentedAsync(query, token);
            var result = queryResult.ToList();

            return result.Select(s => s.Name);
        }

    }
    class NpcTableEntity : TableEntity
    {
        public string Name { get; set; }
    }
}

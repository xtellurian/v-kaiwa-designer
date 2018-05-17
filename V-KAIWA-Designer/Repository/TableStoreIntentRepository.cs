using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace V_KAIWA_Designer.Repository
{
    public class TableStoreIntentRepository : IIntentRepository
    {
        public bool IsAvailable { get; private set; }

        private string _connectionString;
        private string _tableName;
        private CloudStorageAccount _storageAccount;

        public TableStoreIntentRepository()
        {
            // these come from App Settings
            _connectionString = Program.Configuration["Storage:ConnectionString"];
            _tableName = Program.Configuration["Storage:TableName"];

            IsAvailable = ! string.IsNullOrEmpty(_connectionString);
            if(IsAvailable) _storageAccount = CloudStorageAccount.Parse(_connectionString);
        }


        async Task<IEnumerable<string>> IIntentRepository.GetIntents()
        {
            // get from table storage
            var tableClient = _storageAccount.CreateCloudTableClient();
            var table = tableClient.GetTableReference(_tableName);
            var query = new TableQuery<IntentTableEntity>();
            TableContinuationToken token = null; // if there's more than 1000 rows in the table, this will need to be checked
            var queryResult = await table.ExecuteQuerySegmentedAsync(query, token);
            var result = queryResult.ToList();

            return result.Select(s => s.Name);
        }
    }

    public class IntentTableEntity : TableEntity
    {
        public string Name { get; set; }
    }
}

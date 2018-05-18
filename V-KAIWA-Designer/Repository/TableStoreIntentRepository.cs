using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace V_KAIWA_Designer.Repository
{
    public class TableStoreIntentRepository : TableStoreRepository<IntentTableEntity>, IIntentRepository
    {
        public TableStoreIntentRepository() : base("IntentTableName")
        {
        }


        async Task<IEnumerable<string>> IIntentRepository.GetIntents()
        {
            // get from table storage
            var tableClient = StorageAccount.CreateCloudTableClient();
            var table = tableClient.GetTableReference(TableName);
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

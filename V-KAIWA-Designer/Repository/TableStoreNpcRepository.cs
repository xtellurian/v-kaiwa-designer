using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace V_KAIWA_Designer.Repository
{
    public class TableStoreNpcRepository : TableStoreRepository<NpcTableEntity>, INpcRepository
    {
        public TableStoreNpcRepository() : base("NpcTableName")
        {
        }

        async Task<IEnumerable<string>> INpcRepository.GetNpcNames()
        {
            // get from table storage
            var tableClient = StorageAccount.CreateCloudTableClient();
            var table = tableClient.GetTableReference(TableName);
            var query = new TableQuery<NpcTableEntity>();
            TableContinuationToken token = null; // if there's more than 1000 rows in the table, this will need to be checked
            var queryResult = await table.ExecuteQuerySegmentedAsync(query, token);
            var result = queryResult.ToList();

            return result.Select(s => s.Name);
        }

    }
    public class NpcTableEntity : TableEntity
    {
        public string Name { get; set; }
    }
}

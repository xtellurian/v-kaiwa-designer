using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace V_KAIWA_Designer.Repository
{
    public class TableStoreEntityRepository: TableStoreRepository<LuisEntityTableEntity> , IEntityRepository
    {
        public TableStoreEntityRepository(): base("EntityTableName")
        {
        }

        async Task<IEnumerable<string>> IEntityRepository.GetEntities()
        {
            var tableClient = StorageAccount.CreateCloudTableClient();
            var table = tableClient.GetTableReference(TableName);
            var query = new TableQuery<LuisEntityTableEntity>();
            TableContinuationToken token = null; // if there's more than 1000 rows in the table, this will need to be checked
            var queryResult = await table.ExecuteQuerySegmentedAsync(query, token);
            var result = queryResult.ToList();

            return result.Select(s => s.Name);
        }
    }

    public class LuisEntityTableEntity : TableEntity
    {
        public string Name { get; set; }
    }
}

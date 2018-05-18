using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace V_KAIWA_Designer.Repository
{
    public abstract class TableStoreRepository<T> where T: TableEntity
    {
        public bool IsAvailable { get; private set; }
        protected string TableName { get; private set; }
        protected CloudStorageAccount StorageAccount { get; private set; }

        private string _connectionString;

        protected TableStoreRepository(string tableName)
        {
            // these come from App Settings
            _connectionString = Program.Configuration["Storage:ConnectionString"];
            TableName = Program.Configuration[tableName];

            IsAvailable = !string.IsNullOrEmpty(_connectionString) && !string.IsNullOrEmpty(TableName);
            if (IsAvailable) StorageAccount = CloudStorageAccount.Parse(_connectionString);
        }
    }
}

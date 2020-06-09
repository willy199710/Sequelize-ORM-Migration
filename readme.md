參考網址 : https://sequelize.org/master/manual/migrations.html  
參考網址 : https://dwatow.github.io/2018/09-24-sequelize/sequelize-migration/

# 前置設定

### 安裝 sequelize-cli 與 sequelize 相關 module

```npm install --save sequelize```  
```npm install --save sequelize-cli``` 

### 建立 migration 所需之資料

```npx sequelize-cli init```

此時會得到四個資料夾如下
* config: 儲存DB相關設定
* models: migration使用的model(DB.table)
* migrations: 存放migration file
* seeders 存放seed file


# Migration 的使用方法

### 建立一個新的 migrations file 與 model

```npx sequelize-cli model:generate --name test --attributes firstName:string,lastName:string,email:string```

執行結果會生成兩份檔案
* 建立一個名為 test 的 model，並存放在 models 資料夾
* 建立一個 migration file 名為 XXXXXXXXXXXXXX-create-test.js 存放於 migrations 資料夾

```npx sequelize-cli migration:generate --name test```

只建立一個 migration 而不建立 model

### 更新版本，會使用到 migration file 內 function up 的內容

```npx sequelize-cli db:migrate```

成功更新時，DB中會生成一個名為 SequelizeMeta 的 table  
用來記錄哪些migration版本已經套用  
會根據 SequelizeMeta 的記錄執行其餘的　migration file。

### 還原版本，會使用到 function down 的內容

```npx sequelize-cli db:migrate:undo```

會還原最近的一個版本，並從 SequelizeMeta 中刪除掉這筆 migration。

### 還原全部版本設定，也可設置其回到特定的設定

```npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js```

### 下方則是 migration file 內容的相關語法參考

* 變動資料表
  * 新增資料表 createTable(tableName, attributes, options)
  * 刪除資料表 dropTable(tableName, options)
  * 刪除所有資料表 dropAllTables(options)
  * 重新命名資料表 renameTable(before, after, options)
  * 顯示資料表陣列 showAllTables(options)
  * 顯示資料表 schema describeTable(tableName, options)
* 變動欄位
  * 增加欄位 addColumn(tableName, attributeName, dataTypeOrOptions, options)
  * 刪除欄位 removeColumn(tableName, attributeName, options)
  * 修改欄位設定 changeColumn(tableName, attributeName, dataTypeOrOptions, options)
  * 重新命名欄位 renameColumn(tableName, attrNameBefore, attrNameAfter, options)
* 變動索引
  * 建立索引 addIndex(tableName, attributes, options)
  * 移除索引 removeIndex(tableName, indexNameOrAttributes, options)



# Seed 的使用方法

如果說 migration 是改變 table 設定，那 seed 能做的就是對 data 進行設定

### 建立一個 seed

```npx sequelize-cli seed:generate --name test-seed```

上述 command 會建立一個名為 XXXXXXXXXXXXXX-test-seed.js 的檔案存放在 seeders 資料夾裡  
而 seed 也是通過 up/down function 進行控制，內容則為 sequelize query 語法，如下

```
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('test', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'example@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('test', null, {});
  }
};

```

### 執行 seed

```npx sequelize-cli db:seed:all```

seed 沒有如同 migration 一樣的 SequelizeMeta 去記錄執行過哪些seed  
需自行使用 storage 設定。

### seed storage 設定

可在config.js中加入下方設定
```"seederStorageTableName": "sequelizeData"```

會在DB中建立一個table名為 sequelizeData　的 table，用來記錄使用過的seed。

### 還原 seed（需使用seed storage設定)

* 還原最近一筆
```npx sequelize-cli db:seed:undo```
* 還原全部
```npx sequelize-cli db:seed:undo:all```
* 還原特定版本設定
```npx sequelize-cli db:seed:undo --seed {name-of-seed-as-in-data}```

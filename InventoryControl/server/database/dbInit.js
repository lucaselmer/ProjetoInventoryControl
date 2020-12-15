const db = require('./dbConnection');
const path = require('path');
const fs = require('fs');

// Lê o arquivo de importação do banco de dados e executa as queries
module.exports = () => {
    let dbQueriesImport = fs.readFileSync(path.join(__dirname, 'inventorycontroldb.sql'), { encoding: "UTF-8" }).split(";\n");

    for (let query of dbQueriesImport) {
        query = query.trim();
        if (query.length !== 0 && !query.match(/\/\*/)) {
          db.query(query, function (err, sets, fields) {
            if (err) {
              console.log(`Importing failed for Mysql Database  - Query:${query}`);
            } else {
              console.log(`Importing Mysql Database  - Query:${query}`);
            }
          });
        }
    }
}
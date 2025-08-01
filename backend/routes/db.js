const sql = require('mssql');
const config = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  server: process.env.SQL_SERVER,
  options: {
    encrypt: true
  }
};
module.exports = {
  sql, 
  config
};

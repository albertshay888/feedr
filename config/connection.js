// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

// Dependencies
var mysql = require('mysql');
var connection;

if (process.env.JAWSDB_URL) {
  connection = myysql.createConnection(process.env.JAWSBD_URL);

} else {
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'feedr_db'
  });
};

connection.connect();
module.exports = connection;
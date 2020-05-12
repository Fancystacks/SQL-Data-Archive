// Set up MySQL connection.
const mysql = require("mysql");
const dotenv = require("dotenv").config();

 const connection = mysql.createConnection({
      host: process.env.HOST
      , user: process.env.USERNAME
      , password: process.env.PASSWORD
      , port: 3306
      , database: process.env.DATABASE
  });
// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
    return;
  }
  console.log(`connected as id ${connection.threadId}`);
});
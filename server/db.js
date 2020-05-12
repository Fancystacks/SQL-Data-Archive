// Set up MySQL connection.
const mysql = require("mysql");
const dotenv = require("dotenv").config();
let instance = null;

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

class dbService {
    static getServiceInstance() {
        return instance ? instance : new dbService();
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM names;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;

        } catch (error) {
            console.log(error);
        }
    }
    async addNewName(name) {
        try {
            const dateAdded = new Date();
            const insertID = await new Promise((resolve, reject) => {
                const query = "INSERT INTO names (name, date_added) VALUES (?,?);";

                connection.query(query, [name, dateAdded], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertID);
                })
            });

            console.log(insertID);
            // return response;

        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = dbService;
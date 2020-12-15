require("dotenv").config();
const mysql = require('mysql');

class DatabaseManager {

    constructor(){
        this.connection = mysql.createConnection({
            host     : process.env.DB_HOST,
            user     : process.env.DB_USERNAME,
            password : process.env.DB_PASSWORD,
            database : process.env.DATABASE
        });
        this.storeProcedureLogin = "CALL userLogin(?,?)";
    }
    
    testConnection = ()=> {
        try {
            this.connection.connect();
        
            this.connection.query('SELECT * FROM Stadia.Users', function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results[0]);
            });
            
            this.connection.end();
        } catch (error) {
            throw new Error('Database Connection error: ' + error);
        }
    }
}

const DbManager = new DatabaseManager();

module.exports = DbManager;
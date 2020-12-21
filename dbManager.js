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
        this.SPLogin = "CALL userLogin(?,?)";
        this.SPGetUserDataAndGames = "CALL getUserDataAndGames(?)";
        this.SPGelAllGames = "CALL getAllGames(?)";
    }
}

const DbManager = new DatabaseManager();

module.exports = DbManager;
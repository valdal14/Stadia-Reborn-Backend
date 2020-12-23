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
        this.SPSearchForGames = "CALL searchForGames(?)"; 
    }

    executeQuery = (...params)=> {
        let paramsCounter = 0;
        for (let i = 0; i < params.length; i++) {
            if(params[i] !== null && params[i] !== ""){
                paramsCounter += 1;
            } else {
                return process.env.ERRORCODE1401;
            }
        }

        return paramsCounter;
    }

    createQuery = (queryEndpoint, counter)=> {
        
        let executeStoreProcedure = null;

        if(queryEndpoint === 'login' && counter === 2){
            executeStoreProcedure = this.SPLogin;
            return executeStoreProcedure;
        } else if(queryEndpoint === 'ownedgames' && counter === 1){
            executeStoreProcedure = this.SPGetUserDataAndGames;
            return executeStoreProcedure;
        } else if(queryEndpoint === 'games' && counter === 1){
            executeStoreProcedure = this.SPGelAllGames;
            return executeStoreProcedure;
        } else if(queryEndpoint === 'searchgames' && counter === 1){
            executeStoreProcedure = this.SPSearchForGames;
            return executeStoreProcedure;
        } else {
            return process.env.ERRORCODE1400;
        }
    }
}

const DbManager = new DatabaseManager();

module.exports = DbManager;
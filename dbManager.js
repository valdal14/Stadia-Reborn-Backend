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

    executeQuery = (req)=> {
        let con = null;
        let paramsCounter = Object.keys(req.body).length;
        const params = req.body;
        return new Promise((resolve, reject)=> {
            if(paramsCounter >= 2 && paramsCounter <= 3){
                try {
                    // create a new connection
                    con = this.connection;
                    const queryData = this.createQuery(req, paramsCounter);
                    if(queryData !== process.env.ERRORCODE1401) {
                        // execute query
                        con.query(queryData[0], queryData[1],
                            function (error, results, fields) {
                            if (error) {
                                reject(process.env.ERRORCODE1403);
                            } else {
                                if (results[0].length === 0) {
                                    reject(process.env.ERRORCODE1404);
                                } else {
                                    // return valid data
                                    resolve({response: results[0]})
                                }
                            }
                        });
                    } else {
                        reject(process.env.ERRORCODE1401);
                    }
                } catch (error) {
                    reject(process.env.ERRORCODE1402);
                }
            } else {
                reject(process.env.ERRORCODE1401);
            }
        });
    }

    createQuery = (req, counter)=> {
        
        let executeStoreProcedure = null;

        if(req.body.endpoint === 'login' && counter === 3){
            executeStoreProcedure = this.SPLogin;
            return [executeStoreProcedure, [req.body.username, req.body.password]];
        } else if(req.body.endpoint === 'ownedgames' && counter === 2){
            executeStoreProcedure = this.SPGetUserDataAndGames;
            return [executeStoreProcedure,[req.body.username]];
        } else if(req.body.endpoint === 'games' && counter === 2){
            executeStoreProcedure = this.SPGelAllGames;
            return [executeStoreProcedure,[req.body.username]];
        } else if(req.body.endpoint === 'searchgames' && counter === 2){
            executeStoreProcedure = this.SPSearchForGames;
            return [executeStoreProcedure,[req.body.gameTitle]];
        } else {
            return process.env.ERRORCODE1401;
        }
    }

    submitError = (res, error)=> {
        switch(error){
            case process.env.ERRORCODE1401:
                res.status(401).send({error: process.env.ERRORCODE1401})
                break;
            case process.env.ERRORCODE1402:
                res.status(501).send({error: process.env.ERRORCODE1402})
                break;
            case process.env.ERRORCODE1403:
                res.status(501).send({error: process.env.ERRORCODE1403})
                break;
            case process.env.ERRORCODE1404:
                res.status(501).send({error: process.env.ERRORCODE1404})
                break;
            default:
                res.status(501).send({error: 'Unknown error, please contact the developer'})
        }
    }
}

const DbManager = new DatabaseManager();

module.exports = DbManager;
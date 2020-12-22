const DbManager = require('./dbManager');

class User {

    login = (req, res)=> {
        if(req.body.username !== null && req.body.password !== null) {
            try {
                // create a new connection
                const connection = DbManager.connection;
                // execute query
                connection.query(
                    DbManager.SPLogin,
                    [req.body.username, req.body.password],
                    function (error, results, fields) {
                      if (error) {
                        res.status(501).send({
                          error:
                            "Error code 1403: There was a problem connecting with the Database: " +
                            error,
                        });
                      } else {
                        if (results[0].length === 0) {
                          res.status(401).send({
                            error:
                              "Error code 1404: Wrong username or password, please try again!",
                          });
                        } else {
                          // send back the results
                          res.status(200).send({response: results[0]});
                        }
                      }
                    }
                  );
            } catch (error) {
                res.status(501).send({
                    error:
                      "Error code 1403: There was a problem connecting with the Database: " +
                      error,
                });
            }

        } else {
            res.status('401').send({ error: 'Error code 1401: Invalid credentials'})
        }
    }

    getOwnedGames = (req, res)=> {
        if(req.body.username !== null){
            try {
                // create a new connection
                const connection = DbManager.connection;
                // execute query
                connection.query(
                    DbManager.SPGetUserDataAndGames,
                    [req.body.username],
                    function (error, results, fields) {
                      if (error) {
                        res.status(501).send({
                          error:
                            "Error code 1403: There was a problem connecting with the Database: " +
                            error,
                        });
                      } else {
                        if (results[0].length === 0) {
                          res.status(401).send({
                            error:
                              "Error code 1405: Invalid username",
                          });
                        } else {
                          // send back the results
                          res.status(200).send({response: results[0]});
                        }
                      }
                    }
                  );
            } catch (error) {
                res.status(501).send({
                    error:
                      "Error code 1403: There was a problem connecting with the Database: " +
                      error,
                });
            }
        } else {
            res.status('401').send({ error: 'Error code 1405: Invalid username'})
        }
    }

    getAllGames = (req, res)=> {
      if(req.body.username !== null){
          try {
              // create a new connection
              const connection = DbManager.connection;
              // execute query
              connection.query(
                  DbManager.SPGelAllGames,
                  [req.body.username],
                  function (error, results, fields) {
                    if (error) {
                      res.status(501).send({
                        error:
                          "Error code 1403: There was a problem connecting with the Database: " +
                          error,
                      });
                    } else {
                      if (results[0].length === 0) {
                        res.status(401).send({
                          error:
                            "Error code 1405: Invalid username",
                        });
                      } else {
                        // send back the results
                        res.status(200).send({response: results[0]});
                      }
                    }
                  }
                );
          } catch (error) {
              res.status(501).send({
                  error:
                    "Error code 1403: There was a problem connecting with the Database: " +
                    error,
              });
          }
      } else {
          res.status('401').send({ error: 'Error code 1405: Invalid username'})
      }
  }

  searchForGames = (req, res)=> {
    if(req.body.gameTitle !== null && req.body.gameTitle !== ""){
      try {
        // create a new connection
        const connection = DbManager.connection;
        // execute query
        connection.query(
            DbManager.SPSearchForGames,
            [req.body.gameTitle],
            function (error, results, fields) {
              if (error) {
                res.status(501).send({
                  error:
                    "Error code 1403: There was a problem connecting with the Database: " +
                    error,
                });
              } else {
                if (results[0].length === 0) {
                  res.status(401).send({
                    error:
                      "Error code 1407: No games found",
                  });
                } else {
                  // send back the results
                  res.status(200).send({response: results[0]});
                }
              }
            }
          );
      } catch (error) {
        res.status(501).send({
          error:
            "Error code 1403: There was a problem connecting with the Database: " +
            error,
      });
      }
    } else {
      res.status('401').send({ error: 'Error code 1406: Invalid search term'})
    }
  }

}

const newUser = new User();

module.exports = newUser;
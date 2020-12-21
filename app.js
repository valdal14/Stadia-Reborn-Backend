require("dotenv").config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const DatabaseManager  = require('./dbManager');
const user = require('./user');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// cors config
app.use(cors());

app.post('/login', (req, res)=>{
    user.login(req, res);
});

app.post('/ownedgames', (req, res)=>{
    user.getOwnedGames(req, res);
})

app.post('/games', (req, res)=>{
    user.getAllGames(req, res);
})


app.listen(process.env.PORT, function() {
    console.log("Server Started at port " + process.env.PORT);
});

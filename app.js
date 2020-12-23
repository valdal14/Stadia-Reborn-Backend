require("dotenv").config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const DbManager = require('./dbManager');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// cors config
app.use(cors());

app.post('/login', (req, res)=>{
    DbManager.executeQuery(req).then(data => {
        res.status(201).send(data);
    }).catch(error =>{
        DbManager.submitError(res, error);
    })
});

app.post('/ownedgames', (req, res)=>{
    DbManager.executeQuery(req).then(data => {
        res.status(201).send(data);
    }).catch(error =>{
        DbManager.submitError(res, error);
    })
})

app.post('/games', (req, res)=>{
    DbManager.executeQuery(req).then(data => {
        res.status(201).send(data);
    }).catch(error =>{
        DbManager.submitError(res, error);
    })
})

app.post('/searchgames', (req, res)=>{
    DbManager.executeQuery(req).then(data => {
        res.status(201).send(data);
    }).catch(error =>{
        DbManager.submitError(res, error);
    })
})

app.listen(process.env.PORT, function() {
    console.log("Server Started at port " + process.env.PORT);
});

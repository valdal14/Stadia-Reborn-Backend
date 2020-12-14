require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const DatabaseManager  = require('./stadia');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.listen(process.env.PORT, function() {
    console.log("Server Started at port " + process.env.PORT);
    DatabaseManager.testConnection();
});

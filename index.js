'use strict';
const express = require('express');
const mysql = require('mysql');
// const fs = require('fs');
// const csv = require('csv-parser');
const bodyParser = require('body-parser');
const app = express();
// var async = require('async');

//app.use(express.static('web'));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
//app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
var cors = require('cors');
app.use(cors());

// const db_credentials = require('./db_credentials');
// var conn = mysql.createConnection(db_credentials);

// const courses_code_09 = require('./courses_code_09');

/*APP*/
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Server running at http://localhost:' + port);
});

app.get('/', function (req, res) {
    /*require('dns').lookup(require('os').hostname(), function (err, add, fam) {
        res.send('Server running at ' + add + ':' + port);
    })*/
    res.send('Welcome to FIUSAC');
});
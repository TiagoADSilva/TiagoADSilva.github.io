
'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const fs = require('fs');

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

const router = express.Router();
router.get('/', (req, res) => {
  res.sendFile('/first.html');
});

router.post('/signup', (req, res) => {
  let newEntry = '[ ' + req.body.username + ', ' + req.body.email + ', ' + req.body.message + ' ],\r\n';

  fs.appendFile('mockedcontacts.txt', newEntry, function (err) {
    if (err) throw err;
    res.sendFile(__dirname + '/congratulations.html');
  });
});

app.use(express.static(__dirname))

app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
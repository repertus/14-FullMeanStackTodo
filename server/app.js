'use strict';

var express = require('express');
var parser = require('body-parser');
var router = require('./api/todo');

var app = express();

require('./database');
require('./seed.js');

app.use('/', express.static('client'));
app.use(parser.json());

app.use('/api', router);

app.listen(3000, function() {
    console.log("The server is running on port 3000!");
});
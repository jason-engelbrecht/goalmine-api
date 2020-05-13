var express = require('express');
var router = express.Router();
var db = require('./database');

//TODO api routes

router.get('/', (req, res) => {
    res.send('Hello World');
});

module.exports = router;

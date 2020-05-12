var express = require('express');
var router = express.Router();

//TODO api routes

router.get('/', (req, res) => {
    res.send('Hello World');
});

module.exports = router;

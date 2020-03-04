var express = require('express');
var router = express.Router();
var CountModel = require('./database');

//redirect to count
router.get('/', function(req, res, next) {
  res.redirect('/api/count');
});

//show count
router.get('/count', function(req, res, next) {
  CountModel.findOne({}).exec(function(err, count) {
    if (err) console.log('failure');
    res.json({count});
  });
});

//increment count
router.get('/increment', function(req, res, next) {
  var query = { id: '5e6023d0f8f18e4a78d5d4d9' };
  CountModel.findOneAndUpdate({}, { $inc: {count: 1} }).exec(function(err, count) {
    if (err) console.log('failure');
    res.json({count});
  });
});

module.exports = router;

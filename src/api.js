var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//setup db connection
mongoose.connect('mongodb://localhost:27017/GIFSearch', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected');
});

//create schema and model
var countSchema = new mongoose.Schema({
  count: Number
});
var CountModel = mongoose.model('Count', countSchema, 'Count');

router.get('/', function(req, res, next) {
  CountModel.findOne({}).exec(function(err, count) {
    if (err) console.log('failure');
    res.json({count});
  });
});

module.exports = router;

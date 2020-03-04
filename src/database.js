var mongoose = require('mongoose');

//setup db connection
/*mongoose.connect('mongodb://localhost:27017/GIFSearch', {useNewUrlParser: true, useUnifiedTopology: true});
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

module.exports = CountModel;*/

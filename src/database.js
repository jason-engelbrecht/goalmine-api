var mongoose = require('mongoose');

//setup db connection
mongoose.connect('mongodb://gif-match:RRgDR9Zaz1JqTmSRZLSH9lgqLTYNHwqRDGsldQcDYfdauOUVfWOMheTvbFlcic33Qhj0n8DysoU0FmHvfBNCag%3D%3D@gif-match.mongo.cosmos.azure.com:10255/?ssl=true&appName=@gif-match@', {useNewUrlParser: true, useUnifiedTopology: true});
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

module.exports = CountModel;

var mongojs = require('mongojs');
var databaseUrl = 'mongodb://heroku_556g1lf1:nfdct6fd4c0kuovucfn09m7oq3@ds023475.mlab.com:23475/heroku_556g1lf1';
// var databaseUrl = 'Project';

var collections = ["user"];
var db = mongojs(databaseUrl, collections);

db.on('error', function (err) {
  console.log('MongoDB Error: ', err);
});
db.on('connect', function () {
    console.log('database connected using mongojs');
})
module.exports.mongojs = db;


// Monk -> Mongo Connection
var monk = require('monk');
var db2 = monk('localhost:27017/Project');
var users_table = db2.get('user');
module.exports.monk = users_table;


const mongoose = require('mongoose');
var db3 = mongoose.connection;
// mongoose.connect('mongodb://localhost/Project');
// mongoose.connect('mongodb://localhost:27017/Project');
mongoose.connect('mongodb://heroku_556g1lf1:nfdct6fd4c0kuovucfn09m7oq3@ds023475.mlab.com:23475/heroku_556g1lf1');
mongoose.set('debug', true);
db3.on('error', console.error.bind(console, '# Mongo DB: connection error:'));
module.exports.mongoose = db3;

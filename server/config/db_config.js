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
module.exports = db;
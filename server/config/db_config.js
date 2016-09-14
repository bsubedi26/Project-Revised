var mongojs = require('mongojs');
var databaseUrl = 'REACT';
var collections = ["user"];
var db = mongojs(databaseUrl, collections);
db.on('error', function (err) {
  console.log('MongoDB Error: ', err);
});
db.on('connect', function () {
    console.log('database connected using mongojs');
})
module.exports = db;
var mongojs = require('mongojs');
// var databaseUrl = 'mongodb://heroku_556g1lf1:nfdct6fd4c0kuovucfn09m7oq3@ds023475.mlab.com:23475/heroku_556g1lf1';
var databaseUrl = 'Project';

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
mongoose.connect('mongodb://localhost/Project');
// mongoose.connect('mongodb://localhost:27017/chat');
mongoose.set('debug', true);
db3.on('error', console.error.bind(console, '# Mongo DB: connection error:'));
module.exports.mongoose = db3;

// var Schema = mongoose.Schema;

// // create a schema
// var userSchema = new Schema({
//   name: String,
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   admin: Boolean,
//   location: String,
//   meta: {
//     age: Number,
//     website: String
//   },
//   created_at: Date,
//   updated_at: Date,
//   store:[]
// });

// // the schema is useless so far
// // we need to create a model using it
// var User = mongoose.model('User', userSchema);

// // make this available to our users in our Node applications
// module.exports = User;
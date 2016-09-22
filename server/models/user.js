const mongoose = require('mongoose');
// var db = mongoose.connection;
// mongoose.connect('mongodb://localhost:27017/Project');
// mongoose.set('debug', true);
// db.on('error', console.error.bind(console, '# Mongo DB: connection error:'));
// // module.exports = db;

var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);
// make this available to our users in our Node applications
module.exports = User;
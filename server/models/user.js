const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  midi_token: { type: Number, required: true },
  video_token: { type: Number, required: true }
});

// the schema is useless unless we create a model with it
var User = mongoose.model('User', userSchema);
module.exports = User;
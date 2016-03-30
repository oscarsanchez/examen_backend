var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
  name : String,
  username : {type: String, unique: true, required: true},
  password : String,
  telephone : String,
  status : Boolean,
  scope : String
});

UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', UserSchema);

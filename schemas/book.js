var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
  title : String,
  year : String,
  editorial : String,
  author : String,
});

module.exports = mongoose.model('Book', BookSchema);

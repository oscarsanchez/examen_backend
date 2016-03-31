var mongoose = require('mongoose');

var JobSchema = new mongoose.Schema({
  title : String,
  description : String,
  position : String,
  info : String,
  salary : String,
  cdate : String,
  status : Boolean,
});

module.exports = mongoose.model('Job', JobSchema);

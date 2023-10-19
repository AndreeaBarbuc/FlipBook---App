//Content table/ collection model for writing text dynamically
var mongoose = require('mongoose');

var ContentSchema = new mongoose.Schema({
  id: String,
  text: String,
  uploaded: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Content', ContentSchema);
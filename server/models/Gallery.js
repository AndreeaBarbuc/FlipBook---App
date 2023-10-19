//Gallary table/ collection model for uploading image and description/text for image dynamically

var mongoose = require('mongoose');

var GallerySchema = new mongoose.Schema({
  id: String,
  imageUrl: String,
  imageDesc: String,
  uploaded: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Gallery', GallerySchema);

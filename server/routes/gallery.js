//The endpoints of the routes for gallery received from the frontend, 
//which connect to the database, sending requests to it in order to obtain/send information/data.

var express = require('express'); // Import the Express.js framework
var router = express.Router(); // Create an Express router
var multer = require('multer'); // Import Multer for handling file uploads
var Gallery = require('../models/Gallery.js'); // Import the Gallery model

// Configure storage settings for uploaded files using Multer
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images'); // Set the destination directory for uploaded files
  },
  filename: (req, file, cb) => {
    console.log(file);
    var filetype = '';
    if (file.mimetype === 'image/gif') {
      filetype = 'gif';
    }
    if (file.mimetype === 'image/png') {
      filetype = 'png';
    }
    if (file.mimetype === 'image/jpeg') {
      filetype = 'jpg';
    }
    cb(null, 'image-' + Date.now() + '.' + filetype); // Define the uploaded file's name and extension
  }
});

var upload = multer({ storage: storage }); // Set up Multer middleware using the configured storage

// Handle GET request to retrieve data by ID
router.get('/:id', function (req, res, next) {
  Gallery.findById(req.params.id, function (err, gallery) {
    if (err) return next(err); // Handle errors, if any
    res.json(gallery); // Respond with the gallery data in JSON format
  });
});

// Handle POST request to save data with file upload
router.post('/', upload.single('file'), function (req, res, next) {
  if (!req.file) {
    return res.status(500).send({ message: 'Upload fail' }); // Handle the case where file upload fails
  } else {
    // Build the imageUrl based on the uploaded file's filename and server URL
    req.body.imageUrl = 'http://localhost:3000/images/' + req.file.filename;

    // Create a new gallery entry in the database using the data from the request body
    Gallery.create(req.body, function (err, gallery) {
      if (err) {
        console.log(err); // Log any errors for debugging
        return next(err); // Handle errors, if any
      }
      res.json(gallery); // Respond with the created gallery data in JSON format
    });
  }
});

module.exports = router; // Export the router for use in other parts of the application

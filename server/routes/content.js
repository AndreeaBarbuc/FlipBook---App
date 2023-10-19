//The endpoints of the routes for content received from the frontend, 
//which connect to the database, sending requests to it in order to obtain/send information/data.

var express = require('express');
var router = express.Router();
var Content = require('../models/Content.js'); // Import the Content model

// Get data by ID
router.get('/:id', function (req, res, next) {
  // Find content in the database by its ID
  Content.findById(req.params.id, function (err, content) {
    if (err) return next(err); // Handle errors, if any
    res.json(content); // Respond with the content data in JSON format
  });
});

// Post (create) data
router.post('/', function (req, res, next) {
  // Create a new content entry in the database using the data from the request body
  Content.create(req.body, function (err, content) {
    if (err) {
      console.log(err); // Log any errors for debugging
      return next(err); // Handle errors, if any
    }
    res.json(content); // Respond with the created content data in JSON format
  });
});

// Get all contents
router.get('/content', async (req, res) => {
  try {
    // Retrieve all contents from the database using the Content model
    const contents = await Content.find({}).toArray();
    res.json(contents); // Respond with the contents data in JSON format
  } catch (err) {
    res.status(500).json({ message: err.message }); // Handle errors and respond with an error message
  }
});

module.exports = router; // Export the router for use in other parts of the application

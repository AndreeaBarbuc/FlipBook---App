//run this file in order to start the server through 'npm start', 
//here we connect to DB and manipulate in the first instance the imports and exports

var express = require('express'); // Import the Express.js framework
var path = require('path'); // Import the path module for handling file paths
var cookieParser = require('cookie-parser'); // Import the cookie-parser middleware
var logger = require('morgan'); // Import the morgan logger middleware
var cors = require('cors'); // Import the CORS (Cross-Origin Resource Sharing) middleware
var mongoose = require('mongoose'); // Import Mongoose for MongoDB interaction

// Import route handlers for different parts of the application
var indexRouter = require('./routes/index'); // Import the index router
var usersRouter = require('./routes/users'); // Import the users router
var galleryRouter = require('./routes/gallery'); // Import the gallery router
var contentRouter = require('./routes/content'); // Import the content router

var app = express(); // Create an instance of the Express application

// Connect to the MongoDB database using Mongoose
mongoose.connect('mongodb+srv://flipbook:Invata!@flipbook.4ljyqyk.mongodb.net/meanStackApp?retryWrites=true&w=majority', {
  promiseLibrary: require('bluebird'), // Use the Bluebird promise library
  useNewUrlParser: true, // Use the new URL parser
  useUnifiedTopology: true, // Use the new Server Discovery and Monitoring engine
  useCreateIndex: true, // Use the createIndex function
}).then(() => console.log('connection successful')) // Log a successful database connection
  .catch((err) => console.error(err)); // Log any errors during the database connection

app.use(logger('dev')); // Use the Morgan logger middleware with 'dev' format
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded request bodies
app.use(cookieParser()); // Use the cookie-parser middleware
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory
app.use(cors()); // Enable CORS to handle cross-origin requests

// Define the route handlers for different parts of the application
app.use('/', indexRouter); // Use the index router for the root route
app.use('/users', usersRouter); // Use the users router for '/users' routes
app.use('/gallery', galleryRouter); // Use the gallery router for '/gallery' routes
app.use("/content", contentRouter); // Use the content router for '/content' routes

module.exports = app; // Export the Express app instance for use in the Node.js application

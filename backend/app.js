const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

// Create express server
const app = express();
const server = http.createServer(app);

// Configure dotenv
require('dotenv').config();

// Import all other API's that are going to be used
const contactMeAPI = require('./routes/api/home/contact-me');
const mosaicAPI = require('./routes/api/mosaic/mosaic');

// Import all other sockets that are going to be used (they will automatically listen)


// Set the app to use some libraries
app.use(cors());
app.use(bodyParser.json());

// Set the app to use the imported API's
app.use('/api/home/contact-me', contactMeAPI);
app.use('/api/mosaic', mosaicAPI);

// Serve up files from the build directory
app.use(express.static(path.join(__dirname, '../build')));

// The home page
app.get(/^\/(?!api).*/, function(req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// Listen on the specified port for traffic
app.listen(process.env.WEBSITE_PORT, function() {
    console.log('Server is running on Port: ' + process.env.WEBSITE_PORT);
});
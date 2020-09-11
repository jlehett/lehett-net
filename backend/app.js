const express = require('express');
const app = express();
const server = http.createServer(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("This is from express.js");
});

app.listen(PORT, function() {
    console.log('Server is running on Port: ' + PORT);
});
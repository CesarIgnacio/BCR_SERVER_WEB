const express = require('express');
//import the controller for rendering the pages
const dataController = require('../controllers/dataController');
// Import the filesystem module
const fs = require('fs');
const router = express.Router();


// Collects the all files names stored in the directory ./dev-data/img
let audios = [];
// Intent to read /img directory content - CIP
fs.readdirSync('./dev-data/audio').forEach(file => {
	audios.push(file);
});


// Root address. Authentication and Render Overview
//Routes HTTP GET requests to the specified path with the specified callback functions.
router.get('/', (req, res) => {
	res.status(200).render('audio');
});


//Export the entire module
module.exports = router;
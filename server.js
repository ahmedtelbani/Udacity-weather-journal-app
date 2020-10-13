// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Server Port
const port = 3000;

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const server = app.listen(port, listening);

// listening callback function
function listening(){
    console.log(`Server is Running on localhost: ${port}`);
}

// GET
app.get('/all', sendData);

// callback function to complete GET '/all'
function sendData(req, res){
    res.send(projectData);
    // make sure the projectData empty after every operation
    projectData = [];
}

// POST route
app.post('/add', addData);

function addData(req, res){
    console.log(req.body);
    // add data to projectData
    newEntry = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content
    }
    projectData.push(newEntry);
}

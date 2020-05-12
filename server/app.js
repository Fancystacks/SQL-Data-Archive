const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const dotenv = require("dotenv").config();
const app = express();

const dbService = require('./db');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// create
app.post('/insert', (request, response) => {
    console.log(request.body);
  });

// read
app.get('/getPosts', (request, response) => {
    const db = dbService.getServiceInstance();
    const result =  db.getAllData();

    result.then(data => response.json({data : data}))
    .catch(err => console.log(err));
  });

// update
// app.put('/:id', function (req, res) {

//   });

// delete
// app.delete('/:id', function (req, res) {

//   });

app.listen(PORT, function() {
    console.log(`Server listening on: http://localhost:${PORT}`);
  });
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv');
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// create
app.post('/insert', (request, response) => {
  });

// read
app.get('/getPosts', (request, response) => {
    response.json({
        success: true
    });
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
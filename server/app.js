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
  const { name } = request.body;
  const db = dbService.getServiceInstance();
  const result = db.insertNewName(name);
  result.then(data => response.json({ data: data }))
    .catch(err => console.log(err));
});

// read
app.get('/getPosts', (request, response) => {
  const db = dbService.getServiceInstance();
  const result = db.getAllData();

  result.then(data => response.json({ data: data }))
    .catch(err => console.log(err));
});

// update
app.patch('/update', function (request, response) {
  const db = dbService.getServiceInstance();
  const { id, name } = request.body;
  const result = db.editName(id, name);

  result.then(data => response.json({ success: data }))
    .catch(err => console.log(err));
});

// delete
app.delete('/delete/:id', function (request, response) {
  const { id } = request.params;
  const db = dbService.getServiceInstance();
  const result = db.deleteRow(id);

  result.then(data => response.json({ success: data }))
    .catch(err => console.log(err));
});

app.get('/search/:name', function (request, response) {
  const { name } = request.params;
  const db = dbService.getServiceInstance();
  const result = db.searchName(name);

  result.then(data => response.json({ data: data }))
    .catch(err => console.log(err));
});

app.listen(PORT, function () {
  console.log(`Server listening on: http://localhost:${PORT}`);
});
// server/index.js

const express = require("express");
const path = require('path');
const bodyParser = require("body-parser")
require('dotenv').config();
const http = require('http');

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const PORT = process.env.PORT || 3001;

const app = express();

const server = http.createServer(app);

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));


// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
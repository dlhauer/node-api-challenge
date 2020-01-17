const express = require('express');

const server = express();
server.use(express.json());


server.get('/', (req, res) => {
  res.send(`<h1>Let's get this party started!</h1>`);
});

module.exports = server;
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  const message = 'hello';
  res.json({
    message,
  });
});

module.exports = app;

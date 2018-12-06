const express = require('express');
const { newGame } = require('./src/game');
const paramCheck = require('./paramCheck');
const app = express();


app.get('/game/:size', paramCheck, (req, res) => {
  res.json({ ...newGame(req.params.size) });
});

module.exports = app;

const express = require('express');
const game = require('./src/game');
const paramCheck = require('./paramCheck');
const app = express();


app.get('/game/:size', paramCheck, (req, res) => {
  res.json({
    pictures: game.getPictures(req.params.size),
    token: game.getToken(),
  });
});

module.exports = app;

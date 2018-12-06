const express = require('express');
const bodyParser = require('body-parser');
const { newGame } = require('./src/game');
const newGameParamCheck = require('./newGameParamCheck');
const scoreParamCheck = require('./scoreParamCheck');
const app = express();

app.use(bodyParser.json());

app.get('/game/:size', newGameParamCheck, (req, res) => {
  res.json({ ...newGame(req.params.size) });
});

app.post('/score', scoreParamCheck, (req, res) => {
  res.json({
    position: 0,
  });
})

module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');
const { newGame, getPosition, highScores } = require('./src/game');
const newGameParamCheck = require('./middlewares/newGameParamCheck');
const scoreParamCheck = require('./middlewares/scoreParamCheck');
const app = express();

app.use(bodyParser.json());

app.get('/game/:size', newGameParamCheck, (req, res) => {
  res.json({ ...newGame(req.params.size) });
});

app.post('/score', scoreParamCheck, (req, res) => {
  res.json({ ...getPosition(req.body) });
})

app.get('/score', (req, res) => {
    res.json([ ...highScores() ]);
  })

module.exports = app;

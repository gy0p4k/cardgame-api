const uuid = require('uuid/v1');
const { isPositiveInteger } = require('./utils');
const {
  deck,
  saveGame,
  getGameByToken,
  saveScore,
  calculatePosition,
  getOrderedScores,
} = require('./db');

const getToken = () => uuid();
const getPictures = count => deck.slice(0, count);

const game = module.exports = {};

game.isValidSize = size => size && isPositiveInteger(size);
game.isStarted = token => getGameByToken(token);

game.newGame = size => {
  const game = {
    pictures: getPictures(size),
    token: getToken(),
  };
  saveGame(game);
  return game;
};

game.highScores = () => (
  getOrderedScores()
    .map(score => Object.assign({}, score, { token: undefined }))
);

game.getPosition = newScore => {
  saveScore(newScore);
  return calculatePosition(newScore.token);
};
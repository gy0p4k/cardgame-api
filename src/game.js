const uuid = require('uuid/v1');

const utils = require('./utils');
const { deck, saveGame } = require('./db');

const game = module.exports = {};

const getToken = () => uuid();
const getPictures = count => deck.slice(0, count);

game.newGame = size => {
  const game = {
    pictures: getPictures(size),
    token: getToken(),
  };
  saveGame(game);
  return game;
};

game.isValidSize = size => size && utils.isPositiveInteger(size);
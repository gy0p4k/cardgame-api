const uuid = require('uuid/v1');

const utils = require('./utils');
const { deck } = require('./db');

const game = module.exports = {};

game.isValidSize = size => size && utils.isPositiveInteger(size);

game.getToken = () => uuid();

game.getPictures = count => deck.slice(0, count);

const utils = require('./utils');

const game = module.exports = {};

game.isValidSize = size => size && utils.isPositiveInteger(size);

game.getToken = () => 'dwa';

game.getPictures = count => Array.from('foo');

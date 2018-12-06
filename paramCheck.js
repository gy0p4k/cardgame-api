const game = require('./src/game');

const isParamOk = size => size && game.isValidSize(size);

module.exports = (req, res, next) => isParamOk(req.params.size) ? next() : res.status(400).send();

const game = require('./src/game');

const isParamOk = size => size && game.isValidSize(size);

const validate = (req, res, next) => (
  isParamOk(req.params.size) ? next() : res.status(400).send()
);

const needValidation = url => url.includes('/game/');

module.exports = (req, res, next) => {
  needValidation(req.path) ? validate(req, res, next) : next()
}

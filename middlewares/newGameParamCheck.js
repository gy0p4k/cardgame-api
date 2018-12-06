const { isValidSize } = require('../src/game');

const isParamOk = size => size && isValidSize(size);

module.exports = (req, res, next) => (
  isParamOk(req.params.size) ? next() : res.status(400).send()
);

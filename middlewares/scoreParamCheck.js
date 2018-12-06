const { isStarted } = require('../src/game');
const requiredParams = [
  'steps',
  'seconds',
  'name',
  'token'
];

const allParamValid = (toValitate) => !(
  requiredParams.map(e => toValitate.hasOwnProperty(e)).includes(false)
);

const validate = (params) => (
  allParamValid(params) && isStarted(params.token)
);

module.exports = (req, res, next) => (
  validate(req.body) ? next() : res.status(400).send()
);

const utils = module.exports = {};

utils.isPositiveInteger = (value) => {
  const number = parseInt(value, 10);
  return Number.isInteger(number) && number > 0;
}

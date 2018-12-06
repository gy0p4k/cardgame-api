const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const { deckSize, mockCardLength } = require('../settings');

const chars = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"];
const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ games: [], scores: [] })
  .write()

const randomCard = () => [...Array(mockCardLength)].map(i=>chars[Math.random()*chars.length|0]).join``;

const isBetterResult = (a, b) => {
  if(a.steps === b.steps) {
    console.log(a.seconds, b.seconds)
    return a.seconds > b.seconds;
  } else {
    return a.steps > b.steps
  }
}

const dbLayer = module.exports = {};

dbLayer.deck = Array(deckSize).fill('').map(() => randomCard());

dbLayer.saveGame = game => (
  db.get('games')
    .push(game)
    .write()
);

dbLayer.saveScore = newScore => (
  db.get('scores')
    .push(newScore)
    .write()
);

dbLayer.getGameByToken = token => (
  db.get('games')
    .find({ token })
    .value()
);

dbLayer.getOrderedScores = () => (
  db.get('scores')
    .value()
    .sort((a, b) => isBetterResult(a, b) ? 1 : -1)
    .map(score => Object.assign({}, score, { token: undefined }))
);

dbLayer.calculatePosition = token => ({
  position: 0,
});

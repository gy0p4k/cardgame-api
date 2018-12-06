const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const { deckSize, mockCardLength } = require('../settings');

const chars = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"];
const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ games: [] })
  .write()

const randomCard = () => [...Array(mockCardLength)].map(i=>chars[Math.random()*chars.length|0]).join``;

const dbLayer = module.exports = {};

dbLayer.deck = Array(deckSize).fill('').map(() => randomCard());

dbLayer.saveGame = game => (
  db.get('games')
    .push(game)
    .write()
);

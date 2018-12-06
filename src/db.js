const { deckSize, mockCardLength } = require('../settings');

const db = module.exports = {};

const chars = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"];

const randomCard = () => [...Array(mockCardLength)].map(i=>chars[Math.random()*chars.length|0]).join``;

db.deck = Array(deckSize).fill('').map(() => randomCard());

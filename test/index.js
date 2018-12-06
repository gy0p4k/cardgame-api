const request = require('supertest');
const test = require('tape');
const app = require('../app');

test('GET / game with wrong params', (t) => {
  const expectedResponse = 400;
  request(app)
    .get('/game/dwa')
    .end((err, res) => {
      t.equal(res.status, expectedResponse, `response code is ${expectedResponse}`);
    });
  request(app)
    .get('/game/-4')
    .end((err, res) => {
      t.equal(res.status, expectedResponse, `response code is ${expectedResponse}`);
      t.end();
    });
});

test('GET / game with correct param', (t) => {
  const expectedResponse = 200;
  request(app)
    .get('/game/4')
    .end((err, res) => {
      const { pictures, token } = res.body;
      console.log(res.body);
      t.equal(res.status, expectedResponse, `response code is ${expectedResponse}`);
      t.ok(Array.isArray(pictures), 'pictures should be array');
      t.ok(typeof token === 'string' || token instanceof String, 'token should be string');
      t.end();
    });
});
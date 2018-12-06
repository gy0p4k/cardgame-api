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
  const expectedPictureLength = 5;
  request(app)
    .get(`/game/${expectedPictureLength}`)
    .end((err, res) => {
      const { pictures, token } = res.body;
      t.equal(res.status, expectedResponse, `response code is ${expectedResponse}`);
      t.ok(Array.isArray(pictures), 'pictures should be array');
      t.equal(pictures.length, expectedPictureLength, 'picture arr size should be expected');
      t.ok(typeof token === 'string' || token instanceof String, 'token should be string');
      t.end();
    });
});

test('POST / score with missing params', (t) => {
  const expectedResponse = 400;
  const mockBody = {
    name: 'hello',
    steps: 5,
  }
  request(app)
    .post(`/score`)
    .send(mockBody)
    .end((err, res) => {
      t.equal(res.status, expectedResponse, `response code is ${expectedResponse}`);
      t.end();
    });
});

test('POST / score with all params, wrong token', (t) => {
  const expectedResponse = 400;
  const mockBody = {
    name: 'hello',
    token: 'dwa',
    steps: 5,
    seconds: 4,
  }
  request(app)
    .post(`/score`)
    .send(mockBody)
    .end((err, res) => {
      t.equal(res.status, expectedResponse, `response code is ${expectedResponse}`);
      t.end();
    });
});

test('POST / score with all params, valid token', (t) => {
  const expectedResponse = 200;
  const expectedPictureLength = 5;
  request(app)
    .get(`/game/${expectedPictureLength}`)
    .end((err, tokenRes) => {
      const { token } = tokenRes.body;
      const mockBody = {
        name: 'hello',
        token,
        steps: 5,
        seconds: 4,
      }
      request(app)
        .post(`/score`)
        .send(mockBody)
        .end((err, res) => {
          const { position } = res.body;
          const expectedPosition = 0;
          t.equal(res.status, expectedResponse, `response code is ${expectedResponse}`);
          t.equal(position, expectedPosition, `position should be ${expectedPosition}`);
          t.end();
        })
    });
});
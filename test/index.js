const request = require('supertest');
const test = require('tape');
const app = require('../app');

test('GET / happy', (t) => {
  const expectedResponse = 200;
  const expectedPayload = 'hello';
  request(app)
    .get('/')
    .end((err, res) => {
      t.equal(res.status, expectedResponse, `response code is ${expectedResponse}`);
      t.equal(res.body.message, expectedPayload, `payload is ${expectedPayload}`);
      t.end();
    });
});
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('../server');

describe('GET /api/convert', () => {
  it('converts a valid input such as 10L', async () => {
    const response = await request(app).get('/api/convert').query({ input: '10L' });
    assert.equal(response.status, 200);
    assert.deepEqual(response.body, {
      initNum: 10,
      initUnit: 'L',
      returnNum: 2.64172,
      returnUnit: 'gal',
      string: '10 liters converts to 2.64172 gallons'
    });
  });

  it('returns an error for an invalid unit', async () => {
    const response = await request(app).get('/api/convert').query({ input: '32g' });
    assert.equal(response.status, 200);
    assert.equal(response.body.error, 'invalid unit');
  });

  it('returns an error for an invalid number', async () => {
    const response = await request(app).get('/api/convert').query({ input: '3/7.2/4kg' });
    assert.equal(response.status, 200);
    assert.equal(response.body.error, 'invalid number');
  });

  it('reports invalid number and unit together', async () => {
    const response = await request(app).get('/api/convert')
      .query({ input: '3/7.2/4kilomegagram' });
    assert.equal(response.status, 200);
    assert.equal(response.body.error, 'invalid number and unit');
  });

  it('defaults the number to 1 when the input is just a unit', async () => {
    const response = await request(app).get('/api/convert').query({ input: 'kg' });
    assert.equal(response.status, 200);
    assert.deepEqual(response.body, {
      initNum: 1,
      initUnit: 'kg',
      returnNum: 2.20462,
      returnUnit: 'lbs',
      string: '1 kilograms converts to 2.20462 pounds'
    });
  });
});

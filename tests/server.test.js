/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../server/app.js');
const { sampleResponseData } = require('../db/__mocks__/index.js');

jest.mock('../db/index.js');

describe('API: get images', () => {
  it('should have a status code of 200 and a body that is an array of image objects', (done) => {
    request(app).get('/api/restaurants/r1/images')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(sampleResponseData);
        done();
      });
  });

  it('should have a status code of 500 for an unknown error', (done) => {
    request(app).get('/api/restaurants/willThrowError/images')
      .then((response) => {
        expect(response.statusCode).toBe(500);
        expect(response.body.error).toBe('Unknown error');
        done();
      });
  });
});

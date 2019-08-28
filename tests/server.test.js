/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../server/app.js');
const { sampleResponseData } = require('../db/__mocks__/index.js');

jest.mock('../db/index.js');

describe('API: get images', () => {
  it('should have a status code of 200 and a body that is an array of image objects', (done) => {
    request(app).get('/api/restaurants/1/images')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(sampleResponseData);
        done();
      });
  });

  it('should have a status code of 400 and receive an error message when requesting data from a restaurant that does not exist in the database', (done) => {
    request(app).get('/api/restaurants/101/images')
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('No images found for this restaurant');
        done();
      });
  });
});

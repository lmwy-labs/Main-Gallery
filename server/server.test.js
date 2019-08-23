const request = require('supertest');
const app = require('./app.js');

describe('test the get images path', () => {
  it('should have a status code of 200 and a defined body on response', () => {
    return request(app).get('/api/restaurants/1/images')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
    });
  });
});

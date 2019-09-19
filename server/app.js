/* eslint-disable no-restricted-syntax */
const express = require('express');
const path = require('path');
const compression = require('compression');
const morgan = require('morgan');
const moment = require('moment');
const bodyParser = require('body-parser');
const cassandraControl = require('../database/cassandraQueries.js');
// const db = require('../db/index.js');

const app = express();
app.use(bodyParser.json());
app.use(morgan());
app.use(compression());
app.use('/restaurants/:rid', express.static(path.resolve(__dirname, '../public')));

app.get('/api/restaurants/:rid/images', (req, res) => {
  cassandraControl.getRestaurant(req.params.rid)
    .then((docs) => {
      const reformattedDocs = docs.rows.map((imageDetails) => {
        for (const key in imageDetails) {
          if (key === 'restaurant_name') {
            imageDetails.restaurantId = imageDetails[key];
            delete imageDetails[key];
          } else if (key === 'picture_date') {
            const formattedDate = moment(imageDetails[key]).utc();
            imageDetails.date = formattedDate;
            delete imageDetails[key];
          }
        }
        return imageDetails;
      });
      res.send(reformattedDocs);
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
});

app.post('/api/restaurants/:rid/images', (req, res) => {
  cassandraControl.postRestaurant(req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
});

app.put('/api/restaurants/:rid/images/:imageId', (req, res) => {
  cassandraControl.updateRestaurant(req.body, req.params.rid, req.params.imageId)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
});

app.delete('/api/restaurants/:rid/images/:imageId', (req, res) => {
  cassandraControl.deleteRestaurant(req.params.rid, req.params.imageId)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
});

module.exports = app;

/* eslint-disable no-restricted-syntax */
const express = require('express');
const path = require('path');
const compression = require('compression');
const morgan = require('morgan');
const moment = require('moment');
const cassandraControl = require('../database/cassandraQueries.js');
const db = require('../db/index.js');

const app = express();
app.use(morgan());
app.use(compression());
app.use('/restaurants/:rid', express.static(path.resolve(__dirname, '../public')));

app.get('/api/restaurants/:rid/images', (req, res) => {
  // db.getImages(req.params.rid, (err, docs) => {
  //   if (err) {
  //     res.status(500).send({ error: err });
  //   }
  //   res.set('Access-Control-Allow-Origin', '*');
  //   res.status(200).send(docs);
  // });
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
  res.sendStatus(200);
});

app.put('/api/restaurants/:rid/images', (req, res) => {
  res.sendStatus(200);
});

app.delete('/api/restaurants/:rid/images', (req, res) => {
  res.sendStatus(202);
});

module.exports = app;

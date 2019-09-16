const express = require('express');
const path = require('path');
const compression = require('compression');
const morgan = require('morgan');


const db = require('../db/index.js');

const app = express();
app.use(morgan());
app.use(compression());
app.use('/restaurants/:rid', express.static(path.resolve(__dirname, '../public')));

app.get('/api/restaurants/:rid/images', (req, res) => {
  console.log('hi');
  db.getImages(req.params.rid, (err, docs) => {
    if (err) {
      res.status(500).send({ error: err });
    }

    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).send(docs);
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

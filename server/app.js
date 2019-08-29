const express = require('express');
const path = require('path');
const db = require('../db/index.js');

const app = express();
app.use('/restaurants/:rid', express.static(path.resolve(__dirname, '../public')));

app.get('/api/restaurants/:rid/images', (req, res) => {
  db.getImages(req.params.rid, (err, docs) => {
    if (err) {
      res.status(500).send({ error: err });
    }

    res.status(200).send(docs);
  });
});

module.exports = app;

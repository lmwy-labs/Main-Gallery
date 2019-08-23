const express = require('express');
const path = require('path');
const db = require('../db/index.js');

const app = express();
const port = 3000;

app.use('/restaurants/:rid', express.static(path.resolve(__dirname, '../public')));

app.get('/api/restaurants/:rid/images', (req, res) => {
  db.getImages(req.params.rid, (err, docs) => {
    if (err) {
      console.log(err);
      res.end();
    }
    
    res.send(docs);
  });
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

const express = require('express');
const path = require('path');
const db = require('../db/index.js');
const app = express();
const port = 3000;

app.use(express.static(path.resolve(__dirname, '../public')));
app.listen(port, () => console.log(`App is listening on port ${port}`));

app.get('/benu', (req, res) => {
  db.getImages((err, docs) => {
    if (err) {
      console.log(err);
      res.end();
    }

    res.send(docs);
  });
});

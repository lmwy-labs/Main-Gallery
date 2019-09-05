const mongoose = require('mongoose');

mongoose.connect('mongodb://database/otimages', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB!');
});

const imageSchema = new mongoose.Schema({
  restaurantId: String,
  url: String,
  name: String,
  source: String,
  date: Date,
  photographer: String,
});

const Image = mongoose.model('Image', imageSchema);

const getImages = (rid, cb) => {
  Image.find({ restaurantId: rid }, (err, docs) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, docs);
    }
  });
};

module.exports.getImages = getImages;

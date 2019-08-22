const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/otimages', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB!');
});

const imageSchema = new mongoose.Schema({
  restaurantId: Number,
  url: String,
  name: String,
  type: String,
  data: Date,
  photographer: String,
});

const Image = mongoose.model('Image', imageSchema);

Image.deleteMany({}, (err) => {
  if (err) {
    console.log(err);
  }
});

const benuImageURLs = [
  'https://resizer.otstatic.com/v2/photos/large/25162646.jpg',
  'https://resizer.otstatic.com/v2/photos/large/23369781.jpg',
  'https://resizer.otstatic.com/v2/photos/large/23369775.jpg',
  'https://resizer.otstatic.com/v2/photos/large/25162645.jpg',
  'https://resizer.otstatic.com/v2/photos/large/25841202.jpg',
  'https://resizer.otstatic.com/v2/photos/large/25841200.jpg',
  'https://resizer.otstatic.com/v2/photos/large/23369782.jpg',
  'https://resizer.otstatic.com/v2/photos/large/25841201.jpg',
  'https://resizer.otstatic.com/v2/photos/large/25841199.jpg',
];

benuImageURLs.forEach((url) => {
  const image = new Image({
    url,
    restaurantId: 1
  });

  image.save((err) => {
    if (err) {
      console.log(err);
    }
  });
});

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

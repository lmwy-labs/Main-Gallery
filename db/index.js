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
  source: String,
  date: Date,
  photographer: String,
});

const Image = mongoose.model('Image', imageSchema);

Image.deleteMany({}, (err) => {
  if (err) {
    console.log(err);
  }
});

const alts = [
  'Tacos with lime',
  'Spoons with seasonings',
];

const seedImagesForRestaurant = (rid) => {
  let i = 0;
  let image;
  while (i < 20) {
    image = new Image({
      url: i % 2 === 0 ? `https://lmwy-labs-ot-images.s3-us-west-1.amazonaws.com/${rid}.jpeg` : 'https://lmwy-labs-ot-images.s3-us-west-1.amazonaws.com/sample.jpeg',
      restaurantId: rid,
      name: i % 2 === 0 ? alts[rid] : 'Loaded potato wedges',
    });

    image.save((err) => {
      if (err) {
        console.log(err);
      }
    });
    i += 1;
  }
};

let i = 0;
while (i < 2) {
  seedImagesForRestaurant(i);
  i += 1;
}

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

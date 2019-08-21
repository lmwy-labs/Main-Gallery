const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/otimages', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB!');
});

const imageSchema = new mongoose.Schema({
  url: String,
  name: String,
  type: String,
  data: Date,
  photographer: String,
});

const Image = mongoose.model('Image', imageSchema);

Image.deleteMany({}, (err) => {
  if (err) return console.error(err);
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
  let image = new Image({ url });
  image.save((err) => {
    if (err) return console.error(err);
  });
});
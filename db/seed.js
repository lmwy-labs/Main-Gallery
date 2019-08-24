const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/otimages', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB!');

  const imageSchema = new mongoose.Schema({
    restaurantId: String,
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

  const seedImagesForRestaurant = (rid) => {
    if (rid > 100) {
      console.log('Completed!');
      mongoose.disconnect();
      return;
    }

    const save = (i) => {
      if (i > 20) {
        console.log(`Seeded r${rid}`);
        seedImagesForRestaurant(rid + 1);
        return;
      }

      const image = new Image({
        url: i % 2 === 1 ? `https://lmwy-labs-ot-images.s3-us-west-1.amazonaws.com/${rid}.jpg` : 'https://lmwy-labs-ot-images.s3-us-west-1.amazonaws.com/2.jpeg',
        restaurantId: `r${rid}`,
      });
      image.save((err) => {
        if (err) {
          console.log(err);
        } else {
          save(i + 1);
        }
      });
    };

    save(1);
  };

  seedImagesForRestaurant(1);
});

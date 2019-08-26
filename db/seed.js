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

  const randomNumbers = [];
  for (let i = 0; i < 101; i += 1) {
    randomNumbers.push(Math.floor(Math.random() * 91) + 10);
  }

  const seedRestaurantFxns = [];
  for (let rid = 1; rid < 101; rid += 1) {
    const seedRestaurantFxn = () => {
      const saveDocumentFxns = [];
      for (let i = 0; i < randomNumbers[rid]; i += 1) {
        const saveDocumentFxn = () => {
          const image = new Image({
            url: i % 2 === 0 ? `https://lmwy-labs-ot-images.s3-us-west-1.amazonaws.com/${rid}.jpg` : 'https://lmwy-labs-ot-images.s3-us-west-1.amazonaws.com/2.jpeg',
            restaurantId: `r${rid}`,
          });
          image.save((err) => {
            if (err) {
              console.log(err);
            }
          });
        };
        saveDocumentFxns.push(saveDocumentFxn);
      }
      saveDocumentFxns.reduce((p, f) => p.then(f), Promise.resolve());
    };
    seedRestaurantFxns.push(seedRestaurantFxn);
  }

  seedRestaurantFxns.reduce((p, f) => p.then(f), Promise.resolve());
  setTimeout(() => {
    console.log('Completed');
    mongoose.disconnect();
  });
});

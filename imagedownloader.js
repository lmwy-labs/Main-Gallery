const download = require('image-downloader');

const restauranttypes = ['indiancuisine', 'chinesecuisine', 'vietnamesecuisine', 'spanishcuisine', 'japanesecuisine', 'soulfood', 'thaicuisine', 'mexicancuisine', 'frenchcuisine', 'italiancuisine', 'germancuisine', 'greekcuisine', 'turkishcuisine', 'americancuisine', 'seafood', 'finedining', 'taiwanesecuisine', 'sushi'];


for (let i = 801; i < 901; i++) {
  const name = restauranttypes[Math.floor(Math.random() * restauranttypes.length)];
  console.log(name);
  const options = {
    url: `https://loremflickr.com/526/526/${name}`,
    dest: `./images/${i}.jpg`,
  };

  download.image(options)
    .then(({ filename, image }) => {
      console.log('Saved to', filename);
    })
    .catch((err) => console.error(err));
}

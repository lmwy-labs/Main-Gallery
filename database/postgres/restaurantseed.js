const fs = require('fs');

const restaurantSeed = fs.createWriteStream('./database/postgres/restaurantseed.csv');
restaurantSeed.write('r_id,restaurant_name\n', 'utf8');


const writeData = (writer, encoding, callback) => {
  let i = 10000000;
  const write = () => {
    let ok = true;
    while (i > 0 && ok) {
      i--;

      const rId = i + 1;
      const restaurantName = `r${i + 1}`;

      const data = `${rId},${restaurantName}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
      if (i % 100000 === 0) {
        console.log(i);
      }
    }
    if (i > 0) {
      writer.once('drain', write);
    }
  };
  write();
};

writeData(restaurantSeed, 'utf-8', () => {
  restaurantSeed.end();
});

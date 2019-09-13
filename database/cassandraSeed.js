/* eslint-disable import/no-extraneous-dependencies */
const cassandra = require('cassandra-driver');
const generateImagesPerRestaurant = require('./seedIndex.js');

const client = new cassandra.Client({ contactPoints: ['127.0.0.1:9042'], localDataCenter: 'datacenter1', keyspace: 'restaurant_images' });

const query = 'INSERT INTO restaurants (r_id, restaurant_name, url, source, picture_date, photographer, name) VALUES (?, ?, ?, ?, ?, ?, ?)';

// const batchQueries = (count) => {
//   if (count === 1000001) {
//     console.log('amillion made');
//     return;
//   }
//   if (count % 1000 === 0) {
//     console.log(count);
//   }
//   const queries = generateImagesPerRestaurant(query, count);

//   client.batch(queries, { prepare: true })
//     .catch((err) => {
//       console.log('error with batching', err);
//     })
//     .then(() => {
//       count++;
//       return batchQueries(count);
//     });
// };

// batchQueries(1);

async function concurrentQueries(count) {
  const queries = generateImagesPerRestaurant(count);
  const result = await cassandra.concurrent.executeConcurrent(client, query, queries);
  console.log(result);
  return result;
}

concurrentQueries(1);

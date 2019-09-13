/* eslint-disable import/no-extraneous-dependencies */
const cassandra = require('cassandra-driver');
const generateImagesPerRestaurant = require('./seedIndex.js');

const client = new cassandra.Client({ contactPoints: ['127.0.0.1:9042'], localDataCenter: 'datacenter1', keyspace: 'restaurant_images' });

const query = 'INSERT INTO restaurants (r_id, restaurant_name, url, source, picture_date, photographer, name) VALUES (?, ?, ?, ?, ?, ?, ?)';

const batchQueries = (count) => {
  if (count === 5000001) {
    console.log('5million up');
    return;
  }
  if (count % 10000 === 0) {
    console.log(count);
  }
  const queries = generateImagesPerRestaurant(query, count);

  client.batch(queries, { prepare: true })
    .then(() => {
      count++;
      return batchQueries(count);
    })
    .catch((err) => {
      console.log('error with batching forwards', err);
      return batchQueries(count);
    });
};

batchQueries(1);

const batchQueriesBack = (backCount) => {
  if (backCount === 5000000) {
    console.log('5million down');
    return;
  }
  if (backCount % 10000 === 0) {
    console.log('back', backCount);
  }
  const queries = generateImagesPerRestaurant(query, backCount);

  client.batch(queries, { prepare: true })
    .then(() => {
      backCount--;
      return batchQueriesBack(backCount);
    })
    .catch((err) => {
      console.log('error with batching backwards', err);
      return batchQueriesBack(backCount);
    });
};

batchQueriesBack(10000000);

// run back and forward in parllel
// run in parallel 592000 in 5 min.


// 5min iabout 320000 batch 1000;
// 5 min 10 sec about 360000 batch 300;
// 5 min 10 sec to load bout 360001 batch 100
// 5 min to load about 340001 batch 50
// 5 min to load about 334081 batch 10
// see how many arrays you can insert concurrently (test)
// function concurrentQueries(count) {
//   if (count >= 1000000) {
//     console.log(count);
//     console.log('amilli');
//     return;
//   }
//   if ((count - 1) % 10000 === 0) {
//     console.log(count);
//   }
//   let batch = [];
//   for (let i = count; i < count + 1000; i++) {
//     const queries = generateImagesPerRestaurant(count);
//     batch = batch.concat(queries);
//   }
//   cassandra.concurrent.executeConcurrent(client, query, batch)
//     .catch((err) => {
//       console.log('error with concurrent insertion', err);
//     })
//     .then(() => {
//       count += 1000;
//       return concurrentQueries(count);
//     });
// }

// concurrentQueries(1);

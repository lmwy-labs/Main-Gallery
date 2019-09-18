/* eslint-disable no-restricted-syntax */
const cassandra = require('cassandra-driver');
const { Uuid } = require('cassandra-driver').types;

const client = new cassandra.Client({ contactPoints: ['127.0.0.1:9042'], localDataCenter: 'datacenter1', keyspace: 'restaurant_images' });


const getRestaurant = (restaurantId) => {
  const rId = Number(restaurantId.toString().slice(1));
  const query = 'SELECT * FROM restaurants WHERE r_id = ?';
  return client.execute(query, [rId], { prepare: true });
};

const postRestaurant = (postData) => {
  const randomUuid = Uuid.random();
  const query = 'INSERT INTO restaurants(r_id, i_id, restaurant_name, url, source, picture_date, photographer, name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const restaurantId = Number(postData.restaurantId.toString().slice(1));
  return client.execute(query, [restaurantId, randomUuid, postData.restaurantId, postData.url, postData.source, postData.date, postData.photographer, postData.name], { prepare: true });
};

const updateRestaurant = (updateData, restaurantId, imageId) => {
  restaurantId = Number(restaurantId.toString().slice(1));
  let updates = [];
  for (const key in updateData) {
    if (key === 'date') {
      updates.push(`picture_date = '${updateData[key]}'`);
    } else if (key === 'i_id' || key === 'r_id') {
      continue;
    } else {
      updates.push(`${key} = '${updateData[key]}'`);
    }
  }
  updates = updates.join(', ');
  updates += ' ';
  const query = `UPDATE restaurants SET ${updates}WHERE r_id = ? AND i_id = ?`;
  return client.execute(query, [restaurantId, imageId], { prepare: true });
};

const deleteRestaurant = (restaurantId, imageId) => {
  restaurantId = Number(restaurantId.toString().slice(1));
  const query = 'DELETE FROM restaurants where r_id = ? AND i_id = ?';
  return client.execute(query, [restaurantId, imageId], { prepare: true });
};

module.exports.getRestaurant = getRestaurant;
module.exports.postRestaurant = postRestaurant;
module.exports.updateRestaurant = updateRestaurant;
module.exports.deleteRestaurant = deleteRestaurant;

CREATE KEYSPACE IF NOT EXISTS restaurant_images 
  WITH REPLICATION = {
    'class': 'SimpleStrategy', 'replication_factor' : 1
  };

CREATE TABLE IF NOT EXISTS restaurant_images.restaurants (
  restaurantId int,
  images list<frozen<map<text, text>>>,
  PRIMARY KEY(restaurantId)
);
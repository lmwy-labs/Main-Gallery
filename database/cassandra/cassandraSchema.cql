-- DROP KEYSPACE restaurant_images;

CREATE KEYSPACE IF NOT EXISTS restaurant_images 
  WITH REPLICATION = {
    'class': 'SimpleStrategy', 'replication_factor' : 1
  };

CREATE TABLE IF NOT EXISTS restaurant_images.restaurants (
  r_id int,
  i_id uuid,
  restaurant_name text,
  url text,
  source text,
  picture_date text,
  photographer text, 
  name text, 
  PRIMARY KEY(r_id, i_id)
);

-- CREATE TABLE restaurants (
--   rId uuid, 
--   restaurantId text, 
--   imageId int
-- );

-- CREATE TABLE restaurantImages (  
-- restaurantId int,  
-- url text,  
-- source text,  
-- date: text,  
-- photographer: text,  
-- name text,  
-- Primary key (restaurantId)
-- );

  

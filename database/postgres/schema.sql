DROP DATABASE IF EXISTS restaurant_images;

CREATE DATABASE restaurant_images;
--add thing to create database that limitsonly to one user

\connect restaurant_images;

-- DROP TABLE IF EXISTS restaurants, images;


 CREATE TABLE restaurants (
   r_id INTEGER UNIQUE NOT NULL,
   restaurant_name varchar(10) PRIMARY KEY
);


CREATE TABLE images (
  i_id SERIAL PRIMARY KEY,
  url VARCHAR(100) NOT NULL, 
  name TEXT NOT NULL,
  pictureDate VARCHAR(100) NOT NULL,
  source VARCHAR(100) NOT NULL,
  photographer TEXT NOT NULL,
  restaurant_id INTEGER REFERENCES restaurants(r_id)
);



-- CREATE TABLE restaurant_image (
--   combo_id serial PRIMARY KEY,
--   r_id INTEGER NOT NULL,
--   i_id SMALLINT NOT NULL
-- );


-- create database, then use psal (databasename) < ./database/postgres/schema.sql (if from root);
-- psql -f ./database/postgres/schema.sql
-- 100x or 10x select 10 images per listing

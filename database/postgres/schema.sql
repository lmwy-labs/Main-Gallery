DROP DATABASE IF EXISTS restaurant_images;

CREATE DATABASE restaurant_images;
--add thing to create database that limitsonly to one user

\connect restaurant_images;

DROP TABLE IF EXISTS restaurants, images, restaurant_image;


 CREATE TABLE restaurants (
   r_id INTEGER PRIMARY KEY,
   restaurantId varchar(10) NOT NULL
);


CREATE TABLE images (
  i_id SMALLINT PRIMARY KEY,
  url TEXT NOT NULL,
  name TEXT NOT NULL,
  source TEXT NOT NULL,
  photographer TEXT NOT NULL
);



CREATE TABLE restaurant_image (
  combo_id serial PRIMARY KEY,
  r_id INTEGER NOT NULL,
  i_id SMALLINT NOT NULL
);


-- create database, then use psal (databasename) < ./database/postgres/schema.sql (if from root);
-- psql -f ./database/postgres/schema.sql


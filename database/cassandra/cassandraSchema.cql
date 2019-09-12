-- CREATE TABLE restaurants (
--   rId uuid,
--   restaurantId text,
--   imageId int,

-- );

CREATE TABLE restuarantImages (
  restaurantId text,
  url text,
  source text,
  date: text,
  photographer: text,
  name text,
  Primary key (restaurantId)
);


CREATE TABLE restaurant (
  restaurantId UUID,
  images list<map<text, text>>
)
-- This is schema
-- example
DROP DATABASE IF EXISTS codename_ida;
CREATE DATABASE codename_ida;

\c codename_ida;

DROP TABLE IF EXISTS participants;
DROP TABLE IF EXISTS liked_itineraries;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS activities;
DROP TABLE IF EXISTS itineraries;
DROP TABLE IF EXISTS users;


CREATE TABLE users 
(
  id SERIAL PRIMARY KEY,
  first_name text,
  last_name text,
  email varchar,
  password varchar,
  phone varchar,
  location varchar,
  profile_pic varchar
);
CREATE TABLE itineraries
(
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  time_created timestamp,
  itinerary_date time,
  title text,
  private boolean
);
CREATE TABLE activities
(
  id SERIAL PRIMARY KEY,
  itin_id INT REFERENCES itineraries(id) ON DELETE CASCADE,
  location varchar,
  longitude varchar,
  latitude varchar,
  activity_name text,
  category text,
  activity_time time
);
CREATE TABLE liked_itineraries 
(
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  itin_id INT REFERENCES itineraries(id) ON DELETE CASCADE
);
CREATE TABLE comments
(
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  itin_id INT REFERENCES itineraries(id) ON DELETE CASCADE,
  body varchar
);
CREATE TABLE participants
(
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  itin_id INT REFERENCES itineraries(id) ON DELETE CASCADE
);


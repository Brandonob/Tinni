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
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  phone BIGINT NOT NULL DEFAULT 0,
  location VARCHAR NOT NULL DEFAULT ' ',
  profile_pic VARCHAR NOT NULL DEFAULT ' '
);
CREATE TABLE itineraries
(
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  itinerary_date DATE NOT NULL,
  title VARCHAR NOT NULL DEFAULT 'Your Itinerary',
  private BOOLEAN NOT NULL DEFAULT FALSE
);
CREATE TABLE activities
(
  id SERIAL PRIMARY KEY,
  itin_id INT REFERENCES itineraries(id) ON DELETE CASCADE,
  location VARCHAR NOT NULL DEFAULT ' ',
  longitude VARCHAR NOT NULL DEFAULT ' ',
  latitude VARCHAR NOT NULL DEFAULT ' ',
  activity_name VARCHAR NOT NULL DEFAULT ' ',
  category TEXT NOT NULL DEFAULT ' ',
  activity_time TIME NOT NULL DEFAULT '00:00:00'
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
  body varchar,
  time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE participants
(
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  itin_id INT REFERENCES itineraries(id) ON DELETE CASCADE
);


# Tinni

Welcome to our app **Tinni**!. Our site allows users to have access to core Yelp functionalities. Users are able to search for topics or places that are in the NYC area. Reviews are displayed on each individual restaurant page along with some more relevant information. Users are then able to add those places to an Itinerary. They can customize it for a specific day, give it a name, and share it via email. 

Built with React.js, Node.js with Express, and PostgreSQL.

![Image of Tinni](https://i.ibb.co/tHbvZ72/Screen-Shot-2020-09-28-at-6-14-20-PM.png)

## Features

Users are able to:

## Future Implementations

Users will be able to:

## Technologies Used

* Node.js & Express.js
* Firebase
* PostgreSQL
* pg-promise
* CSS3
* React
* Redux Toolkit

## Local Setup

1. Clone this repo:

    git clone https://github.com/Brandonob/Flashbook.git && cd Flashbook

2. Install dependencies for the Node/Express Server (`backend` folder):

    cd backend && npm install
    
3. Install dependencies the React App (`frontend` folder):

    cd frontend && npm install

4. Create database:

    cd backend && cd db
    psql -f db.sql
    
5. To launch the React App, inside the `frontend` folder, and view the web application:

    cd frontend && npm start

Backend: For the Database, we have opted to use Postgress. We used Express and helper packages body-parser, cors. This enabled us to create get, post, and patch routes. The backend was then deployed to Heroku.



Frontend: For the frontend, We have decided to use React-Redux ToolKit. This frame wire has been set up to encompass core components with their state under each corresponding folder. For routing, we used react-router-dom that let us set up individual webpages as well as pass ids throughout the app. For user login and signup I decided to use Google's firebase that allowed for better security. We also choose to also enable users to sign up via google and Facebook. Users can search using a combination of Yelp's API and Google maps API. After saving they are able to share via email! Tinni is the one website you need. Run your day, don't let your day run you!

![Image of Tinni](https://i.ibb.co/jz7zztW/Screen-Shot-2020-09-28-at-6-24-09-PM.png)



Please feel free to reach out with any questions!

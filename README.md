# Tinni

Welcome to our app **Tinni**!. Our site allows users to have access to core Yelp functionalities. Users are able to search for topics or places that are in the NYC area. Reviews are displayed on each individual restaurant page along with some more relevant information. Users are then able to add those places to an Itinerary. They can customize it for a specific day, give it a name, and share it via email. 

Built with React.js, Node.js with Express, and PostgreSQL.

![Image of Tinni](./ReadmeImgs/tinniHome.png)


## Features

Users are able to:

* Create or log-in to their own personalized account with email, facebook or gmail accounts
* Search for multiple locations and establishments by topic/name (ex. burgers, park, Mcdonalds, etc.), within a 25 mile radius of location input
* View your search results on an interactive map 
* Craft an itinerary and share it with others by email
* Organize your itineraries from your personalized user profile

![Image of Tinni](https://i.ibb.co/jz7zztW/Screen-Shot-2020-09-28-at-6-24-09-PM.png)

## Future Implementations

Users will be able to:

* Book reservations at restaurants offered by the Opentable API
* Interact with other users on this platform with a chat feature and our own ratings/reviews
* Access their itineraries from a **Tinni** mobile app
* Access **Tinni** on any site by creating a chrome extension, that'll allow users to add locations to your itineraries

## Technologies Used

* Node.js & Express.js
* Firebase
* PostgreSQL
* pg-promise
* CSS3
* React
* Redux Toolkit
* Emailjs
* Google Maps API
* Yelp API
* Material UI
* Heroku

## Local Setup

1. Clone this repo:

    ```
    git clone https://github.com/Brandonob/Tinni.git && cd Flashbook
    ```

2. Install dependencies for the Node/Express Server (`backend` folder):

    ```
    cd backend && npm install
    ```
    
3. Install dependencies the React App (`frontend` folder):

    ```
    cd frontend && npm install
    ```

4. Create database:

    ```
    cd backend && cd db
    psql -f db.sql
    ```
    
5. To launch the React App, inside the `frontend` folder, and view the web application:

    ```
    cd frontend && npm start
    ```



## Run your day, don't let your day run you!




Please feel free to reach out with any questions!

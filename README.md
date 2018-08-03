# Neighborhood Map - Burial Mound near Cracow, Poland
Single-page application built using React, featuring a map of neighborhood. It displays map markers to identify popular locations, a search function to easily discover these locations, and a list view to support simple browsing of all locations. There is implemented third-party APIs that provide additional information about each of these locations (Foursquare).

## How To Install
* Download or clone project
* Install all project dependencies with: `npm install`
* Start the development server with: `npm start`

A new browser window open automatically displaying the app.  If it doesn't, navigate to [http://localhost:3000/](http://localhost:3000/) in your browser

## ***NOTE:*** *The service workers for this app will only cache the site when it is in production mode.*

## How to run the project in Production Mode

* Build the production ready optimised code: `npm run serve`
* And then visit [http://localhost:5000/](http://localhost:5000/)

## Important
This application uses API's from Google maps and Foursquare, and developer free plans are only limited to a certain number of requests per day so you may experience not being able to load content. Note: The service worker is only functional in production mode (try it on the hosted site).

## Used technology
* Reactjs
* HTML
* CSS
* Foursquare API
* Google Maps API
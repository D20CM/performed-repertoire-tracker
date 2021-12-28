//I'd like to build a system that can keep track of which songs or pieces of music have been performed in a given period.
//This would be preety useful when performing as a musician in a venue over multiple nights - for example a cruise ship or hotel residency where you might be entertaining the same audience every night for a week or more.  Having a large repertoire of material to work with is obviously very important in this situation, but it can sometimes be difficult to keep track of what songs or pieces have been performed - since the start of the week, for example.
// It would also be a benefit to flag up songs or pieces that haven't been performed in a while.
// There should be a way to store and display the total repertoire, and to mark a particular song as 'performed' for the current rotation.
//The list should have some means of resetting - either by selectinga new date range, or by clearing all 'performed' tags.
//There should be a to show all unperformed songs, listed by least recently played.
//For the purposes of this project, I'd like to build this app using an api server linked to a Postgres db.

//build the server and api routes with express, using a local array of songs as a test case initially.
//initialise folder as an npm package - install express, nodemon, pg, dotenv.
//add prettier config
//add git ignore - add .env file here before committing
//type: module
//use express generator to setup initial file structure
//understand what's going on in this structure
//follow previous project's conventions for creating the api routes, logic, imports/exports etc
//test with Postman

//build a front end that will combine different user inputs from a form and automatically construct the relevant query.
//wireframe with pencil paper to visualise functionality

//transfer the repertoire list to a SQL database and edit the server logic accordingly.
//write functions in their own files to create and populate the database

//use environment variables to enable smooth accessing of the database.

//if time allows, write some tests to ensure correct functionality and embed recent learning of jest, supertest, and cypress.

//style the frontend and UI in a way that allows it to be used live on stage

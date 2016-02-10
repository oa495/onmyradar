### onmyradar

Visualisation of your daily/weekly schedule. BuilT using MEAN stack, Passport for authentication and RapahelJS for visualisation.

## You need:
  - Node.js - [Download](https://nodejs.org/en/)
  - MongoDB - [Download](https://www.mongodb.org/)
  - git - [Download](https://git-scm.com/)
  - Grunt [Install](http://gruntjs.com/)

## How to use

1. Clone the repository. In the server folder, run npm install. In the client folder, run npm install && bower install to retrieve dependencies. 
2. Make sure your database server is running. Type in **mongo** in the terminal. If it's running you should be given a message with the version number of the Mongo shell. If it's not then in another terminal window type in **mongod** then type in **mongo** again.
3. From the server folder run npm test. View in browser as localhost:3000.
4. From the client folder run grunt serve. View in browser at http://127.0.0.1:9000 or localhost:9000. You won't see anything because the client folder has no access to the server. Run grunt serve just to check for jshint errors and/or to watch for changes in css files and other files.

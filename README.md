# Journal Backend

- Create, read, and delete journal entries after registering or logging in

## Overview

- This is the back end for a journal application, where users can register to view the notes in the journal. Users must be set as an admin in the database in order to create, update, or delete journal entries on their own. The live version of the API is on Heroku at https://calm-wildwood-64838.herokuapp.com/ but can only be accessed using an application on localhost or from the front end application I have hosted at https://intense-journey-75173.herokuapp.com/

## Requirements

- Node.js 10.x
- MongoDB

## Installing

### Downloading

- Clone from Git and cd into directory
- npm install
- npm start

### Configuration

This project expects certain environment variables to be set with a .env file in the project root directory

- DATABASE - set to the MongoDB connection string, you can include the password in here or alternatively use DATABASE_PASSWORD
- DATABASE_PASSWORD - not required if you set the password in DATABASE, but if you use it it points to the password for your database
- JWT_SECRET - the secret used to generate your JWT
- JWT_EXPIRES_IN - the expiry time for JWTs, usually set to something like 30d for 30 days or 5h for 5 hours etc.

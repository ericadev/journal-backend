# Journal Backend

- Create, read, and delete journal entries after registering or logging in

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

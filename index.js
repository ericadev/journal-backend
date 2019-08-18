const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const entryController = require('./controllers/entryController');
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('short'));

app.use((req, res, next) => {
  var allowedOrigins = [
    'https://intense-journey-75173.herokuapp.com',
    'http://localhost:3000'
  ];
  var origin = req.headers.origin;

  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Credentials', true);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, DELETE'
  );

  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, content-type, authorization'
  );
  next();
});

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connected successfully!'));

const {
  getEntries,
  getEntry,
  addEntry,
  updateEntry,
  deleteEntry
} = entryController;

const { getUsers } = userController;

const { signup, login, protect, restrict } = authController;

app.get('/api/v1/entries', [protect, getEntries]);
app.post('/api/v1/entries', [protect, restrictTo('admin'), addEntry]);
app.get('/api/v1/entries/:id', [protect, getEntry]);
app.put('/api/v1/entries/:id', [protect, restrictTo('admin'), updateEntry]);
app.delete('/api/v1/entries/:id', [protect, restrictTo('admin'), deleteEntry]);

app.get('/api/v1/users', getUsers);

app.post('/api/v1/users/signup', signup);
app.post('/api/v1/users/login', login);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is listening on ${port}`));

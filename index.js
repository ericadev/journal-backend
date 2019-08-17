const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const entryController = require('./controllers/entryController');
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');

const app = express();
app.use(express.json());
app.use(morgan('short'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

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

const { signup, login, protect } = authController;

app.get('/api/v1/entries', [protect, getEntries]);
app.post('/api/v1/entries', [protect, addEntry]);
app.get('/api/v1/entries/:id', [protect, getEntry]);
app.put('/api/v1/entries/:id', [protect, updateEntry]);
app.delete('/api/v1/entries/:id', [protect, deleteEntry]);

app.get('/api/v1/users', getUsers);

app.post('/api/v1/users/signup', signup);
app.post('/api/v1/users/login', login);

const port = 3001;
app.listen(port, () => console.log(`Server is listening on ${port}`));

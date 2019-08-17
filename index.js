const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const entryController = require('./controllers/entryController');
const app = express();
app.use(express.json());

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
  updateEntry
  //deleteEntry
} = entryController;

app.get('/api/v1/entries', getEntries);
app.post('/api/v1/entries', addEntry);
app.get('/api/v1/entries/:id', getEntry);
app.put('/api/v1/entries/:id', updateEntry);

const port = 3001;
app.listen(port, () => console.log(`Server is listening on ${port}`));

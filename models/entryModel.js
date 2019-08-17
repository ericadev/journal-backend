const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'An entry must have a title'],
    unique: true
  },
  content: {
    type: String,
    required: [true, 'An entry must have content']
  },
  date: {
    type: String,
    required: [true, 'An entry must have a date']
  }
});

const Entry = mongoose.model('Entry', entrySchema);
module.exports = Entry;

const Entry = require('../models/entryModel');

exports.getEntries = async (req, res) => {
  try {
    const entries = await Entry.find();
    res.status(200).json({
      status: 'success',
      data: entries
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getEntry = async (req, res) => {
  try {
    const entry = await Entry.find({ _id: req.params.id });

    res.status(200).json({
      status: 'success',
      data: {
        entry
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.addEntry = async (req, res) => {
  try {
    const newEntry = await Entry.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        entry: newEntry
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.updateEntry = (req, res) => {
  const id = Number(req.params.id);
  if (
    !req.body ||
    !req.body.title ||
    !req.body.date ||
    !req.body.content ||
    id >= entries.length
  ) {
    return res.status(400).json({
      status: 'failure',
      message:
        'Missing required field to make journal entry, or invalid entry chosen'
    });
  }

  const entry = entries.find(ent => ent.id === id);
  entries.splice(id, 1);
  const newEntry = Object.assign({ id }, req.body);
  entries.push(newEntry);

  res.status(202).json({
    status: 'success',
    data: newEntry
  });
};

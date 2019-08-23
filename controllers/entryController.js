const Entry = require('../models/entryModel');

exports.getEntries = async (req, res) => {
  const user_id = req.params.id;
  try {
    const entries = await Entry.find({ user_id });
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
    const entry = await Entry.findById(req.params.id);

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
  const user_id = req.params.id;
  try {
    const newEntry = await Entry.create({ ...req.body, user_id });

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

exports.updateEntry = async (req, res) => {
  try {
    const entry = await Entry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        entry
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.deleteEntry = async (req, res) => {
  try {
    await Entry.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

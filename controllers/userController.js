const User = require('../models/userModel');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: 'success',
      data: {
        users
      }
    });
  } catch (err) {
    res.status(200).json({
      status: 'fail',
      message: err.message
    });
  }
};

const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm
    });

    const token = signToken(newUser._id);

    res.status(201).send({
      status: 'success',
      token,
      user_id: newUser._id,
      data: {
        user: newUser
      }
    });
  } catch (err) {
    res.status(400).send({
      status: 'fail',
      message: err.message
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(200).send({
        status: 'fail',
        message: 'Please provide valid email and password'
      });
      return next();
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(200).send({
        status: 'fail',
        message: 'Incorrect email or password'
      });
    }

    const token = signToken(user._id);
    const user_id = user._id;
    console.log(user_id);

    res.status(200).send({
      status: 'success',
      token,
      user_id
    });
  } catch (err) {
    res.status(200).send({
      status: 'fail',
      message: err.message
    });
  }
};

exports.protect = async (req, res, next) => {
  let token;
  let decoded;
  let freshUser;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).send({
      status: 'fail',
      message: 'User is not logged in. Please log in again.'
    });
  }

  try {
    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).send({
      status: 'fail',
      message: 'User invalid. Please log in again.'
    });
  }

  freshUser = await User.findById(decoded.id);

  if (!freshUser) {
    return res.status(401).send({
      status: 'fail',
      message: 'User invalid. Please log in again.'
    });
  }

  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return res.status(401).send({
      status: 'fail',
      message: 'User invalid. Please log in again.'
    });
  }

  req.user = freshUser;
  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send({
        status: 'fail',
        message: 'You do not have permission to perform this action.'
      });
    }

    next();
  };
};

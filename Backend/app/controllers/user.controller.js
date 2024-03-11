const User = require('../models/user.model');

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).send(users);
    // return next(createSuccess(200, "All users", users))
  } catch (error) {
    return res.status(500).send('Internal server error!');
  }
};
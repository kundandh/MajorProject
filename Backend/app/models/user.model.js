const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    age: Number,
    gender: String,
    phonenumber: Number,
    email: String,
    password: String,
    address: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role" 
      }
    ]
  })
);

module.exports = User;

const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    age: req.body.age,
    gender: req.body.gender,
    phonenumber: req.body.phonenumber,
    email: req.body.email,
    address: req.body.address,
    password: bcrypt.hashSync(req.body.password, 8),
    membership: req.body.membership,
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

      const token = jwt.sign({ id: user.id },
                              config.secret,
                              {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: 86400, // 24 hours
                              });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      req.session.token = token;

      res.status(200).send({
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        age: user.age,
        gender: user.gender,
        phonenumber: user.phonenumber,
        email: user.email,
        address: user.address,
        roles: authorities,
        membership: user.membership,
      });
    });
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};


exports.updateAddress = (req, res) => {
  const userId = req.userId;
  const updatedAddress = typeof req.body.address === 'string' ? [req.body.address] : req.body.address;

  if (!updatedAddress || updatedAddress.length === 0) {
    return res.status(400).send({ message: "Address cannot be empty." });
  }
  else{
  User.findByIdAndUpdate(userId, { $set: { address: updatedAddress } }, { new: true })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }
      res.send(user);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
  }
};



exports.updatePassword = (req, res) => {
  const userId = req.userId; 
  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  // Implement validation to ensure new password matches the confirmation
  if (newPassword !== confirmNewPassword) {
    return res.status(400).send({ message: "New password and confirm password do not match." });
  }

  User.findById(userId, (err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }

    // Check if current password matches
    if (!bcrypt.compareSync(currentPassword, user.password)) {
      return res.status(401).send({ message: "Invalid current password." });
    }

    // Update password
    user.password = bcrypt.hashSync(newPassword, 8);

    // Save updated user
    user.save((err) => {
      if (err) {
        return res.status(500).send({ message: err });
      }
      res.send({ message: "Password updated successfully!" });
    });
  });
};

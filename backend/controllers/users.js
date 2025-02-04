const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (!users) {
        const error = new Error("Internal server error");
        error.status = 500;
        throw error;
      }
      res.send({ data: users });
    })
    .catch((err) => {
      console.log("Users Error:", err);
      res.status(err.status).send({ error: err.message });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => {
      const error = new Error("Cannot find user");
      res.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ error: err.message }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({ name, about, avatar, email, password: hash })
      .then((user) => {
        res.send(user);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send({ message: "Invalid data" });
      });
  });

  module.exports.login = (req, res) => {
    const { email, password } = req.body;
    return User.findUserByCredentials(email, password)
      .then((user) => {
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === "production" ? JWT_SECRET : "dev_secret",
          {
            expiresIn: "7d",
          }
        );
        res.send({ token });
      })
      .catch((error) => {
        res.status(401).send({ message: err.message });
      });
  };
};

module.exports.updateProfile = (req, res) => {
  const userId = req.user._id;
  const userData = req.body;
  User.findByIdAndUpdate(userId, userData)
    .orFail(() => {
      const error = new Error("Cannot update profile");
      error.statusCode = 400;
      throw error;
    })
    .then(() => {
      res.send({ message: "Profile updated" });
    })
    .catch((err) => {
      console.log("Profile Error:", err);
      res.status(err.status).send({ error: err.message });
    });
};
module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body)
    .orFail(() => {
      const error = new Error("Cannot update Avatar");
      error.statusCode = 400;
      return error;
    })
    .then(() => {
      res.send({ message: "Avatar updated" });
    })
    .catch((err) => {
      console.log("Avatar Error:", err);
      res.status(err.status).send({ error: err.message });
    });
};

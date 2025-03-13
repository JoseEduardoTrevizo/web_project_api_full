const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const NotFoundError = require("../errors/not-found-err");
const { NODE_ENV, JWT_SECRET } = process.env;
require("dotenv").config();

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        throw new NotFoundError("User not found");
      }
      res.send({ data: users });
    })
    .catch(next);
};

module.exports.getUserById = (req, res) => {
  User.findById({ _id: req.params.userId })
    .orFail(() => {
      throw new NotFoundError("User not found");
    })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      const statusCode = err.statusCode || 500;
      res
        .status(statusCode)
        .send({ message: "Error finding User", error: err.message });
    });
};

module.exports.getCurrentUser = (req, res) => {
  User.findById({ _id: req.user._id })
    .orFail(() => {
      throw new NotFoundError("User not found");
    })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      const statusCode = err.statusCode || 500;
      res
        .status(statusCode)
        .send({ message: "Error finding User", error: err.message });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({ name, about, avatar, email, password: hash })
      .then((user) =>
        res.status(201).json({ _id: user._id, email: user.email })
      )
      .catch((error) => {
        res.status(400).send({ message: error.message });
      });
  });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
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
      res.status(401).send({ message: error.message });
    });
};

module.exports.updateProfile = (req, res, next) => {
  const userId = req.user._id;
  const userData = req.body;
  User.findByIdAndUpdate(userId, userData, { new: true })
    .orFail(() => {
      const error = new Error("Cannot update profile");
      error.statusCode = 400;
      throw error;
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(err.status).send({ error: err.message });
    });
};
module.exports.updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true })
    .orFail(() => {
      const error = new Error("Cannot update Avatar");
      error.statusCode = 400;
      return error;
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(err.status).send({ error: err.message });
    });
};

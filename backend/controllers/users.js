const User = require("../models/user");

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
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send({ message: "Invalid data" });
    });
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

const usersRoute = require("express").Router();
const {
  getUsers,
  getCurrentUsers,
  getUserById,
  updateAvatar,
  updateProfile,
} = require("../controllers/users");

usersRoute.get("/users", getUsers);
usersRoute.get("/users/me", getCurrentUsers);
usersRoute.get("/users/:userId", getUserById);
usersRoute.patch("/users/me", updateProfile);
usersRoute.patch("/users/me/avatar", updateAvatar);

module.exports = usersRoute;

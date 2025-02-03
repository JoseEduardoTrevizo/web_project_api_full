const usersRoute = require("express").Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateAvatar,
  updateProfile,
} = require("../controllers/users");

usersRoute.get("/users", getUsers);
usersRoute.post("/users", createUser);
usersRoute.get("/users/:userId", getUserById);
usersRoute.patch("/users/me", updateProfile);
usersRoute.patch("/users/me/avatar", updateAvatar);

module.exports = usersRoute;

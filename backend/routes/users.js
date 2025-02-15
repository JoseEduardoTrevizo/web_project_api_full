const usersRoute = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const validator = require("validator");

const {
  getUsers,
  getCurrentUser,
  getUserById,
  updateAvatar,
  updateProfile,
} = require("../controllers/users");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

usersRoute.get("/users", getUsers);
usersRoute.get("/users/me", getCurrentUser);
usersRoute.get("/users/:userId", getUserById);
usersRoute.patch(
  "/users/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(100).required(),
    }),
  }),
  updateProfile
);

usersRoute.patch(
  "/users/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(validateURL),
    }),
  }),
  updateAvatar
);

module.exports = usersRoute;

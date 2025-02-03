const mongoose = require("mongoose");
const regexUser =
  /(http:\/\/|https:\/\/)(www\.)*(\w+\._~:\/\?\/%#\[\]@!\$&'\(\)\*\+,;=)*\/*/gi;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: function (evt) {
      return regexUser.test(evt);
    },
    message: (props) => `${props.value} Se nececita una URL valida`,
  },
});

module.exports = mongoose.model("user", userSchema);

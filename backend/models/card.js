const mongoose = require("mongoose");

const regexCard =
  /(http:\/\/|https:\/\/)(www\.)*(\w+\._~:\/\?\/%#\[\]@!\$&'\(\)\*\+,;=)*\/*/gi;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlegth: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    require: true,
    validate: {
      validator(v) {
        return regexCard.test(v);
      },
    },
    message: (props) => `${props.value} Se nececita una URL valida`,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user",
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("card", cardSchema);

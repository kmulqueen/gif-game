const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  playerInfo: {
    ready: {
      type: Boolean,
      default: false
    },
    role: {
      type: String
    },
    cards: [],
    deck: [],
    submission: {
      type: String
    }
  }
});

module.exports = User = mongoose.model("User", UserSchema);

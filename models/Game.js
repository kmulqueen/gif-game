const mongoose = require("mongoose");
const GameSchema = new mongoose.Schema({
  question: {
    type: String
  }
});

module.exports = Game = mongoose.model("Game", GameSchema);

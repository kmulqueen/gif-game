const mongoose = require("mongoose");
const GameSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  start: {
    type: Boolean,
    required: true,
    default: false
  },
  playersReady: [
    {
      player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      name: {
        type: String
      }
    }
  ],
  players: [
    {
      player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      name: {
        type: String
      },
      ready: {
        type: Boolean
      },
      gifPick: {
        type: String
      },
      votedFor: {
        type: String
      },
      votes: {
        type: Number
      }
    }
  ]
});

module.exports = Game = mongoose.model("Game", GameSchema);

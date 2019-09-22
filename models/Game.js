const mongoose = require("mongoose");
const GameSchema = new mongoose.Schema({
  start: {
    type: Boolean,
    required: true,
    default: false
  },
  gif: {
    gifURL: {
      type: String
    },
    gifImage: {
      height: {
        type: String
      },
      size: {
        type: String
      },
      url: {
        type: String
      },
      width: {
        type: String
      }
    }
  },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  whiteCardPlayers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  blackCardPlayer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  whiteCardPicks: [],
  blackCardPick: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  gameWinner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = Game = mongoose.model("Game", GameSchema);

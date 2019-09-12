const mongoose = require("mongoose");
const LobbySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game"
  },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

module.exports = Lobby = mongoose.model("Lobby", LobbySchema);

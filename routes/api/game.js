const express = require("express");
const router = express.Router();
const Game = require("../../models/Game");
const Lobby = require("../../models/Lobby");

router.get("/test", (req, res) => res.send("Games works"));

// Update Game Question in Lobby
router.post("/:lobby_id/:game_id", async (req, res) => {
  try {
    const { question } = req.body;
    let lobby = await Lobby.findById(req.params.lobby_id);
    if (!lobby) {
      return res.status(404).json({ msg: "Lobby doesn't exist" });
    }

    let game = await Game.findById(req.params.game_id);
    if (!game) {
      return res.status(404).json({ msg: "Game doesn't exist" });
    }

    if (lobby.game._id.toString() !== game._id.toString()) {
      return res
        .status(400)
        .json({ msg: "You can't change the question of another lobby" });
    }

    game.question = question;
    await game.save();
    res.status(200).json({ msg: "Question updated.", game });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

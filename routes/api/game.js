const express = require("express");
const router = express.Router();
const Game = require("../../models/Game");
const Lobby = require("../../models/Lobby");
const User = require("../../models/User");
const questions = require("../../questions/questions.json");

router.get("/test", (req, res) => res.send("Games works"));

// Get game by ID
router.get("/:id", async (req, res) => {
  try {
    const game = await Game.findById(req.params.id).populate("players.player", [
      "name",
      "_id"
    ]);
    res.json(game);
  } catch (error) {
    console.error(error);
  }
});

// Start Game
router.post("/:game_id", async (req, res) => {
  try {
    let game = await Game.findById(req.params.game_id)
      .populate("name")
      .populate("players.player", ["name", "_id"]);
    if (!game) {
      return res.status(404).json({ msg: "Game doesn't exist" });
    }

    game.start = true;

    await game.save();
    res.status(200).json(game);
  } catch (error) {}
});

// Update Game Question
router.put("/:game_id", async (req, res) => {
  try {
    let game = await Game.findById(req.params.game_id)
      .populate("name")
      .populate("players.player", ["name", "_id"]);
    if (!game) {
      return res.status(404).json({ msg: "Game doesn't exist" });
    }

    // For now only questions with 1 pick answers are allowed
    const onePickQuestions = questions.blackCards.filter(
      card => card.pick === 1
    );

    const randomIndex = Math.floor(
      Math.random() * (onePickQuestions.length + 1)
    );
    game.question = onePickQuestions[randomIndex].text;
    await game.save();
    res.status(200).json(game);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Delete all games
router.delete("/", async (req, res) => {
  try {
    const games = await Game.deleteMany({}, err => {
      if (err) throw err;
    });

    res.status(200).json(games);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Game = require("../../models/Game");
const Lobby = require("../../models/Lobby");
const User = require("../../models/User");
const questions = require("../../questions/questions.json");
const gameController = require("../../controllers/gameController");

router.get("/test", (req, res) => res.send("Games works"));
// Get all games
router.get("/", gameController.getAllGames);

// Get game by ID
router.get("/:id", gameController.getGameByID);

// Start Game
router.post("/:game_id", gameController.startGame);

// Update Game Question
router.put("/:game_id", gameController.updateGif);

// Delete all games
router.delete("/deleteall", gameController.deleteAllGames);

module.exports = router;

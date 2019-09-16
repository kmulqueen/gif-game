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

// Player Ready
router.post("/:game_id/:player_id", async (req, res) => {
  try {
    const player = await User.findById(req.params.player_id)
      .select("-password")
      .select("-email");
    const game = await Game.findById(req.params.game_id)
      .populate("name")
      .populate("players.player", ["name", "_id"]);

    if (!player) {
      return res.status(404).json({ msg: "Invalid player " });
    }
    if (!game) {
      return res.status(404).json({ msg: "Invalid game " });
    }

    let alreadyReady = game.playersReady.filter(
      item => item._id.toString() === player._id.toString()
    );

    if (alreadyReady.length) {
      return res.status(400).json({ msg: "User already ready" });
    }

    // Init player setup
    const playerSetup = {
      player: player,
      ready: true,
      gifPick: "",
      votedFor: "",
      votes: 0
    };

    // Check if player exists in players array
    const exists = game.players.filter(
      item => item.player._id.toString() === player._id.toString()
    );
    // If so, update that player with a ready status of true
    if (exists.length) {
      game.players.map((item, i) => {
        if (item.player._id.toString() === player._id.toString()) {
          game.playersReady.push(player);
          game.players[i] = playerSetup;
        }
      });
    } else {
      game.playersReady.push(player);
      game.players.push(playerSetup);
    }

    // Query db update
    const updatedPlayersReady = game.playersReady;
    const updatedPlayers = game.players;
    const conditions = { _id: req.params.game_id };
    const update = {
      playersReady: updatedPlayersReady,
      players: updatedPlayers
    };

    await Game.findByIdAndUpdate(conditions, update, (err, doc) => {
      doc.save();
    });

    res.status(200).json(game);
  } catch (error) {
    console.error(error);
  }
});

// Start Game
router.put("/:lobby_id/:game_id", async (req, res) => {
  try {
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
        .status(401)
        .json({ msg: "Check that you have the right lobby or game" });
    }

    game.start = true;
    lobby.game = game;

    await game.save();
    await lobby.save();
    res.status(200).json(game);

    // res.status(200).json(lobby)
  } catch (error) {}
});

// Update Game Question in Lobby
router.post("/:lobby_id/:game_id", async (req, res) => {
  try {
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
        .status(401)
        .json({ msg: "Check that you have the right lobby or game" });
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

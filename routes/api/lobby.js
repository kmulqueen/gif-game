const express = require("express");
const router = express.Router();
const Lobby = require("../../models/Lobby");
const User = require("../../models/User");
const Game = require("../../models/Game");

router.get("/test", (req, res) => res.send("Lobbys works"));

// Create new lobby
router.post("/:user_id", async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id)
      .select("-password")
      .select("-email");
    if (!user) {
      return res
        .status(404)
        .json({ msg: "Can't create lobby under a user that does not exist." });
    }

    const { name } = req.body;
    let lobby = await Lobby.findOne({ name });

    if (lobby) {
      return res
        .status(400)
        .json({ msg: "Lobby with that name already exists" });
    }

    const gameSetup = {
      start: false,
      gif: null,
      players: [],
      whiteCardPlayers: [],
      blackCardPlayer: null,
      whiteCardPicks: [],
      blackCardPick: null,
      gameWinner: null
    };
    const game = new Game(gameSetup);

    await game.save();

    let lobbySetup = {
      name,
      host: user,
      players: [user],
      game
    };
    lobby = new Lobby(lobbySetup);
    await lobby.save();
    res.status(200).json(lobby);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Get all lobbies
router.get("/", async (req, res) => {
  try {
    let lobbies = await Lobby.find()
      .populate("host", ["name", "_id"])
      .populate("game")
      .populate("players");

    if (!lobbies.length) {
      return res.status(404).json({ msg: "No lobbies have been created." });
    }

    res.status(200).json(lobbies);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error.");
  }
});

// Get Lobby by ID
router.get("/:lobby_id", async (req, res) => {
  try {
    const lobby = await Lobby.findById(req.params.lobby_id)
      .populate("host")
      .populate("game")
      .populate("players");

    if (!lobby) {
      return res.status(404).json({ msg: "Lobby not found." });
    }

    res.status(200).json(lobby);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error.");
  }
});

// Delete Lobby by ID
router.delete("/:lobby_id", async (req, res) => {
  try {
    let lobby = await Lobby.findById(req.params.lobby_id);
    if (!lobby) {
      return res.status(404).json({ msg: "Lobby not found" });
    }

    await Lobby.findOneAndRemove({ _id: lobby._id });
    let lobbies = await Lobby.find();
    res.status(200).json({ msg: "Lobby Deleted", lobbies });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error.");
  }
});

// Players Join Lobby
router.put("/:lobby_id/:player_id", async (req, res) => {
  try {
    let lobby = await Lobby.findById(req.params.lobby_id)
      .populate("host")
      .populate("game")
      .populate("players");

    if (!lobby) {
      return res.status(404).json({ msg: "Lobby doesn't exist." });
    }

    let player = await User.findById(req.params.player_id)
      .select("-password")
      .select("-email");
    if (!player) {
      return res.status(404).json({ msg: "Player doesn't exist" });
    }

    let alreadyInLobby = lobby.players.filter(
      person => person._id.toString() === player._id.toString()
    );

    if (alreadyInLobby.length) {
      return res.status(400).json({ msg: "You are already in this lobby." });
    }

    lobby.players.push(player);
    await lobby.save();
    res.status(200).json(lobby);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Player leave lobby
router.delete("/:lobby_id/:player_id", async (req, res) => {
  try {
    let lobby = await Lobby.findById(req.params.lobby_id)
      .populate("host")
      .populate("game")
      .populate("players");

    if (!lobby) {
      return res.status(404).json({ msg: "Lobby doesn't exist" });
    }

    let player = await User.findById(req.params.player_id).select("-password");
    if (!player) {
      return res.status(404).json({ msg: "Player not found" });
    }

    // Check to see if player exists in lobby
    let alreadyInLobby = lobby.players.filter(
      person => person._id.toString() === player._id.toString()
    );

    if (!alreadyInLobby.length) {
      return res
        .status(400)
        .json({ msg: "You can't leave a lobby that you do not exist in." });
    }

    let updatedLobby = lobby.players.filter(
      person => person._id.toString() !== player._id.toString()
    );

    lobby.players = updatedLobby;

    await lobby.save();
    res.status(200).json(lobby);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Delete all lobbies
router.delete("/", async (req, res) => {
  try {
    const lobbies = await Lobby.deleteMany({}, err => {
      if (err) throw err;
    });

    res.status(200).json(lobbies);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;

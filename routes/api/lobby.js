const express = require("express");
const router = express.Router();
const lobbyController = require("../../controllers/lobbyController");
const auth = require("../../middleware/auth");

router.get("/test", (req, res) => res.send("Lobbys works"));

// Create new lobby
router.post("/create/:user_id", auth, lobbyController.createLobby);

// Get all lobbies
router.get("/", lobbyController.getAllLobbies);

// Get Lobby by ID
router.get("/:lobby_id", lobbyController.getLobbyByID);

// Players Join Lobby
router.post("/join/:lobby_id", auth, lobbyController.joinLobby);

// Player leave lobby
router.delete("/leave/:lobby_id", auth, lobbyController.leaveLobby);

// Delete Lobby by ID
router.delete("/delete/:lobby_id", auth, lobbyController.deleteLobby);
// Delete all lobbies
router.delete("/deleteall", lobbyController.deleteAllLobbies);

module.exports = router;

const User = require("../models/User");
const Game = require("../models/Game");
const Lobby = require("../models/Lobby");

module.exports = {
  getAllLobbies: async (req, res) => {
    try {
      const lobbies = await Lobby.find()
        .populate("host", ["playerInfo", "_id", "name"])
        .populate("game")
        .populate("players", ["playerInfo", "_id", "name"]);
      res.json(lobbies);
    } catch (error) {
      res.status(300).json(error);
    }
  },
  getLobbyByID: async (req, res) => {
    try {
      const lobby = await Lobby.findById(req.params.lobby_id)
        .populate("players", ["playerInfo", "_id", "name"])
        .populate("host", ["playerInfo", "_id", "name"])
        .populate("game");
      res.json(lobby);
    } catch (error) {
      res.status(300).json(error);
    }
  },
  createLobby: async (req, res) => {
    try {
      const user = await User.findById(req.params.user_id)
        .select("-password")
        .select("-email");

      const loggedInUser = await User.findById(req.user.id);

      if (user._id.toString() !== loggedInUser.id) {
        return res.status(401).json({ msg: "You are not authorized" });
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
        gif: "",
        players: [],
        whiteCardPlayers: [],
        blackCardPlayer: null,
        whiteCardPicks: [],
        blackCardPick: null,
        gameWinner: null
      };
      const game = new Game(gameSetup);

      const lobbySetup = {
        name,
        host: user,
        game,
        players: [user],
        readyPlayers: []
      };
      lobby = new Lobby(lobbySetup);

      await game.save();
      await lobby.save();
      res.json(lobby);
    } catch (error) {
      res.status(300).json(error);
    }
  },
  joinLobby: async (req, res) => {
    try {
      const lobby = await Lobby.findById(req.params.lobby_id)
        .populate("players", ["playerInfo", "name", "_id"])
        .populate("host", ["playerInfo", "name", "_id"])
        .populate("game");
      const user = await User.findById(req.user.id)
        .select("-email")
        .select("-password");

      const alreadyInLobby = lobby.players.filter(
        player => player._id.toString() === user.id.toString()
      );
      // If user already exists in lobby, update the user to avoid duplicates
      if (alreadyInLobby.length) {
        lobby.players.map(player => {
          if (player._id.toString() === user.id.toString()) {
            player = user;
          }
        });
      } else {
        lobby.players.push(user);
      }
      await lobby.save();
      res.json(lobby);
    } catch (error) {
      res.status(300).json(error);
    }
  },
  leaveLobby: async (req, res) => {
    try {
      const lobby = await Lobby.findById(req.params.lobby_id);
      const user = await User.findById(req.user.id)
        .select("-email")
        .select("-password");

      const inLobby = lobby.players.filter(
        player => player._id.toString() === user.id.toString()
      );
      if (!inLobby.length) {
        return res
          .status(404)
          .json({ msg: "You have not yet joined this lobby" });
      }
      const players = lobby.players.filter(
        player => player._id.toString() !== user.id.toString()
      );

      lobby.players = players;
      await lobby.save();
      res.json(user);
    } catch (error) {
      res.status(300).json(error);
    }
  },
  getReadyPlayers: async (req, res) => {
    try {
      const lobby = await Lobby.findById(req.params.lobby_id)
        .populate("players", ["playerInfo", "_id", "name"])
        .populate("game");

      const gameID = lobby.game._id;
      const game = await Game.findById(gameID);
      lobby.players.map(player => {
        if (player.playerInfo.ready) {
          if (lobby.readyPlayers.includes(player._id)) {
            return null;
          } else {
            lobby.readyPlayers.push(player);
          }
        } else return player;
      });

      game.players = lobby.readyPlayers;

      await game.save();
      await lobby.save();
      res.json(game);
    } catch (error) {
      res.status(300).json(error);
    }
  },
  deleteLobby: async (req, res) => {
    try {
      const lobby = await Lobby.findById(req.params.lobby_id);
      const lobbies = await Lobby.find();

      const user = await User.findById(req.user.id)
        .select("-password")
        .select("-email");

      if (!lobby) {
        return res.status(401).json({ msg: "Lobby not found" });
      }

      if (lobby.host._id.toString() === user.id) {
        await lobby.remove();
        return res.json(lobbies);
      } else {
        return res.json({
          msg: "Can't delete the lobby if you are not the host"
        });
      }
    } catch (error) {
      res.status(300).json(error);
    }
  },
  deleteAllLobbies: async (req, res) => {
    try {
      await Lobby.deleteMany({}, err => {
        if (err) throw err;
      });

      return res.status(200).json({ msg: "All lobbies have been deleted" });
    } catch (error) {
      res.status(300).json(error);
    }
  }
};

const Game = require("../models/Game");
const config = require("config");
const fetch = require("node-fetch");

module.exports = {
  getAllGames: async (req, res) => {
    try {
      const games = await Game.find({})
        .populate("players", ["playerInfo", "name", "id"])
        .populate("whiteCardPlayers")
        .populate("blackCardPlayer")
        .populate("blackCardPick")
        .populate("gameWinner");
      if (!games.length) {
        return res.status(404).json({ msg: "No Games Found" });
      }
      res.json(games);
    } catch (error) {
      res.status(500).send("Server Error.");
    }
  },
  getGameByID: async (req, res) => {
    try {
      const game = await Game.findById(req.params.id)
        .populate("players", ["playerInfo", "name", "id"])
        .populate("whiteCardPlayers")
        .populate("blackCardPlayer")
        .populate("blackCardPick")
        .populate("gameWinner");

      if (!game) {
        return res.status(404).json({ msg: "Game not found" });
      }

      res.json(game);
    } catch (error) {
      res.status(500).send("Server Error.");
    }
  },
  startGame: async (req, res) => {
    try {
      const game = await Game.findById(req.params.game_id);

      if (!game) {
        return res.status(404).json({ msg: "Game not found" });
      }

      // @TODO  - Check for # of players ready to start game

      game.start = true;
      await game.save();
      res.json(game);
    } catch (error) {
      res.status(500).send("Server Error.");
    }
  },
  updateGif: async (req, res) => {
    try {
      const game = await Game.findById(req.params.game_id);
      if (!game) {
        return res.status(404).json({ msg: "Game not found" });
      }
      // Giphy API Call
      const apiKey = config.get("giphyAPIKey");
      const giphyResult = await fetch(
        `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&limit=1`
      );
      const data = await giphyResult.json();
      const gifURL = data.data.url;
      const gifImage = data.data.images.downsized;

      const gif = {
        gifURL,
        gifImage
      };

      game.gif = gif;
      await game.save();
      res.json(game);
    } catch (error) {
      res.status(500).send("Server Error");
    }
  },
  deleteAllGames: async (req, res) => {
    try {
      await Game.deleteMany({}, err => {
        if (err) throw err;
      });

      res.status(200).json({ msg: "All Games Deleted" });
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
};

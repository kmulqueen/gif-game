const User = require("../models/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const cards = require("../cards/cards.json");

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().select("-password");

      if (!users) {
        return res.status(404).json({ msg: "No users found" });
      }

      res.status(200).json(users);
    } catch (error) {
      res.status(300).json(error);
    }
  },
  registerUser: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      const playerInfo = {
        ready: false,
        votes: 0,
        cards: [],
        deck: [],
        submission: `${name}'s submission`
      };

      user = new User({
        name,
        email,
        password,
        playerInfo
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      res.status(500).send("Server Error.");
    }
  },
  readyPlayer: async (req, res) => {
    try {
      const user = await User.findById(req.params.player_id)
        .select("-password")
        .select("-email");
      const loggedInUser = await User.findById(req.user.id).select("-password");

      if (user.id !== loggedInUser.id) {
        return res.status(401).json({ msg: "You are not authorized" });
      }

      user.playerInfo.ready = true;

      await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).send("Server Error");
    }
  },
  getNewCards: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");

      if (user.id !== req.params.player_id) {
        return res.status(401).json({ msg: "You are not authorized" });
      }
      const whiteCards = cards.whiteCards;

      function shuffle(array) {
        var currentIndex = array.length,
          temporaryValue,
          randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
      }

      const shuffled = shuffle(whiteCards);
      const newCards = shuffled.slice(0, 4);

      user.playerInfo.cards = newCards;
      await user.save();
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  },
  submitCard: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");

      if (user.id !== req.params.player_id) {
        return res.status(401).json({ msg: "You are not authorized" });
      }

      const { playerInfo } = user;
      const submission = req.params.card_text;
      const inHolding = playerInfo.cards.includes(submission);
      const inDeck = playerInfo.deck.includes(submission);

      if (!inHolding && !inDeck) {
        return res
          .status(400)
          .json({ msg: "Submission must exist in user's cards" });
      }
      playerInfo.submission = submission;
      await user.save();
      res.json(playerInfo);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  },
  updateVotes: async (req, res) => {
    try {
      const user = await User.findById(req.params.player_id)
        .select("-password")
        .select("-email");

      const { playerInfo } = user;
      playerInfo.votes++;

      await user.save();
      res.json(playerInfo.votes);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  },
  getDeck: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");

      if (user.id !== req.params.player_id) {
        return res.status(401).json({ msg: "You are not authorized" });
      }
      const { playerInfo } = user;

      if (!playerInfo.deck.length) {
        return res
          .status(404)
          .json({ msg: "No cards exist in this user's deck" });
      }
      res.json(playerInfo.deck);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  },
  addCardToDeck: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");

      if (user.id !== req.params.player_id) {
        return res.status(401).json({ msg: "You are not authorized" });
      }
      const { playerInfo } = user;

      if (playerInfo.deck.length) {
        const alreadyInDeck = playerInfo.deck.filter(
          card => card === req.params.card_text
        );
        if (alreadyInDeck.length) {
          return res.status(400).json({ msg: "Card already exists in deck" });
        } else {
          playerInfo.deck.push(req.params.card_text);
          await user.save();

          return res.status(200).json(playerInfo.deck);
        }
      } else {
        playerInfo.deck.push(req.params.card_text);
        await user.save();
      }
      res.json(playerInfo);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  },
  removeCardFromDeck: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);

      if (user.id !== req.params.player_id) {
        return res.status(401).json({ msg: "You are not authorized." });
      }
      const { playerInfo } = user;

      const cardToDelete = req.params.card_text;

      const existsInDeck = playerInfo.deck.includes(cardToDelete);

      if (!existsInDeck) {
        return res.status(404).json({ msg: "Card not found in deck" });
      } else {
        const updatedDeck = playerInfo.deck.filter(
          card => card !== cardToDelete
        );
        playerInfo.deck = updatedDeck;
        await user.save();
        if (!playerInfo.deck.length) {
          return res.json({ msg: "No cards found in user's deck" });
        }
        return res.status(200).json(playerInfo);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  },
  clearPlayerInfo: async (req, res) => {
    try {
      let user = await User.findById(req.params.player_id)
        .select("-password")
        .select("-email");

      let { playerInfo, name } = user;

      const newPlayerInfo = {
        ready: false,
        votes: 0,
        cards: [],
        deck: [...playerInfo.deck],
        submission: `${name}'s submission`
      };

      user.playerInfo = newPlayerInfo;

      await user.save();
      res.json(playerInfo);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.user_id);
      const loggedInUser = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      if (user.id !== loggedInUser.id) {
        return res.status(401).json({ msg: "You are not authorized" });
      }

      await user.remove();

      res.status(200).json({ msg: "User deleted" });
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
};

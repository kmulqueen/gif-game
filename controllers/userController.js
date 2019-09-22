const User = require("../models/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

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
        role: "",
        cards: [],
        deck: [],
        submission: ""
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

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");
const { validationResult } = require("express-validator");
const User = require("../models/User");

module.exports = {
  login: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

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
  getAuthenticatedUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(401).json({ msg: "You are not authorized" });
      }

      res.json(user);
    } catch (error) {
      res.status(500).send("Server Error.");
    }
  }
};

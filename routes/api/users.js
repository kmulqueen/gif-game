const express = require("express");
const router = express.Router();
const User = require("../../models/User");

router.get("/test", (req, res) => res.send("Users works"));

// Create new User
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    let user = await User.findOne({ name });

    if (user) {
      return res
        .status(400)
        .json({ msg: "User with that name already exists." });
    }

    user = new User({ name });

    await user.save();
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error.");
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Delete User
router.delete("/:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    await User.findOneAndRemove({ _id: req.params.id });

    let users = await User.find();
    res.status(200).json({ msg: "User deleted", users: users });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

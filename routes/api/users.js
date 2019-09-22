const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const userController = require("../../controllers/userController");
const auth = require("../../middleware/auth");

router.get("/test", (req, res) => res.send("Users works"));

// Register User
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must contain at least 6 characters").isLength({
      min: 6
    })
  ],
  userController.registerUser
);

// Get all users
router.get("/", userController.getAllUsers);

// Ready Player
router.post("/ready/:player_id", auth, userController.readyPlayer);

// Delete User
router.delete("/:user_id", auth, userController.deleteUser);

module.exports = router;

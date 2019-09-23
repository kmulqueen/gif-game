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

// Get New Cards
router.post("/cards/:player_id", auth, userController.getNewCards);

// Get Deck
router.get("/deck/:player_id", auth, userController.getDeck);

// Add Card To Deck
router.post("/deck/:player_id/:card_text", auth, userController.addCardToDeck);

// Remove Card From Deck
router.delete(
  "/deck/:player_id/:card_text",
  auth,
  userController.removeCardFromDeck
);

// Submission
router.post("/submit/:player_id/:card_text", auth, userController.submitCard);

// Update Votes
router.put("/votes/:player_id", auth, userController.updateVotes);

// Clear/Reset Player Info
router.put("/reset/:player_id", userController.clearPlayerInfo);

// Delete User
router.delete("/:user_id", auth, userController.deleteUser);

module.exports = router;

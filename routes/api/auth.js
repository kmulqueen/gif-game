const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController");
const { check } = require("express-validator");
const auth = require("../../middleware/auth");

router.get("/test", auth, (req, res) => res.send("auth route works"));

// Get authenticated user
router.get("/", auth, authController.getAuthenticatedUser);

// Login
router.post(
  "/",
  // Express-Validator Checks
  [
    check("email", "Please include a valid email.").isEmail(),
    check("password", "Password is required.").exists()
  ],
  authController.login
);

module.exports = router;

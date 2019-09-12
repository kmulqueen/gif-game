const express = require("express");
const router = express.Router();
const Game = require("../../models/Game");

router.get("/test", (req, res) => res.send("Games works"));

module.exports = router;

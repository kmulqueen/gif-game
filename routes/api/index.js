const router = require("express").Router();
const authRoutes = require("./auth");
const gameRoutes = require("./game");
const lobbyRoutes = require("./lobby");
const usersRoutes = require("./users");

router.use("/users", usersRoutes);
router.use("/auth", authRoutes);
router.use("/game", gameRoutes);
router.use("/lobby", lobbyRoutes);

module.exports = router;

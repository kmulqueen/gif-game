const express = require("express");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json({ extended: false }));

connectDB();

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/game", require("./routes/api/game"));
app.use("/api/lobby", require("./routes/api/lobby"));

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

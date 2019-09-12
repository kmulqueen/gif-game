const express = require("express");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json({ extended: false }));

connectDB();

app.use("/", (req, res) => res.send("Home Page"));

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

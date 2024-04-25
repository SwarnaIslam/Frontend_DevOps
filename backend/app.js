const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");

const url = process.env.MONGODB_URL;
const app = express();

mongoose.connect(url);
const conn = mongoose.connection;

conn.on("open", function () {
  console.log("connected");
});
app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.listen(9000, () => {
  console.log("server is running!");
});

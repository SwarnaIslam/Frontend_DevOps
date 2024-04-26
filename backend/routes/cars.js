const express = require("express");
const Cars = require("../models/cars");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, process.env.API_SECRET_KEY);
    const email = decoded.email;
    const user = await User.findOne({ email: email });
    const cars = await Cars.find().populate("owner").exec();

    return res.json({ status: "ok", cars: cars });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Invalid token" });
  }
});
router.post("/", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, process.env.API_SECRET_KEY);
    const email = decoded.email;
    const user = await User.findOne({ email: email });

    await Cars.create({
      price: req.body.price,
      photo: req.body.photo,
      model: req.body.model,
      type: req.body.type,
      owner: user,
    });
    return res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "invalid token" });
  }
});
module.exports = router;

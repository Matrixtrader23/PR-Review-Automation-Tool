const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

router.get("/", async (req, res) => {
  const reviews = await Review.find();
  res.json(reviews);
});

module.exports = router;

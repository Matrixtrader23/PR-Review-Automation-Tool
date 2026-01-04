const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

router.post("/approve/:id", async (req, res) => {
  await Review.findByIdAndUpdate(req.params.id, {
    approved: true,
    instructorComment: req.body.comment
  });
  res.json({ message: "Review approved" });
});

module.exports = router;

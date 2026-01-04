const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  prId: mongoose.Schema.Types.ObjectId,
  feedback: Object,
  approved: { type: Boolean, default: false },
  instructorComment: String
}, { timestamps: true });

module.exports = mongoose.model("Review", ReviewSchema);

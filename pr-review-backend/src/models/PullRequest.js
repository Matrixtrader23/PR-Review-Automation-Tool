const mongoose = require("mongoose");

const PullRequestSchema = new mongoose.Schema({
  repo: String,
  prNumber: Number,
  branch: String,
  author: String,
  status: { type: String, default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("PullRequest", PullRequestSchema);

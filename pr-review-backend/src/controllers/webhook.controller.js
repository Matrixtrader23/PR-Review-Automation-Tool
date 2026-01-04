const PullRequest = require("../models/PullRequest");
const Review = require("../models/Review");
const { evaluatePR } = require("../services/ruleEngine.service");

exports.handleWebhook = async (req, res) => {
  const event = req.body;

  if (event.pull_request) {
    const pr = event.pull_request;

    const savedPR = await PullRequest.create({
      repo: pr.base.repo.full_name,
      prNumber: pr.number,
      branch: pr.head.ref,
      author: pr.user.login
    });

    const evaluation = evaluatePR(pr.head.ref, pr.changed_files || []);

    await Review.create({
      prId: savedPR._id,
      feedback: evaluation
    });

    return res.status(200).json({ message: "PR reviewed" });
  }

  res.status(200).json({ message: "Ignored" });
};

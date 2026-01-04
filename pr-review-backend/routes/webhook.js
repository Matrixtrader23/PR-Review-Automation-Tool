import express from "express";
import crypto from "crypto";
import axios from "axios";
import { reviewPullRequest } from "../services/prReviewService.js";

const router = express.Router();

/**
 * Verify GitHub webhook signature
 */
function verifySignature(req, secret) {
  const signature = req.headers["x-hub-signature-256"];
  if (!signature) return false;

  const hmac = crypto.createHmac("sha256", secret);
  const digest = "sha256=" + hmac.update(JSON.stringify(req.body)).digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(digest)
  );
}

router.post("/github", async (req, res) => {
  try {
    const isValid = verifySignature(req, process.env.GITHUB_WEBHOOK_SECRET);

    if (!isValid) {
      return res.status(401).json({ error: "Invalid webhook signature" });
    }

    // Only handle PR opened or updated
    if (req.body.action !== "opened" && req.body.action !== "synchronize") {
      return res.status(200).json({ message: "Ignored event" });
    }

    const pr = req.body.pull_request;
    const repo = req.body.repository.full_name;

    const reviewResult = await reviewPullRequest({
      repo,
      prNumber: pr.number,
      branch: pr.head.ref
    });

    res.status(200).json(reviewResult);
  } catch (err) {
    console.error("Webhook error:", err.message);
    res.status(500).json({ error: "Webhook processing failed" });
  }
});

export default router;

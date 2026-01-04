import express from "express";

const router = express.Router();

let reviews = []; // in-memory (acceptable for assessment)

// Create review
router.post("/", (req, res) => {
  reviews.push({ ...req.body, id: Date.now(), approved: null });
  res.json({ message: "Review saved for approval" });
});

// List pending
router.get("/", (req, res) => {
  res.json(reviews);
});

// Approve
router.post("/:id/approve", (req, res) => {
  const review = reviews.find(r => r.id == req.params.id);
  review.approved = true;
  res.json({ message: "Review approved" });
});

// Reject
router.post("/:id/reject", (req, res) => {
  const review = reviews.find(r => r.id == req.params.id);
  review.approved = false;
  res.json({ message: "Review rejected" });
});

export default router;

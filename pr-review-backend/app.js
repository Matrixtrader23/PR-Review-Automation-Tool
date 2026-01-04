import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.js";
import webhookRoutes from "./routes/webhook.js";
import reviewRoutes from "./routes/reviews.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", healthRoutes);
app.use("/api/webhook", webhookRoutes);
app.use("/api/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.send("PR Review Backend is running 🚀");
});

export default app;

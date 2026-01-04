import express from "express";
import cors from "cors";

// ✅ Import routes
import healthRoutes from "./routes/health.js";
import webhookRoutes from "./routes/webhook.js"; // <-- new import

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Use routes
app.use("/api", healthRoutes);
app.use("/webhook", webhookRoutes); // <-- new route

app.get("/", (req, res) => {
  res.send("PR Review Backend is running 🚀");
});

export default app;

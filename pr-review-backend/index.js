import app from "./app.js";

const PORT = process.env.PORT || 5000;

// Listen on 0.0.0.0 so Docker can map the port
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

import { useState } from "react";
import api from "./api/api";
import InstructorDashboard from "./pages/InstructorDashboard";

function App() {
  const [status, setStatus] = useState("Backend status unknown");

  const checkBackend = async () => {
    try {
      const res = await api.get("/api/health");
      setStatus(`Backend status: ${res.data.status}`);
    } catch (err) {
      setStatus("Backend not reachable ❌");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>PR Review Tool</h1>

      <p>{status}</p>

      <button
        onClick={checkBackend}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#4F46E5",
          color: "white",
          border: "none",
          borderRadius: "0.5rem",
          cursor: "pointer",
        }}
      >
        Check Backend Now
      </button>

      <hr style={{ margin: "2rem 0" }} />

      <InstructorDashboard />
    </div>
  );
}

export default App;

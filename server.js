const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// ================================
// Middleware
// ================================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================================
// Static Files
// ================================

app.use(express.static(path.join(__dirname, "public")));

// ================================
// Health Check API
// ================================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Save Every Drop Backend is running successfully.",
    version: "1.0.0",
    timestamp: new Date().toISOString()
  });
});

// ================================
// Default Route
// ================================

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ================================
// 404 Handler
// ================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// ================================
// Start Server
// ================================

app.listen(PORT, () => {
  console.log("======================================");
  console.log(" Save Every Drop Server Started");
  console.log("======================================");
  console.log(` Server : http://localhost:${PORT}`);
  console.log(` Health : http://localhost:${PORT}/api/health`);
  console.log("======================================");
});

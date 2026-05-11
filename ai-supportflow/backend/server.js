require("dotenv").config();
const express = require("express");
const cors = require("cors");

const chatRoutes = require("./routes/chat");
const ticketRoutes = require("./routes/tickets");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ─────────────────────────────────────────────────
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.use(express.json());

// ── Request logger (dev) ───────────────────────────────────────
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ── Routes ─────────────────────────────────────────────────────
app.use("/chat", chatRoutes);
app.use("/tickets", ticketRoutes);

// Health check
app.get("/health", (_req, res) =>
  res.json({ status: "ok", timestamp: new Date().toISOString() })
);

// ── Start ──────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 AI SupportFlow backend running on http://localhost:${PORT}`);
  console.log(`   Gemini API Key: ${process.env.GEMINI_API_KEY ? "✅ Set" : "❌ Missing"}\n`);
});

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import suggestRouter from "./routes/suggest.js";
import resumeRouter from "./routes/resumes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.ALLOWED_ORIGIN?.split(",") || true }));
app.use(express.json({ limit: "1mb" }));

// Routes
app.use("/api/suggest", suggestRouter);
app.use("/api/resumes", resumeRouter);

app.get("/", (req, res) => res.json({ ok: true, service: "Smart Resume Backend" }));

// DB connect and start
const start = async () => {
  try {
    const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/smart_resume";
    await mongoose.connect(uri);
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
  } catch (err) {
    console.error("Startup error:", err);
    process.exit(1);
  }
};

start();

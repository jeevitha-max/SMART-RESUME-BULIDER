import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema({
  title: String,
  content: String
}, { _id: false });

const ResumeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  summary: String,
  experience: [SectionSchema],
  education: [SectionSchema],
  skills: [String],
  projects: [SectionSchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Resume", ResumeSchema);

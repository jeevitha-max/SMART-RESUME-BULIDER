import React, { useState } from "react";
import { suggest, saveResume } from "../api";

const emptySection = () => ({ title: "", content: "" });

export default function ResumeForm({ resume, setResume, setSuggestions }) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const updateField = (field, value) => setResume({ ...resume, [field]: value });

  const updateArrayItem = (field, idx, key, value) => {
    const arr = [...resume[field]];
    arr[idx] = { ...arr[idx], [key]: value };
    setResume({ ...resume, [field]: arr });
  };

  const addItem = (field) => setResume({ ...resume, [field]: [...resume[field], emptySection()] });
  const removeItem = (field, idx) => {
    const arr = [...resume[field]];
    arr.splice(idx, 1);
    setResume({ ...resume, [field]: arr });
  };

  const onSuggest = async () => {
    try {
      setLoading(true);
      const s = await suggest(resume);
      setSuggestions(s);
    } catch (e) {
      setSuggestions("Suggestion service unavailable. Check API base and OPENAI_API_KEY.");
    } finally {
      setLoading(false);
    }
  };

  const onSave = async () => {
    try {
      setSaving(true);
      const id = await saveResume(resume);
      alert("Saved with id: " + id);
    } catch (e) {
      alert("Save failed. Is backend running & DB configured?");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <input className="input" placeholder="Name" value={resume.name} onChange={e => updateField("name", e.target.value)} />
        <input className="input" placeholder="Email" value={resume.email} onChange={e => updateField("email", e.target.value)} />
        <input className="input" placeholder="Phone" value={resume.phone} onChange={e => updateField("phone", e.target.value)} />
      </div>

      <textarea className="input h-24" placeholder="Professional Summary" value={resume.summary} onChange={e => updateField("summary", e.target.value)} />

      {["experience","education","projects"].map((field) => (
        <div key={field}>
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold capitalize">{field}</h3>
            <button type="button" className="btn" onClick={() => addItem(field)}>+ Add</button>
          </div>
          <div className="space-y-2">
            {resume[field].map((item, idx) => (
              <div key={idx} className="border rounded-lg p-2">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
                  <input className="input md:col-span-2" placeholder="Title / Role"
                    value={item.title} onChange={e => updateArrayItem(field, idx, "title", e.target.value)} />
                  <textarea className="input md:col-span-4" placeholder="Details (achievements, impact, metrics)"
                    value={item.content} onChange={e => updateArrayItem(field, idx, "content", e.target.value)} />
                </div>
                <div className="text-right mt-1">
                  <button type="button" className="btn danger" onClick={() => removeItem(field, idx)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div>
        <h3 className="font-semibold">Skills (comma-separated)</h3>
        <input className="input" placeholder="e.g., React, Node, MongoDB, Tailwind"
          value={resume.skills.join(", ")} onChange={e => updateField("skills", e.target.value.split(",").map(s => s.trim()).filter(Boolean))} />
      </div>

      <div className="flex gap-2 no-print">
        <button type="button" className="btn" onClick={onSuggest} disabled={loading}>
          {loading ? "Getting Suggestions..." : "Get AI Suggestions"}
        </button>
        <button type="button" className="btn" onClick={() => window.print()}>Export PDF</button>
        <button type="button" className="btn" onClick={onSave} disabled={saving}>
          {saving ? "Saving..." : "Save Resume"}
        </button>
      </div>

      <style>{`
        .input { @apply w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring; }
        .btn { @apply px-3 py-2 rounded-lg bg-black text-white hover:opacity-90 transition; }
        .btn.danger { @apply bg-red-600; }
      `}</style>
    </div>
  );
}

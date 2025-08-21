import React, { useState } from "react";
import ResumeForm from "./components/ResumeForm";
import Preview from "./components/Preview";

export default function App() {
  const [resume, setResume] = useState({
    name: "", email: "", phone: "",
    summary: "",
    experience: [], education: [], projects: [],
    skills: []
  });
  const [suggestions, setSuggestions] = useState("");

  return (
    <div className="min-h-screen max-w-6xl mx-auto p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">Smart Resume Builder</h1>
        <p className="text-sm text-gray-600">AI suggestions • Live preview • Print to PDF</p>
      </header>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow p-4">
          <ResumeForm resume={resume} setResume={setResume} setSuggestions={setSuggestions} />
          {suggestions && (
            <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
              <h3 className="font-semibold mb-2">AI Suggestions</h3>
              <pre className="whitespace-pre-wrap text-sm">{suggestions}</pre>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow p-4">
          <Preview resume={resume} />
        </div>
      </div>
    </div>
  );
}

import React from "react";

export default function Preview({ resume }) {
  const { name, email, phone, summary, experience, education, projects, skills } = resume;

  return (
    <div className="prose max-w-none print:prose-sm">
      <div className="border-b pb-2 mb-2">
        <h2 className="text-xl font-bold">{name || "Your Name"}</h2>
        <p className="text-sm text-gray-700">{[email, phone].filter(Boolean).join(" • ")}</p>
      </div>

      {summary && (
        <section className="mb-2">
          <h3 className="font-semibold">Summary</h3>
          <p className="text-sm">{summary}</p>
        </section>
      )}

      {skills?.length > 0 && (
        <section className="mb-2">
          <h3 className="font-semibold">Skills</h3>
          <p className="text-sm">{skills.join(" • ")}</p>
        </section>
      )}

      {experience?.length > 0 && (
        <section className="mb-2">
          <h3 className="font-semibold">Experience</h3>
          <ul className="text-sm list-disc ml-5">
            {experience.map((e, i) => <li key={i}><b>{e.title}</b>: {e.content}</li>)}
          </ul>
        </section>
      )}

      {projects?.length > 0 && (
        <section className="mb-2">
          <h3 className="font-semibold">Projects</h3>
          <ul className="text-sm list-disc ml-5">
            {projects.map((p, i) => <li key={i}><b>{p.title}</b>: {p.content}</li>)}
          </ul>
        </section>
      )}

      {education?.length > 0 && (
        <section className="mb-2">
          <h3 className="font-semibold">Education</h3>
          <ul className="text-sm list-disc ml-5">
            {education.map((ed, i) => <li key={i}><b>{ed.title}</b>: {ed.content}</li>)}
          </ul>
        </section>
      )}
    </div>
  );
}

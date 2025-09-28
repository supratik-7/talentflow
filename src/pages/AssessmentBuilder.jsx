import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function AssessmentBuilder() {
  const { jobId } = useParams();
  const [title, setTitle] = useState("");
  const [sections, setSections] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    text: "",
    type: "short",
    points: 5,
  });

  useEffect(() => {
    axios.get(`/api/assessments/${jobId}`).then((r) => {
      if (Array.isArray(r.data) && r.data.length > 0) {
        setTitle("");
        setSections([]);
      }
    });
  }, [jobId]);

  const addQuestion = () => {
    if (!newQuestion.text.trim()) return;
    const updated = [...sections];
    if (updated.length === 0) updated.push({ title: "Section 1", questions: [] });
    updated[0].questions.push(newQuestion);
    setSections(updated);
    setNewQuestion({ text: "", type: "short", points: 5 });
  };

  const save = async () => {
    await axios.put(`/api/assessments/${jobId}`, {
      jobId,
      title: title || `Assessment ${Date.now()}`,
      sections,
    });
    alert("Assessment saved successfully");

    
    setTitle("");
    setSections([]);
    setNewQuestion({ text: "", type: "short", points: 5 });
  };

  return (
    <div className="card bg-white text-black border border-green-600 shadow-md p-6">
      <h1 className="text-2xl font-bold text-green-600 mb-4">
        Builder for Job {jobId}
      </h1>

      <input
        className="input input-bordered border-green-600 mb-4 w-full"
        placeholder="Assessment Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="mb-4">
        <input
          className="input input-bordered border-green-600 mb-2 w-full"
          placeholder="Question text"
          value={newQuestion.text}
          onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
        />
        <select
          className="select select-bordered border-green-600 mb-2 w-full"
          value={newQuestion.type}
          onChange={(e) => setNewQuestion({ ...newQuestion, type: e.target.value })}
        >
          <option value="short">Short</option>
          <option value="long">Long</option>
          <option value="numeric">Numeric</option>
        </select>
        <input
          type="number"
          className="input input-bordered border-green-600 mb-2 w-full"
          placeholder="Points"
          value={newQuestion.points}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, points: Number(e.target.value) })
          }
        />
        <button className="btn btn-success" onClick={addQuestion}>
          Add Question
        </button>
      </div>

      <div>
        {sections.map((s, i) => (
          <div key={i} className="mb-4 border border-green-600 p-3">
            <h2 className="font-bold">{s.title}</h2>
            <ul>
              {s.questions.map((q, idx) => (
                <li key={idx}>
                  {q.text} ({q.type}, {q.points} pts)
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button className="btn btn-success w-full mt-4" onClick={save}>
        Save Assessment
      </button>
    </div>
  );
}

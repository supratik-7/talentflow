import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import QuestionForm from "../components/QuestionForm";

export default function AssessmentsPage() {
  const { jobId } = useParams();
  const [assessments, setAssessments] = useState([]);
  const [selected, setSelected] = useState(null);
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [candidateName, setCandidateName] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    axios.get(`/api/assessments/${jobId}`).then((r) => {
      setAssessments(Array.isArray(r.data) ? r.data : [r.data]);
    });
  }, [jobId]);

  const handleChange = (idx, val) => {
    setResponses((prev) => ({ ...prev, [idx]: val }));
  };

  const startAssessment = () => {
    if (candidateName.trim() !== "" && selected) setStarted(true);
  };

  const submit = async () => {
    let total = 0;
    selected.sections.forEach((s) =>
      s.questions.forEach((q, idx) => {
        if (responses[idx]) total += q.points || 0;
      })
    );
    setScore(total);
    await axios.post(`/api/assessments/${jobId}/submit`, {
      assessmentId: selected.id,
      candidateName,
      answers: responses,
      score: total,
    });
    setSubmitted(true);
  };

  if (!assessments.length) return <div>No assessments available</div>;

  if (!started) {
    return (
      <div className="card bg-white text-black border border-green-600 shadow-md p-6 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Assessments for Job {jobId}
        </h1>
        <input
          type="text"
          placeholder="Enter your name"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
          className="input input-bordered w-full mb-4 border-green-600"
        />
        <select
          className="select select-bordered w-full mb-4 border-green-600"
          onChange={(e) =>
            setSelected(assessments.find((a) => a.id === e.target.value))
          }
        >
          <option value="">Select Assessment</option>
          {assessments.map((a) => (
            <option key={a.id} value={a.id}>
              {a.title}
            </option>
          ))}
        </select>
        <button className="btn btn-success w-full" onClick={startAssessment}>
          Start Assessment
        </button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="alert alert-success shadow-lg border border-green-600">
        ✅ Submitted! {candidateName}'s Score: <b>{score}</b> /{" "}
        {selected.sections.reduce(
          (sum, s) =>
            sum + s.questions.reduce((ss, q) => ss + (q.points || 0), 0),
          0
        )}{" "}
        on <b>{selected.title}</b>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-green-500 mb-2">
        {selected.title}
      </h1>
      <h2 className="text-lg mb-6">
        Candidate: <span className="text-green-600">{candidateName}</span>
      </h2>
      {selected.sections.map((s, i) => (
        <div
          key={i}
          className="card bg-white text-black border border-green-600 shadow-md p-6 mb-6"
        >
          <h2 className="text-xl font-semibold mb-4">{s.title}</h2>
          {s.questions.map((q, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="font-medium">{q.text}</label>
                <span className="badge badge-success">{q.points} pts</span>
              </div>
              <QuestionForm
                q={q}
                value={responses[idx]}
                onChange={(val) => handleChange(idx, val)}
              />
            </div>
          ))}
        </div>
      ))}
      <button
        className="btn btn-success w-full mt-4 border border-green-600"
        onClick={submit}
      >
        Submit Assessment
      </button>
    </div>
  );
}

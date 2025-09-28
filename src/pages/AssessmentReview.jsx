import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function AssessmentReview() {
  const { jobId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get(`/api/assessments/${jobId}`).then((r) =>
      setAssessments(Array.isArray(r.data) ? r.data : [r.data])
    );
  }, [jobId]);

  useEffect(() => {
    if (selected) {
      axios
        .get(`/api/assessments/${jobId}/review`, {
          params: { assessmentId: selected.id },
        })
        .then((r) => setSubmissions(r.data));
    }
  }, [jobId, selected]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-green-500 mb-4">
        Review Submissions
      </h1>

      <select
        className="select select-bordered border-green-600 mb-4 bg-white text-black"
        onChange={(e) =>
          setSelected(assessments.find((a) => a.id === e.target.value))
        }
      >
        <option value="">Select Assessment</option>
        {assessments.map((a) => (
          <option key={a.id} value={a.id} className="text-black">
            {a.title}
          </option>
        ))}
      </select>

      {!selected && (
        <div className="alert alert-info">Select an assessment to review</div>
      )}

      {selected && submissions.length === 0 && (
        <div className="alert alert-warning">
          No submissions for {selected.title}
        </div>
      )}

      {selected && submissions.length > 0 && (
        <div className="overflow-x-auto">
          <h2 className="text-lg font-semibold mb-2">{selected.title}</h2>
          <table className="table table-zebra w-full border border-green-600">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Score</th>
                <th>Answers</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s, i) => (
                <tr key={i}>
                  <td>{s.candidateName}</td>
                  <td>{s.score}</td>
                  <td>
                    <ul>
                      {Object.entries(s.answers || {}).map(([idx, ans]) => (
                        <li key={idx}>
                          Q{idx}: {ans}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

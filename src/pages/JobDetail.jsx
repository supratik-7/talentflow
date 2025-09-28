import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function JobDetail() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [assessments, setAssessments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/jobs/${jobId}`).then((r) => setJob(r.data));
    axios.get(`/api/assessments/${jobId}`).then((r) =>
      setAssessments(r.data.sections?.length ? [r.data] : [])
    );
  }, [jobId]);

  if (!job) return <div>Loading...</div>;

  return (
    <div className="card bg-white text-black border border-green-600 shadow-md p-6">
      <h1 className="text-2xl font-bold text-green-600 mb-2">{job.title}</h1>
      <p className="text-sm mb-4">{job.description || "No description available."}</p>
      <div className="flex gap-2 flex-wrap mb-4">
        {job.tags?.map((t, i) => (
          <span key={i} className="badge badge-outline badge-success text-xs">
            {t}
          </span>
        ))}
      </div>
      {assessments.length > 0 && (
        <button
          className="btn btn-success border border-green-600"
          onClick={() => navigate(`/assessments/${job.id}`)}
        >
          Take Assessment
        </button>
      )}
    </div>
  );
}

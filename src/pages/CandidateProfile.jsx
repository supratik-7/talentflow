import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function CandidateProfile() {
  const { id } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get(`/api/candidates/${id}`).then((r) => setCandidate(r.data));

    
    setJobs([
      { title: "Frontend Developer", status: "applied" },
      { title: "Backend Engineer", status: "screen" },
    ]);
  }, [id]);

  if (!candidate) return <div>Loading...</div>;

  return (
    <div className="card bg-white text-black border border-green-600 shadow-md p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-2">{candidate.name}</h1>
      <p className="text-sm">{candidate.email}</p>
      <p className="text-sm italic opacity-70 mb-4">{candidate.profile}</p>

      <h2 className="text-lg font-semibold mb-2">Jobs Applied</h2>
      <ul className="list-disc ml-6">
        {jobs.map((j, i) => (
          <li key={i} className="mb-1">
            {j.title} —{" "}
            <span className="badge badge-outline badge-success">{j.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

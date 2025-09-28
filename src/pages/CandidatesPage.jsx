import React, { useEffect } from "react";
import useCandidatesStore from "../store/candidatesStore";
import { Link } from "react-router-dom";

export default function CandidatesPage() {
  const { candidates, fetchCandidates, loading } = useCandidatesStore();

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-green-500 mb-6">Candidates</h1>
      {loading && <progress className="progress w-56"></progress>}
      <ul className="divide-y divide-green-600 border border-green-600 rounded bg-white text-black shadow-md">
        {candidates.slice(0, 30).map((c) => (
          <li key={c.id} className="p-4 hover:bg-green-50 transition flex justify-between items-center">
            <div>
              <Link to={`/candidates/${c.id}`} className="text-green-600 font-semibold hover:underline">
                {c.name}
              </Link>
              <p className="text-xs opacity-70">{c.email}</p>
              <p className="text-xs italic opacity-70">{c.profile}</p>
            </div>
            <span className="badge badge-outline badge-success">{c.stage}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

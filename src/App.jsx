import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import JobsPage from "./pages/JobsPage";
import CandidatesPage from "./pages/CandidatesPage";
import JobDetail from "./pages/JobDetail";
import CandidateProfile from "./pages/CandidateProfile";
import AssessmentsPage from "./pages/AssessmentsPage";
import AssessmentBuilder from "./pages/AssessmentBuilder";
import AssessmentReview from "./pages/AssessmentReview";

export default function App() {
  return (
    <div className="min-h-screen bg-neutral text-white">
      
      <nav className="navbar bg-black text-green-500 shadow-lg px-8 sticky top-0 z-50 border-b border-green-600">
        <div className="flex-1">
          <Link to="/" className="text-2xl font-bold tracking-wide">
            TalentFlow
          </Link>
        </div>
        <div className="flex gap-3">
          <Link to="/jobs" className="btn btn-sm btn-outline btn-success rounded-full">
            Jobs
          </Link>
          <Link to="/candidates" className="btn btn-sm btn-outline btn-success rounded-full">
            Candidates
          </Link>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-sm btn-outline btn-success rounded-full">
              Assessments
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[100] menu p-2 shadow bg-white text-black rounded-box w-60 border border-green-600"
            >
              <li><Link to="/assessments/1">Take (Job 1)</Link></li>
              <li><Link to="/assessments/1/builder">Builder (Job 1)</Link></li>
              <li><Link to="/assessments/1/review">Review (Job 1)</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      
      <div className="p-6">
        <Routes>
          <Route path="/" element={<JobsPage home />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:jobId" element={<JobDetail />} />
          <Route path="/candidates" element={<CandidatesPage />} />
          <Route path="/candidates/:id" element={<CandidateProfile />} />
          <Route path="/assessments/:jobId" element={<AssessmentsPage />} />
          <Route path="/assessments/:jobId/builder" element={<AssessmentBuilder />} />
          <Route path="/assessments/:jobId/review" element={<AssessmentReview />} />
        </Routes>
      </div>
    </div>
  );
}

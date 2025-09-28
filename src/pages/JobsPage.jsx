import React, { useEffect, useState } from "react";
import useJobsStore from "../store/jobsStore";
import { Link } from "react-router-dom";

export default function JobsPage({ home = false }) {
  const { jobs, fetchJobs, addJob, updateJob, loading } = useJobsStore();
  const [search, setSearch] = useState("");
  const [newJob, setNewJob] = useState({ title: "", description: "", tags: [] });
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    fetchJobs({ search, status: home ? "active" : "" });
  }, [search, home, fetchJobs]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") fetchJobs({ search });
  };

  const handleSearch = () => {
    fetchJobs({ search });
  };

  const handleCreate = async () => {
    if (newJob.title.trim() !== "") {
      await addJob({
        title: newJob.title,
        description: newJob.description,
        slug: newJob.title.toLowerCase().replace(/\s+/g, "-"),
        status: "active",
        tags: newJob.tags,
      });

     
      await fetchJobs({ search, status: home ? "active" : "" });

      setShowModal(false);
      setNewJob({ title: "", description: "", tags: [] });
      setToast("✅ Job created successfully");
      setTimeout(() => setToast(""), 3000);
    }
  };

  const toggleStatus = (job) => {
    let next =
      job.status === "active"
        ? "archived"
        : job.status === "archived"
        ? "closed"
        : "active";
    updateJob(job.id, { status: next });
    setToast(`ℹ️ Job status updated to ${next}`);
    setTimeout(() => setToast(""), 3000);
  };

  const requirements = [
    "React",
    "Node.js",
    "Python",
    "SQL",
    "Cloud",
    "UI/UX",
    "DevOps",
  ];

  const toggleTag = (tag) => {
    setNewJob((prev) => {
      const exists = prev.tags.includes(tag);
      return {
        ...prev,
        tags: exists ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
      };
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-green-500 mb-6">
        {home ? "Available Jobs" : "Jobs"}
      </h1>

     
      <div className="flex gap-2 mb-6">
        <input
          className="input input-bordered w-full max-w-sm bg-white text-black border border-green-600"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="btn btn-success" onClick={handleSearch}>
          Search
        </button>
        {!home && (
          <button className="btn btn-success" onClick={() => setShowModal(true)}>
            Create Job
          </button>
        )}
      </div>

      {loading && <progress className="progress w-56"></progress>}

      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="card bg-white text-black border border-green-600 shadow-md p-4 hover:shadow-xl transition"
          >
            <h2 className="text-lg font-semibold text-green-600">{job.title}</h2>
            <p className="text-sm opacity-80">
              {job.description || "Exciting opportunity to join our team."}
            </p>
            <div className="flex gap-2 mt-2 flex-wrap">
              {job.tags.map((t, i) => (
                <span key={i} className="badge badge-outline badge-success text-xs">
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-3 flex justify-between items-center">
              <button
                onClick={() => toggleStatus(job)}
                className={`btn btn-xs ${
                  job.status === "active"
                    ? "btn-success"
                    : job.status === "archived"
                    ? "btn-warning"
                    : "btn-error"
                }`}
              >
                {job.status}
              </button>
              <div className="flex gap-2">
                <Link
                  to={`/jobs/${job.id}`}
                  className="btn btn-xs btn-outline btn-success"
                >
                  View
                </Link>
                <Link
                  to={`/assessments/${job.id}`}
                  className="btn btn-xs btn-outline btn-primary"
                >
                  Take Assessment
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box bg-white text-black border border-green-600">
            <h3 className="font-bold text-lg mb-4">Create Job</h3>
            <input
              className="input input-bordered w-full mb-3 border-green-600"
              placeholder="Job Title"
              value={newJob.title}
              onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
            />
            <textarea
              className="textarea textarea-bordered w-full mb-3 border-green-600"
              placeholder="Description"
              value={newJob.description}
              onChange={(e) =>
                setNewJob({ ...newJob, description: e.target.value })
              }
            />
            <h4 className="font-semibold mb-2">Requirements</h4>
            <div className="flex flex-wrap gap-2 mb-3">
              {requirements.map((req) => (
                <button
                  key={req}
                  type="button"
                  onClick={() => toggleTag(req)}
                  className={`badge cursor-pointer px-3 py-2 border ${
                    newJob.tags.includes(req)
                      ? "badge-success"
                      : "badge-outline"
                  }`}
                >
                  {req}
                </button>
              ))}
            </div>
            <div className="modal-action">
              <button className="btn btn-success" onClick={handleCreate}>
                Save
              </button>
              <button className="btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      
      {toast && (
        <div className="toast toast-end">
          <div className="alert alert-success border border-green-600">
            <span>{toast}</span>
          </div>
        </div>
      )}
    </div>
  );
}

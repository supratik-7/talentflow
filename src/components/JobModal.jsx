import React, { useState } from "react";
import useJobsStore from "../store/jobsStore";

export default function JobModal({ onClose }) {
  const createJob = useJobsStore(s => s.createJob);
  const [title,setTitle]=useState("");
  const [slug,setSlug]=useState("");
  const [error,setError]=useState("");

  const submit=async()=>{
    if(!title) return setError("Title required");
    if(!slug) return setError("Slug required");
    try {
      await createJob({ title, slug, status:"active", tags:[], order:0 });
      onClose();
    } catch(e){
      setError(e.response?.data?.error || "Failed to create job");
    }
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box bg-base-100">
        <h3 className="font-bold text-lg">Create Job</h3>
        {error && <div className="alert alert-error my-2">{error}</div>}
        <input className="input input-bordered w-full my-2" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)}/>
        <input className="input input-bordered w-full my-2" placeholder="Slug" value={slug} onChange={e=>setSlug(e.target.value)}/>
        <div className="modal-action">
          <button className="btn btn-primary" onClick={submit}>Save</button>
          <button className="btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

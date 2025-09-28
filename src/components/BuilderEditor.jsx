import React, { useState } from "react";

export default function BuilderEditor({ sections, setSections }) {
  const [text, setText] = useState("");
  const [type, setType] = useState("short");

  const addQuestion = () => {
    if (!text) return;
    const newQ = { text, type, required: false };
    const updated = [...sections];
    updated[0].questions.push(newQ);
    setSections(updated);
    setText("");
  };

  return (
    <div className="p-4 border rounded bg-base-200">
      <h2 className="font-bold text-primary mb-2">Add Question</h2>
      <input
        className="input input-bordered w-full mb-2"
        placeholder="Question text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select
        className="select select-bordered w-full mb-2"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="short">Short text</option>
        <option value="long">Long text</option>
        <option value="choice">Single choice</option>
        <option value="numeric">Numeric</option>
        <option value="file">File upload</option>
      </select>
      <button className="btn btn-primary btn-sm" onClick={addQuestion}>
        Add
      </button>
    </div>
  );
}

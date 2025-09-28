import React from "react";

export default function QuestionForm({ q, value, onChange }) {
  switch (q.type) {
    case "short":
      return (
        <input
          className="input input-bordered w-full"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case "long":
      return (
        <textarea
          className="textarea textarea-bordered w-full"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case "choice":
      return q.options.map((opt) => (
        <label key={opt} className="label cursor-pointer">
          <input
            type="radio"
            className="radio checked:bg-primary"
            checked={value === opt}
            onChange={() => onChange(opt)}
          />
          <span className="ml-2">{opt}</span>
        </label>
      ));
    case "numeric":
      return (
        <input
          type="number"
          min={q.min}
          max={q.max}
          className="input input-bordered w-full"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case "file":
      return <input type="file" className="file-input file-input-bordered w-full" />;
    default:
      return null;
  }
}

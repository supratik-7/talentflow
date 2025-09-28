import React, { useState } from "react";

const users = ["Alice","Bob","Charlie","David"]; 
export default function NotesBox({ candidateId }) {
  const [notes,setNotes]=useState([]);
  const [text,setText]=useState("");

  const addNote=()=>{
    if(!text) return;
    setNotes([...notes,{text, date:new Date().toLocaleString()}]);
    setText("");
  };

  const renderMentions = (t) => {
    return t.split(" ").map((word,i)=>{
      if(word.startsWith("@") && users.includes(word.slice(1))){
        return <span key={i} className="text-primary font-semibold">{word} </span>;
      }
      return word+" ";
    });
  };

  return (
    <div>
      <textarea value={text} onChange={e=>setText(e.target.value)}
        className="textarea textarea-bordered w-full mb-2"
        placeholder="Write a note with @mentions..." />
      <button className="btn btn-sm btn-primary mb-4" onClick={addNote}>Add Note</button>

      <ul className="space-y-2">
        {notes.map((n,i)=>(
          <li key={i} className="border p-2 rounded bg-base-200">
            <p>{renderMentions(n.text)}</p>
            <p className="text-xs opacity-70">{n.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

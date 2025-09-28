
import Dexie from "dexie";

const db = new Dexie("TalentFlowDB");

db.version(1).stores({
  jobs: "id,title,description,status,tags,order",
  candidates: "id,name,email,stage,profile",
  assessments: "id,jobId,title,sections",
  submissions: "id,jobId,assessmentId,candidateName,score,answers",
});

export default db;

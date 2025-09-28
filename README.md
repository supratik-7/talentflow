# 🌱 TalentFlow – A Mini Hiring Platform

TalentFlow is a **React + Vite** web application that simulates a lightweight hiring platform.  
It allows managing **jobs, candidates, and assessments** with a mock API powered by **MirageJS**.

---

## 🚀 Features
- **Jobs Board**  
  - View active and archived jobs  
  - Create new jobs with title, description, tags  
  - Update job status (active/archived)  

- **Candidates**  
  - Browse candidates with name, email, and stage  
  - Candidate profile view with job applications  

- **Assessments**  
  - Multiple assessments per job  
  - Assessment builder (sections, questions)  
  - Take assessment and submit responses  
  - Review submissions  

- **Mock API (MirageJS)**  
  - `/api/jobs` → jobs list  
  - `/api/candidates` → candidates list  
  - `/api/assessments/:jobId` → assessments for a job  
  - `/api/test` → test route to check Mirage is running  

---

## 🛠️ Tech Stack
- **React 18 + Vite** → Frontend framework & dev server  
- **React Router v6** → Routing & navigation  
- **Tailwind CSS + DaisyUI** → UI styling & components  
- **MirageJS** → Mock REST API (in-browser)  
- **IndexedDB (Dexie)** *(for dev mode only)* → Persistence across refresh  
- **Vercel** → Deployment  

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repo
```bash
git clone https://github.com/supratik-7/talentflow
cd talentflow

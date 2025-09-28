import { createServer, Factory, Model } from "miragejs";
import db from "../db";

export function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment,

    models: {
      job: Model,
      candidate: Model,
      assessment: Model,
      submission: Model,
    },

    factories: {
      job: Factory.extend({
        title(i) {
          const titles = [
            "Frontend Developer",
            "Backend Engineer",
            "Full Stack Developer",
            "Data Analyst",
            "Machine Learning Engineer",
            "DevOps Engineer",
            "Product Manager",
            "UI/UX Designer",
            "QA Engineer",
            "Mobile App Developer",
          ];
          return titles[i % titles.length];
        },
        description(i) {
          const descriptions = [
            "Build modern, responsive UIs using React and Tailwind.",
            "Develop scalable backend APIs with Node.js and Express.",
            "Work across frontend and backend to deliver full features.",
            "Analyze datasets and generate insights with SQL and Python.",
            "Build ML models and deploy them into production systems.",
            "Maintain CI/CD pipelines, cloud infra, and automation tools.",
            "Drive product strategy and manage cross-functional teams.",
            "Design user-friendly interfaces with wireframes and mockups.",
            "Test applications for bugs and ensure product quality.",
            "Develop Android/iOS apps with React Native or Flutter.",
          ];
          return descriptions[i % descriptions.length];
        },
        slug(i) {
          return `job-${i + 1}`;
        },
        status() {
          return Math.random() > 0.2 ? "active" : "archived";
        },
        order(i) {
          return i;
        },
        tags() {
          const tags = ["react", "node", "python", "cloud", "sql", "design"];
          return tags.slice(0, Math.floor(Math.random() * 3) + 1);
        },
      }),

      candidate: Factory.extend({
        name(i) {
          const names = [
            "Alice Johnson",
            "Bob Smith",
            "Charlie Brown",
            "David Wilson",
            "Eva Taylor",
            "Frank Lee",
            "Grace Miller",
            "Hannah Davis",
            "Ian Clark",
            "Jasmine White",
          ];
          return names[i % names.length];
        },
        email(i) {
          return `candidate${i + 1}@example.com`;
        },
        stage() {
          const stages = ["applied", "screen", "tech", "offer", "hired", "rejected"];
          return stages[Math.floor(Math.random() * stages.length)];
        },
        profile(i) {
          const bios = [
            "Frontend specialist with React/Next.js experience.",
            "Backend engineer with Node.js and database expertise.",
            "Data enthusiast with SQL and visualization skills.",
            "UI/UX designer with Figma and prototyping background.",
            "DevOps engineer focusing on CI/CD pipelines.",
          ];
          return bios[i % bios.length];
        },
      }),
    },

    async seeds(server) {
      const jobsCount = await db.jobs.count();
      if (jobsCount === 0) {
        const jobs = server.createList("job", 25);
        db.jobs.bulkPut(jobs.map((j) => j.attrs));
      }

      const candidatesCount = await db.candidates.count();
      if (candidatesCount === 0) {
        const candidates = server.createList("candidate", 200);
        db.candidates.bulkPut(candidates.map((c) => c.attrs));
      }

      const assessmentsCount = await db.assessments.count();
      if (assessmentsCount === 0) {
        server.create("assessment", {
          id: "a1",
          jobId: "1",
          title: "Frontend Basics",
          sections: [
            {
              title: "React",
              questions: [
                { text: "What is React?", type: "short", points: 5 },
                { text: "Explain useState hook.", type: "short", points: 10 },
              ],
            },
          ],
        });

        server.create("assessment", {
          id: "a2",
          jobId: "1",
          title: "JavaScript Advanced",
          sections: [
            {
              title: "JavaScript",
              questions: [
                { text: "What is a closure?", type: "long", points: 10 },
                { text: "Explain event loop in JS.", type: "short", points: 10 },
              ],
            },
          ],
        });
      }
    },

    routes() {
      this.namespace = "api";
      this.timing = 400;

      
      this.get("/jobs", async (schema, req) => {
        const { search = "", status = "" } = req.queryParams;
        let jobs = await db.jobs.toArray();

        if (search)
          jobs = jobs.filter((j) =>
            j.title.toLowerCase().includes(search.toLowerCase())
          );
        if (status) jobs = jobs.filter((j) => j.status === status);

        
        jobs.sort((a, b) => Number(b.id) - Number(a.id));

        return { data: jobs, total: jobs.length };
      });

      this.get("/jobs/:id", async (schema, req) => {
        const job = await db.jobs.get(req.params.id);
        return job;
      });

      this.post("/jobs", async (schema, req) => {
        const attrs = JSON.parse(req.requestBody);
        const job = {
          ...attrs,
          id: Date.now().toString(),
          order: await db.jobs.count(),
        };
        await db.jobs.put(job);
        return job;
      });

      this.patch("/jobs/:id", async (schema, req) => {
        const id = req.params.id;
        const updates = JSON.parse(req.requestBody);
        const job = await db.jobs.get(id);
        if (!job) return { error: "Job not found" };
        const updated = { ...job, ...updates };
        await db.jobs.put(updated);
        return updated;
      });

      this.get("/candidates", async () => await db.candidates.toArray());
      this.get("/candidates/:id", async (schema, req) => {
        return await db.candidates.get(req.params.id);
      });

      this.get("/assessments/:jobId", async (schema, req) => {
        const jobId = req.params.jobId;
        return await db.assessments.where("jobId").equals(jobId).toArray();
      });

      this.put("/assessments/:jobId", async (schema, req) => {
        const jobId = req.params.jobId;
        const data = JSON.parse(req.requestBody);
        const assessment = {
          id: "a" + Date.now(),
          jobId,
          title: data.title || `Assessment ${Date.now()}`,
          sections: data.sections || [],
        };
        await db.assessments.put(assessment);
        return assessment;
      });

      this.post("/assessments/:jobId/submit", async (schema, req) => {
        const { jobId } = req.params;
        const submission = JSON.parse(req.requestBody);
        const record = { id: "s" + Date.now(), jobId, ...submission };
        await db.submissions.put(record);
        return { success: true };
      });

      this.get("/assessments/:jobId/review", async (schema, req) => {
        const { jobId } = req.params;
        const { assessmentId } = req.queryParams;
        let subs = await db.submissions.where("jobId").equals(jobId).toArray();
        if (assessmentId) {
          subs = subs.filter((s) => s.assessmentId === assessmentId);
        }
        return subs;
      });
    },
  });
}

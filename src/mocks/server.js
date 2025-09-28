import { createServer, Factory, Model } from "miragejs";

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

    seeds(server) {
      console.log("🌱 Seeding demo data...");

      server.createList("job", 10);
      server.createList("candidate", 50);

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
    },

    routes() {
      this.namespace = "api";
      this.timing = 400;

      this.get("/test", () => {
        return { ok: true, message: "MirageJS is running 🎉" };
      });

      this.get("/jobs", (schema) => schema.all("job"));
      this.post("/jobs", (schema, req) => {
        const attrs = JSON.parse(req.requestBody);
        return schema.create("job", { ...attrs, id: Date.now().toString() });
      });

      this.get("/candidates", (schema) => schema.all("candidate"));
      this.get("/candidates/:id", (schema, req) =>
        schema.find("candidate", req.params.id)
      );

      this.get("/assessments/:jobId", (schema, req) =>
        schema.where("assessment", { jobId: req.params.jobId })
      );

      this.put("/assessments/:jobId", (schema, req) => {
        const jobId = req.params.jobId;
        const data = JSON.parse(req.requestBody);
        return schema.create("assessment", {
          id: "a" + Date.now(),
          jobId,
          title: data.title || `Assessment ${Date.now()}`,
          sections: data.sections || [],
        });
      });

      this.post("/assessments/:jobId/submit", (schema, req) => {
        const { jobId } = req.params;
        const { candidateName, answers, score, assessmentId } = JSON.parse(
          req.requestBody
        );
        return schema.create("submission", {
          id: "s" + Date.now(),
          jobId,
          assessmentId,
          candidateName,
          answers,
          score,
        });
      });

      this.get("/assessments/:jobId/review", (schema, req) => {
        const { jobId } = req.params;
        const { assessmentId } = req.queryParams;
        let subs = schema.where("submission", { jobId }).models;
        if (assessmentId) {
          subs = subs.filter((s) => s.assessmentId === assessmentId);
        }
        return subs;
      });
    },
  });
}

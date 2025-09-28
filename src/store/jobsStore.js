import { create } from "zustand";
import axios from "axios";

const useJobsStore = create((set, get) => ({
  jobs: [],
  total: 0,
  page: 1,
  pageSize: 100,
  loading: false,

  fetchJobs: async ({ search = "", status = "" } = {}) => {
    set({ loading: true });
    const res = await axios.get("/api/jobs", { params: { search, status } });
    set({
      jobs: res.data.data,
      total: res.data.total,
      loading: false,
    });
  },

  addJob: async (job) => {
    const res = await axios.post("/api/jobs", job);
    set((state) => ({
      jobs: [...state.jobs, res.data],
      total: state.total + 1,
    }));
    return res.data;
  },

  updateJob: async (id, updates) => {
    set((state) => ({
      jobs: state.jobs.map((j) =>
        j.id === id ? { ...j, ...updates } : j
      ),
    }));
  },
}));

export default useJobsStore;

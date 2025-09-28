import { create } from "zustand";
import axios from "axios";

const useCandidatesStore = create((set) => ({
  candidates: [],
  search: "",
  stage: "",
  loading: false,

  fetchCandidates: async (search="", stage="") => {
    set({ loading: true });
    const res = await axios.get("/api/candidates", { params: { search, stage }});
    set({ candidates: res.data, loading: false, search, stage });
  },

  updateStage: async (id, stage) => {
    await axios.patch(`/api/candidates/${id}`, { stage });
    set((state)=>({
      candidates: state.candidates.map(c=> c.id===id? {...c, stage}: c )
    }));
  }
}));

export default useCandidatesStore;

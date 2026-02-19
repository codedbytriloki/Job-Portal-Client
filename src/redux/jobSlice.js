import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    singleJob: null,
    allAdminJob: [],
    searchTextByJob: "",
    appliedJobs: [],
    searchQuery: ""
  },
  reducers: {
    // actions
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAdminJobs: (state, action) => {
      state.allAdminJob = action.payload;
    },
    setSearchTextByJob: (state, action) => {
      state.searchTextByJob = action.payload;
    },
    setAppliedJobs: (state, action) => {
      state.appliedJobs = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    }
  }
});

export const { setAllJobs, setSingleJob, setAdminJobs, setSearchTextByJob, setAppliedJobs, setSearchQuery } = jobSlice.actions;
export default jobSlice.reducer;

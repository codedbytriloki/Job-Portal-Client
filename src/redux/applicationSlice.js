import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: 'applicatiion',
  initialState: {
    applicants: [],
  },
  reducers: {
    setAllApplicants: (state, action) => {
      state.applicants = action.payload;
    }
  }
});

export const { setAllApplicants } = applicationSlice.actions;
export default applicationSlice.reducer;
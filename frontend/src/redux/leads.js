import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  leads: null,
};

const leadsSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    setLeads(state, action) {
      state.leads = action.payload;
    },
    resetLeads(state) {
      state.leads = null;
    }
  },
});

export const { setLeads, resetLeads } = leadsSlice.actions;
export default leadsSlice.reducer;
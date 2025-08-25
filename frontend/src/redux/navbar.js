import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeClass: "Dashboard",
};

const navbarSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setActiveClass(state, action) {
      state.activeClass = action.payload;
    }
  },
});

export const { setActiveClass } = navbarSlice.actions;
export default navbarSlice.reducer;
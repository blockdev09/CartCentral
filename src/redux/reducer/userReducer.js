import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  loading: true,
};
export const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    userExist: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    userNotExists: (state) => {
      state.user = null;
      state.loading = false;
    },
  },
});

export const { userExist, userNotExists } = userReducer.actions;

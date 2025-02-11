import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    errorMessage: "",
    successMessage: "",
    userData: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.errorMessage = "";
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.loading = false;
      state.errorMessage = "";
    },
    clearUser: (state) => {
      state.user = null;
      state.userData = null;
      state.loading = false;
      state.errorMessage = "";
      state.successMessage = "";
    },
    setError: (state, action) => {
      state.errorMessage = action.payload;
      state.successMessage = "";
      state.loading = false;
    },
    setSuccess: (state, action) => {
      state.successMessage = action.payload;
      state.errorMessage = "";
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearMessages: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
});

export const {
  setUser,
  clearUser,
  setUserData,
  setError,
  setSuccess,
  clearMessages,
  setLoading,
} = authSlice.actions;

const rootReducer = {
  auth: authSlice.reducer,
};
export default rootReducer;

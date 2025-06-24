import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  loginData: any | null;
}

const initialState: AuthState = {
  loginData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ loginData: any }>) => {
      state.loginData = action.payload.loginData;
    },
    logout: (state) => {
      state.loginData = null;
    },
    clearLoginState: (state) => {
      state.loginData = null;
    },
  },
});

export const { setCredentials, logout, clearLoginState } = authSlice.actions;
export default authSlice.reducer;

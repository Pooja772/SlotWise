import { createSlice, PayloadAction } from "@reduxjs/toolkit";
 
interface SnackbarState {
  open?: boolean;
  message: string;
  severity: "success" | "error" | "warning" | "info";
  title?: string;
  autoHideDuration?: number;
}
 
const initialState: SnackbarState = {
  open: false,
  message: "",
  severity: "info",
  title: "",
  autoHideDuration: 3000,
};
 
const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbar: (state, action: PayloadAction<SnackbarState>) => {
      return { ...state, ...action.payload, open: true };
    },
    hideSnackbar: (state) => {
      state.open = false;
    },
    clearSnackbar: (state) => {
      return { ...initialState };
    },
  },
});
 
export const { showSnackbar, hideSnackbar, clearSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
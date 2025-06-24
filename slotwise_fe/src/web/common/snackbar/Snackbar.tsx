"use client";
 
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { hideSnackbar } from "@/redux/features/snackbarSlice";
 
const getColorForSeverity = (severity: string) => {
  switch (severity) {
    case "success":
      return "#2e7d32"; // green
    case "error":
      return "#d32f2f"; // red
    case "warning":
      return "#ed6c02"; // orange
    case "info":
    default:
      return "#0288d1"; // blue
  }
};
 
const CustomSnackbar = () => {
  const dispatch = useDispatch();
  const { open, message, severity = "info", title, autoHideDuration } = useSelector(
    (state: any) => state.snackbar
  );
 
  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    dispatch(hideSnackbar());
  };
 
  const textColor = getColorForSeverity(severity);
 
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration ?? 2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        severity={severity}
        variant="outlined"
        onClose={handleClose}
        sx={(theme) => ({
          width: "auto",
          maxWidth: 450,
          backgroundColor: "#fff",
          color: textColor,
          fontSize: theme.typography.body2.fontSize,
          wordBreak: "break-word",
          // whiteSpace: "pre-line",
          border: `1px solid ${textColor}`,
          "& .MuiAlertTitle-root": {
            color: textColor,
            fontSize: theme.typography.body1.fontSize,
            fontWeight: 600,
          },
        })}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Snackbar>
  );
};
 
export default CustomSnackbar;
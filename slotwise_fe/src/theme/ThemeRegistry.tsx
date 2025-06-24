"use client";

import { ReactNode } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createCustomTheme } from "../theme/theme";
import { themes } from "@/constants/themes";

interface ThemeRegistryProps {
  children: ReactNode;
  themeVariant?: "default"; // Add variant as needed
}

export default function ThemeRegistry({
  children,
  themeVariant = "default",
}: ThemeRegistryProps) {
  const themeData = themes[themeVariant];
  const theme = createCustomTheme(themeData);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

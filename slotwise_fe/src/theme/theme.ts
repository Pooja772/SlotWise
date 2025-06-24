"use client";

import { createTheme } from '@mui/material/styles';
import { fontSizes } from "@/constants/fontSizes";

export const createCustomTheme = (themeData: any) => {
  return createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 500,
        md: 750,// Medium: 750px and above
        lg: 1200,
        xl: 1536,
      },
    },
    palette: {
      primary: {
        main: themeData?.primaryColor || "#F07F09", // Orange
        light: "#FFAE59",
        dark: "#DE7304",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: themeData?.secondaryColor || "#6A1B9A", // Purple
        light: "#A94FCF",
        dark: "#4A0072",
        contrastText: "#FFFFFF",
      },
      error: {
        main: "#FF3B30",
        light: "#FF625F",
        dark: "#E04440",
        contrastText: "#FFFFFF",
      },
      warning: {
        main: "#FDB528",
        light: "#FDBE42",
        dark: "#DF9F23",
        contrastText: "#FFFFFF",
      },
      success: {
        main: "#72E128",
        light: "#83E542",
        dark: "#64C623",
        contrastText: "#FFFFFF",
      },
      background: {
        default: themeData?.backgroundColor || "#FFFDE7",
      },
      text: {
        primary:"#212121",
        secondary: "#656565",
        disabled:"#9E9E9E",
      },
    },
    typography: {
        fontFamily: themeData?.fontStyle || "Inter, Arial, sans-serif",
        h1: {
          fontSize: fontSizes.px35.md,
          "@media (max-width: 1200px)": {
            fontSize: fontSizes.px35.sm, // For medium devices like tablets
          },
          "@media (max-width: 768px)": {
            fontSize: fontSizes.px35.xs, // For small devices like mobile phones
          },
        },
        h2: {
          fontSize: fontSizes.px30.md,
          "@media (max-width: 1200px)": {
            fontSize: fontSizes.px30.sm,
          },
          "@media (max-width: 768px)": {
            fontSize: fontSizes.px30.xs,
          },
        },
        h3: {
          fontSize: fontSizes.px28.md,
          "@media (max-width: 1200px)": {
            fontSize: fontSizes.px28.sm,
          },
          "@media (max-width: 768px)": {
            fontSize: fontSizes.px28.xs,
          },
        },
        h4: {
          fontSize: fontSizes.px24.md,
          "@media (max-width: 1200px)": {
            fontSize: fontSizes.px24.sm,
          },
          "@media (max-width: 768px)": {
            fontSize: fontSizes.px24.sm,
          },
        },
        h5: {
          fontSize: fontSizes.px20.md,
          "@media (max-width: 1200px)": {
            fontSize: fontSizes.px20.sm,
          },
          "@media (max-width: 768px)": {
            fontSize: fontSizes.px20.md,
          },
        },
        h6: {
          fontSize: fontSizes.px16.md,
          "@media (max-width: 1200px)": {
            fontSize: fontSizes.px16.sm,
          },
          "@media (max-width: 768px)": {
            fontSize: fontSizes.px16.xs,
          },
        },
        body1: {
          fontSize: fontSizes.px16.md,
          "@media (max-width: 1200px)": {
            fontSize: fontSizes.px16.sm,
          },
          "@media (max-width: 768px)": {
            fontSize: fontSizes.px16.xs,
          },
        },
        body2: {
          fontSize: fontSizes.px14.md,
          "@media (max-width: 1200px)": {
            fontSize: fontSizes.px14.sm,
          },
          "@media (max-width: 768px)": {
            fontSize: fontSizes.px14.xs,
          },
        },
        button: {
          fontSize: fontSizes.px16.md,
          "@media (max-width: 1200px)": {
            fontSize: fontSizes.px16.sm,
          },
          "@media (max-width: 768px)": {
            fontSize: fontSizes.px16.xs,
          },
        },
      },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: "#fff",
            borderRadius: "8px",
            "&.Mui-focused": {
              backgroundColor: "#fff",
            },
            "& input": {
              color: themeData?.primaryTextColor || "#212121",
              transition: "color 0s ease 0s, background-color 0s ease 0s",
            },
            "& input:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 1000px #fff inset !important",
              WebkitTextFillColor: themeData?.primaryTextColor || "#212121",
              transitionDelay: "9999s",
            },
            "& input:-webkit-autofill:focus": {
              WebkitBoxShadow: "0 0 0 1000px #fff inset !important",
              WebkitTextFillColor: themeData?.primaryTextColor || "#212121",
            },
          },
        },
      },
    },
    
  });
};

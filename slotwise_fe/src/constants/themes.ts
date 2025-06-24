interface ThemeProperties {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  primaryTextColor: string;
  secondaryTextColor: string;
  highlightTextColor: string;
  fontStyle: string;
}

interface Themes {
  default: ThemeProperties;
}

export const themes: Themes = {
  default: {
    primaryColor: "#1976D2", // Blue
    secondaryColor: "#90CAF9", // Light Blue
    backgroundColor: "#FFFFFF", // White
    primaryTextColor: "#0D47A1", // Dark Blue Text
    secondaryTextColor: "#1976D2", // Primary Blue Text
    highlightTextColor: "#64B5F6", // Sky Blue Highlight
    fontStyle: "Inter, Arial, sans-serif",
  },
};

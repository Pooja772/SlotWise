import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import ThemeRegistry from "@/theme/ThemeRegistry";
import ReduxProvider from "@/redux/store/reduxProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import CustomSnackbar from "@/web/common/snackbar/Snackbar";
 
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
 
export const metadata: Metadata = {
  title: "SlotWise",
  description: "Booking System Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ThemeRegistry themeVariant="default">
            <AppRouterCacheProvider>
              {children}
              <CustomSnackbar />
            </AppRouterCacheProvider>
          </ThemeRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
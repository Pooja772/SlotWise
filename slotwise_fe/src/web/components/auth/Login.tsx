"use client";

import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import LoginForm from "@/web/components/auth/LoginComponents/LoginFormComponents";
import { useLoginMutation } from "@/redux/services/authService/authApi";
import { clearLoginState, setCredentials } from "@/redux/features/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { clearSnackbar, showSnackbar } from "@/redux/features/snackbarSlice";
import { encryptPassword, isFetchBaseQueryError } from "@/utility/utils";
// import { clearSelectedUser } from "@/redux/features/users/userSlice";

const LoginInPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const [login, loginResponse] = useLoginMutation();

  useEffect(() => {
    dispatch(clearLoginState());
    dispatch(clearSnackbar());
  }, []);

  useEffect(() => {
    if (loginResponse.isSuccess) {
      setIsLoading(false);

      dispatch(
        showSnackbar({
          open: true,
          message: loginResponse?.data?.message,
          severity: "success",
          title: "Success",
        })
      );
      const email = loginResponse?.data?.result?.user?.email;
      console.log("loginResponse", loginResponse?.data?.result);

      console.log("emaillllllllllllllll", email);

      dispatch(setCredentials({ loginData: loginResponse?.data?.result }));
      email.includes("admin") ? router.push("/booking") : router.push("/slots");
        // router.push("/booking");
    }
    if (loginResponse.isLoading) {
      setIsLoading(true);
    }
    if (loginResponse.isError) {
      setIsLoading(false);

      const error = loginResponse.error;

      let errorMessage = "Login Failed";
      if (isFetchBaseQueryError(error)) {
        errorMessage = (error?.data as any)?.message ?? errorMessage;
      }

      dispatch(
        showSnackbar({
          open: true,
          message: errorMessage,
          severity: "error",
          title: "Error",
        })
      );
    }
  }, [loginResponse.isSuccess, loginResponse.isError, loginResponse.isLoading]);

  const handleLogin = async (data: any) => {
    setError(null);
    const encryptedPassword = encryptPassword(data?.password);
    const portal = data?.email.includes("admin") ? "Admin" : "User";

    const payload = {
      email: data?.email,
      password: encryptedPassword,
      portal: portal,
    };

    await login(payload);
  };

  return (
    <>
      <Box sx={{ height: "100vh", overflow: "hidden" }}>
        <Grid
          container
          sx={{ height: "100%" }}
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            size={{ xs: 12, md: 12, lg: 7, xl: 7 }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <LoginForm
              onSubmit={handleLogin}
              isLoading={isLoading}
              error={error}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default LoginInPage;

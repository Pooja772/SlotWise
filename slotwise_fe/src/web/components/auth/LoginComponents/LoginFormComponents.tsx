"use client";

import React, { useEffect, useState } from "react";
import { IconButton, Typography, Box, Grid } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { CommonInputField } from "@/web/common/input/CommonInputField";
import {
  AccountCircleOutlinedIcon,
  VisibilityIcon,
  VisibilityOffIcon,
  LockOutlinedIcon,
} from "@/assets/index";
import { useRouter } from "next/navigation";
import {
  AUTH_LABELS,
  AUTH_MESSAGES,
  AUTH_TITLES,
  BUTTON_TEXT,
  COMMON_MESSAGES,
} from "@/constants/constants";
import { VALIDATION_REGEX } from "@/constants/regex";
import CommonButton from "@/web/common/button/CommonButton";

interface LoginFormProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
  error: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>({
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Box width="100%">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{
          px: 2,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        width="100%"
      >
        <Box
          sx={{
            p: 4,
            backgroundColor: "#fff",
            borderRadius: 2,
            boxShadow: `
              0px 4px 20px 0px rgba(0, 0, 0, 0.07),
              inset 0px 0px 30px 0px rgba(0, 0, 0, 0.08)
            `,
          }}
        >
          <Typography
            data-testid="login-title"
            textAlign="left"
            sx={(theme) => ({
              fontSize: theme.typography.h4.fontSize,
              fontWeight: 600,
            })}
          >
            {AUTH_TITLES?.login?.pageTitle}
          </Typography>
          <Typography
            data-testid="login-subtitle"
            mb={5}
            textAlign="left"
            sx={(theme) => ({
              fontSize: theme.typography.body2.fontSize,
              color: theme.palette.text.secondary,
              maxWidth: "395px",
              wordBreak: "break-word",
            })}
          >
            {AUTH_TITLES?.login?.subtitle}
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} data-testid="login-form">
            <Box width="100%" mb={2}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: COMMON_MESSAGES?.emailRequired,
                  pattern: {
                    value: VALIDATION_REGEX?.email,
                    message: COMMON_MESSAGES?.invalidEmail,
                  },
                }}
                render={({ field }: any) => (
                  <CommonInputField
                    fullWidth
                    labelText={AUTH_LABELS?.login?.emailLabel}
                    type="email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    startIcon={
                      <AccountCircleOutlinedIcon width={20} height={20} />
                    }
                    {...field}
                  />
                )}
              />
            </Box>

            <Box width="100%" mb={2}>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: AUTH_MESSAGES?.passwordRequired,
                  minLength: {
                    value: 8,
                    message: AUTH_MESSAGES?.passwordMinLength,
                  },
                  pattern: {
                    value: VALIDATION_REGEX.password,
                    message: AUTH_MESSAGES?.passwordAlphaNumericRequired,
                  },
                }}
                render={({ field }: any) => (
                  <CommonInputField
                    fullWidth
                    labelText={AUTH_LABELS.login.passwordLabel}
                    type={showPassword ? "text" : "password"}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    startIcon={<LockOutlinedIcon width={20} height={20} />}
                    infoText={AUTH_MESSAGES?.passwordInfoText}
                    endIcon={
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityIcon width={18} height={18} />
                        ) : (
                          <VisibilityOffIcon width={18} height={18} />
                        )}
                      </IconButton>
                    }
                    {...field}
                  />
                )}
              />
            </Box>

            <Box display="flex" justifyContent="flex-end" mb={2}>
              <Typography
                data-testid="forgot-password-link"
                color="primaryTextColor"
                variant="caption"
                sx={(theme) => ({
                  cursor: "pointer",
                  fontSize: theme.typography.body2.fontSize,
                  color: theme.palette.text.secondary,
                  textDecoration: "underline",
                  textDecorationThickness: "1px",
                  textUnderlineOffset: "3px",
                  transition:
                    "color 0.3s ease, font-weight 0.3s ease, text-shadow 0.3s ease",
                  "&:hover": {
                    color: "rgb(138, 12, 223)",
                    fontWeight: 500,
                    textShadow: "0 0 3px rgba(0, 0, 0, 0.1)",
                  },
                })}
                onClick={() => alert("Forgot password Link")}
              >
                {AUTH_TITLES?.login?.forgetPasswordLink}
              </Typography>
            </Box>

            {error && (
              <Typography color="error" mb={2} data-testid="login-error">
                {error}
              </Typography>
            )}

            <Box mt={3}>
              <CommonButton
                fullWidth
                type="submit"
                label={BUTTON_TEXT?.login}
                disabled={isLoading}
              ></CommonButton>
            </Box>
          </form>
        </Box>
      </Grid>
    </Box>
  );
};

export default LoginForm;

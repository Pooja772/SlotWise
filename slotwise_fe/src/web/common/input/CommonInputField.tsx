import {
  Box,
  TextField,
  TextFieldProps,
  Typography,
  FormHelperText,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import { FC, ReactNode, useMemo } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

type SlotProps = {
  input?: {
    startAdornment?: ReactNode;
    endAdornment?: ReactNode;
  };
};

type CommonInputFieldProps = TextFieldProps & {
  labelText?: string;
  placeholder?: string;
  rightLabelText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  infoText?: string;
  slotProps?: SlotProps;
  fullWidth?: any;
};
 
export const CommonInputField: FC<CommonInputFieldProps> = ({
  labelText,
  placeholder,
  rightLabelText,
  error,
  helperText,
  startIcon,
  endIcon,
  infoText,
  fullWidth,
  slotProps = {},
  ...props
}) => {
  const finalSlotProps = useMemo(() => {
    const updatedSlotProps = { ...slotProps };
 
    if (!updatedSlotProps.input) {
      updatedSlotProps.input = {};
    }
 
    if (startIcon) {
      updatedSlotProps.input.startAdornment = (
        <InputAdornment
          position="start"
          sx={{ display: "flex", alignItems: "center" }}
        >
          {startIcon}
        </InputAdornment>
      );
    } else {
      updatedSlotProps.input.startAdornment = null;
    }
 
    if (endIcon || infoText) {
      updatedSlotProps.input.endAdornment = (
        <InputAdornment
          position="end"
          sx={{
            pr: 2,
            display: "flex",
            alignItems: "center",
            gap: 1.2,
            maxWidth: "95%",
            overflow: "hidden",
          }}
        >
          {endIcon}
          {infoText && (
            <Tooltip title={infoText} placement="top-start">
              <InfoOutlinedIcon
                fontSize="small"
                style={{ color: "#909090", cursor: "pointer" }}
              />
            </Tooltip>
          )}
        </InputAdornment>
      );
    } else {
      updatedSlotProps.input.endAdornment = null;
    }
 
    return updatedSlotProps;
  }, [startIcon, endIcon, infoText, slotProps]);
 
  return (
    <Box mb={2}>
      {(labelText || rightLabelText) && (
        <Box display="flex" justifyContent="space-between" mb={0.5}>
          {labelText && (
            <Typography
              sx={(theme) => ({
                fontSize: theme.typography.body2.fontSize,
              })}
              fontWeight={500}
            >
              {labelText}
            </Typography>
          )}
          {rightLabelText && (
            <Typography
              sx={(theme) => ({
                fontSize: theme.typography.body2.fontSize,
              })}
              color="text.secondary"
            >
              {rightLabelText}
            </Typography>
          )}
        </Box>
      )}
 
      <TextField
        data-testid="text-field"
        fullWidth
        variant="outlined"
        size="small"
        placeholder={placeholder}
        value={props.value}
        onChange={props.onChange}
        inputRef={props.inputRef}
        error={error}
        slotProps={finalSlotProps}
        {...props}
        sx={(theme) => ({
          minWidth: "395px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            fontSize: theme.typography.body2.fontSize,
            backgroundColor: "#fff",
            "&.Mui-focused": {
              backgroundColor: "#fff",
              borderColor: theme.palette.primary.main,
            },
            "& input:-webkit-autofill": {
              fontSize: `${theme.typography.body2.fontSize} !important`,
            },
            "& input:-webkit-autofill:focus": {
              fontSize: `${theme.typography.body2.fontSize} !important`,
            },
            "& .MuiInputAdornment-root": {
              "& svg, img": {
                width: "25px",
                height: "25px",
                [theme.breakpoints.down("sm")]: {
                  width: "15px",
                  height: "15px",
                },
                [theme.breakpoints.down("md")]: {
                  width: "20px",
                  height: "20px",
                },
              },
            },
          },
        })}
      />
 
      {error && helperText && (
        <FormHelperText error sx={{ ml: 1.5 }}>
          {helperText}
        </FormHelperText>
      )}
    </Box>
  );
};
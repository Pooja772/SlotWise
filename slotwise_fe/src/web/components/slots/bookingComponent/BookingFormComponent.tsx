import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Grid, Typography } from "@mui/material";
import CommonButton from "@/web/common/button/CommonButton";
import { CommonInputField } from "@/web/common/input/CommonInputField";
import {
  AccountCircleOutlined,
  CalendarToday,
  AccessTime,
} from "@mui/icons-material";

export interface BookingFormData {
  name: string;
  email: string;
  bookingDate: string;
  timeSlot: string;
}

interface BookingFormProps {
  defaultValues: BookingFormData;
  onSubmit: (data: BookingFormData) => void;
  onCancel: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  defaultValues,
  onSubmit,
  onCancel,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BookingFormData>({
    defaultValues: {
      name: "",
      email: "",
      bookingDate: defaultValues?.bookingDate || "",
      timeSlot: defaultValues?.timeSlot || "",
    },
  });

  return (
    <Box width="100%" mt={4}>
      <Typography variant="h5" textAlign="center" gutterBottom>
        Book Selected Slot
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <CommonInputField
                  fullWidth
                  labelText="Name"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  startIcon={<AccountCircleOutlined />}
                  {...field}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              }}
              render={({ field }) => (
                <CommonInputField
                  fullWidth
                  labelText="Email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  startIcon={<AccountCircleOutlined />}
                  {...field}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name="bookingDate"
              control={control}
              render={({ field }) => (
                <CommonInputField
                  fullWidth
                  labelText="Booking Date"
                  disabled
                  startIcon={<CalendarToday />}
                  {...field}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name="timeSlot"
              control={control}
              render={({ field }) => (
                <CommonInputField
                  fullWidth
                  labelText="Time Slot"
                  disabled
                  startIcon={<AccessTime />}
                  {...field}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Box display="flex" justifyContent="space-between">
              <CommonButton type="submit" label="Confirm Booking"/>
              <CommonButton type="button" label="Cancel" onClick={onCancel} />
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default BookingForm;

"use client";

// types/slot.ts
export interface Slot {
  _id: string;
  date: string;
  time: string;
  datetime: string;
  available: boolean;
  __v: number;
}

export interface SlotApiResponse {
  status: number;
  statusCode: number;
  message: string;
  result: Slot[];
}

export interface BookingData {
  slotId: string;
  date: string;
  time: string;
  datetime: string;
  userDetails?: {
    name: string;
    email: string;
    phone: string;
  };
}

import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  CircularProgress,
  Alert,
  Container,
  Paper,
  Divider,
  IconButton,
  Fab,
} from "@mui/material";
import {
  AccessTime,
  CheckCircle,
  Cancel,
  DateRange,
  Refresh,
  BookOnline,
  Logout,
} from "@mui/icons-material";
import { format, parseISO } from "date-fns";
import { useGetAllSlotsQuery } from "@/redux/services/slotService/slotApi";
import BookingForm, {
  BookingFormData,
} from "./bookingComponent/BookingFormComponent"; // Adjust the path as per your project
import { useAddBookingMutation } from "@/redux/services/bookingService/bookingApi";
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "@/redux/features/snackbarSlice";
import { isFetchBaseQueryError } from "@/utility/utils";
import { RootState } from "@/redux/store/store";
import BookingConfirmationModal from "./bookingComponent/BookingConfirmationComponent";
import { clearLoginState } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";

const SlotListingPage: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const loginData = useSelector((state: RootState) => state.auth.loginData);

  console.log("loginData", loginData);

  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [confirmedBookingData, setConfirmedBookingData] = useState<any>(null);
  const [formData, setFormData] = useState<any>(null);

  const { data, error, isLoading, refetch } = useGetAllSlotsQuery(
    { params: {} },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [addBooking, addBookingResponse] = useAddBookingMutation();

  useEffect(() => {
    if (addBookingResponse?.isSuccess) {
      dispatch(
        showSnackbar({
          open: true,
          message: addBookingResponse?.data?.message,
          severity: "success",
          title: "Success",
        })
      );
      setConfirmedBookingData(addBookingResponse?.data?.result);
      refetch();
    }
    if (addBookingResponse?.isError) {
      const error = addBookingResponse?.error;

      let errorMessage = "Something Went Worng";
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
  }, [addBookingResponse?.isSuccess, addBookingResponse?.isError]);

  useEffect(() => {
    setIsConfirmationOpen(true);
  }, [confirmedBookingData]);

  const slots = data?.result || [];
  const availableCount = slots.filter((s: Slot) => s.available).length;
  const bookedCount = slots.filter((s: Slot) => !s.available).length;

  const handleSlotClick = (slot: Slot) => {
    if (slot.available) {
      setSelectedSlotId(slot._id);
      setSelectedSlot(slot);
    }
  };

  const formatTime = (time: string) => {
    try {
      const [hours, minutes] = time.split(":");
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes));
      return format(date, "h:mm a");
    } catch {
      return time;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "EEEE, MMM d, yyyy");
    } catch {
      return dateString;
    }
  };

  // Group slots by date
  const slotsByDate = slots.reduce(
    (acc: Record<string, Slot[]>, slot: Slot) => {
      if (!acc[slot.date]) acc[slot.date] = [];
      acc[slot.date].push(slot);
      return acc;
    },
    {}
  );

  const handleBookingFormSubmit = (formData: BookingFormData) => {
    console.log("Booking Data Submitted: ", formData);
    // Place your API call to book the slot here
    const payload = {
      ...formData,
      userId: loginData?.user?._id,
      slotId: selectedSlotId,
    };

    addBooking(payload);
    setFormData(formData);

    setShowBookingForm(false);
    setSelectedSlotId(null);
    setSelectedSlot(null);
  };

  const handleBookingFormCancel = () => {
    setShowBookingForm(false);
  };

  const handleClose = () => {
    setIsConfirmationOpen(false);
    setFormData(null);
  };

  const handleLogout = () => {
    dispatch(clearLoginState());
    router.push("/");
  };

  console.log("confirmed booking data", formData);

  if (isLoading || addBookingResponse?.isLoading) {
    return (
      <Container maxWidth="lg">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
          gap={2}
        >
          <CircularProgress size={60} />
          <Typography variant="h6" color="text.secondary">
            Loading available slots...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Alert
          severity="error"
          sx={{ mt: 2 }}
          action={
            <IconButton color="inherit" size="small" onClick={() => refetch()}>
              <Refresh />
            </IconButton>
          }
        >
          Failed to load slots.
        </Alert>
      </Container>
    );
  }

  if (slots.length === 0) {
    return (
      <Container maxWidth="lg">
        <Paper elevation={1} sx={{ p: 4, textAlign: "center", mt: 2 }}>
          <DateRange sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
          <Typography variant="h5" color="text.secondary" gutterBottom>
            No slots available
          </Typography>
          <IconButton color="primary" onClick={() => refetch()} sx={{ mt: 2 }}>
            <Refresh />
          </IconButton>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ position: "absolute", top: 16, right: 16 }}>
        <IconButton onClick={handleLogout} sx={{ color: "black" }}>
          <Logout />
        </IconButton>
      </Box>
      <Box sx={{ py: 3, position: "relative" }}>
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center" gap={2}>
              <DateRange color="primary" sx={{ fontSize: 32 }} />
              <Box>
                <Typography variant="h4">Available Time Slots</Typography>
              </Box>
            </Box>
            <IconButton onClick={() => refetch()} color="primary">
              <Refresh />
            </IconButton>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box display="flex" gap={2} flexWrap="wrap">
            <Chip
              icon={<CheckCircle />}
              label={`${availableCount} Available`}
              color="success"
            />
            <Chip
              icon={<Cancel />}
              label={`${bookedCount} Booked`}
              color="error"
              variant="outlined"
            />
            <Chip
              label={`Total: ${slots.length} slots`}
              color="primary"
              variant="outlined"
            />
          </Box>
        </Paper>

        {/* Render slots grouped by date */}
        {Object.entries(slotsByDate).map(([date, dateSlots]: any) => (
          <Box key={date} sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              {formatDate(date)}
            </Typography>
            <Grid container spacing={2}>
              {dateSlots.map((slot: any) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={slot._id}>
                  <Card
                    elevation={
                      slot.available ? (selectedSlotId === slot._id ? 4 : 2) : 1
                    }
                    sx={{
                      cursor: slot.available ? "pointer" : "not-allowed",
                      transition: "all 0.3s ease",
                      opacity: slot.available ? 1 : 0.6,
                      border:
                        selectedSlotId === slot._id
                          ? "2px solid"
                          : "2px solid transparent",
                      borderColor:
                        selectedSlotId === slot._id
                          ? "primary.main"
                          : "transparent",
                      "&:hover": {
                        transform: slot.available ? "translateY(-4px)" : "none",
                      },
                    }}
                    onClick={() => handleSlotClick(slot)}
                  >
                    <CardContent
                      sx={{ textAlign: "center", py: 3, position: "relative" }}
                    >
                      {selectedSlotId === slot._id && (
                        <CheckCircle
                          sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            color: "primary.main",
                          }}
                        />
                      )}
                      <AccessTime
                        sx={{
                          fontSize: 48,
                          color: slot.available
                            ? "primary.main"
                            : "text.secondary",
                          mb: 1,
                        }}
                      />
                      <Typography variant="h4" fontWeight="bold" gutterBottom>
                        {formatTime(slot.time)}
                      </Typography>
                      <Chip
                        label={slot.available ? "Available" : "Booked"}
                        color={slot.available ? "success" : "error"}
                        variant={slot.available ? "filled" : "outlined"}
                        icon={slot.available ? <CheckCircle /> : <Cancel />}
                        size="small"
                      />
                      {slot.available && (
                        <Typography
                          variant="caption"
                          display="block"
                          sx={{ mt: 1, color: "text.secondary" }}
                        >
                          Click to book
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}

        {selectedSlotId && !showBookingForm && (
          <Fab
            color="primary"
            variant="extended"
            sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000 }}
            onClick={() => setShowBookingForm(true)}
          >
            <BookOnline sx={{ mr: 1 }} /> Book Selected Slot
          </Fab>
        )}

        {showBookingForm && selectedSlot && (
          <Paper
            elevation={3}
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              p: 3,
              bgcolor: "background.paper",
              zIndex: 1200,
            }}
          >
            <Typography variant="h5" mb={2}>
              Complete Your Booking
            </Typography>
            <BookingForm
              defaultValues={{
                name: "",
                email: "",
                bookingDate: selectedSlot.date,
                timeSlot: selectedSlot.time,
              }}
              onSubmit={handleBookingFormSubmit}
              onCancel={handleBookingFormCancel}
            />
          </Paper>
        )}
        {confirmedBookingData && formData && (
          <BookingConfirmationModal
            open={isConfirmationOpen}
            onClose={handleClose}
            bookingData={confirmedBookingData}
            formData={formData}
          />
        )}

        <Paper elevation={1} sx={{ p: 2, mt: 3, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            {availableCount > 0
              ? `${availableCount} slots available`
              : "No slots available"}
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default SlotListingPage;

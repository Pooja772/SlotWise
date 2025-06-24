import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
  Box,
} from "@mui/material";

interface BookingConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  bookingData: any
  formData: any;
}

const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  open,
  onClose,
  bookingData,
  formData,
}) => {
  if (!bookingData) return null;

  const { slotId, name, email, bookedAt } = bookingData;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle
        sx={{
          fontWeight: 700,
          fontSize: (theme) => theme.typography.body1.fontSize,
        }}
      >
        Booking Confirmed
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="body1">
            <strong>Name:</strong> {name}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {email}
          </Typography>
          <Typography variant="body1">
            <strong>Date:</strong> {formData?.bookingDate}
          </Typography>
          <Typography variant="body1">
            <strong>Time:</strong> {formData?.timeSlot}
          </Typography>
          <Typography variant="body1">
            <strong>Booked At:</strong> {new Date(bookedAt).toLocaleString()}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingConfirmationModal;

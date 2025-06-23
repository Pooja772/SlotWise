import { Router } from "express";
import { Validator } from "../../../utility/validator";
import { createBookingValidation } from "../validators/bookingValidation";
import BookingController from "../controllers/booking";
import { validateToken } from "../../../utility/validateToken";

const bookingRouter = Router();

bookingRouter.post(
  "/booking",
  validateToken,
  createBookingValidation,
  Validator.makeValidation,
  BookingController.createBooking
);
bookingRouter.get("/bookings", validateToken, BookingController.getAllBookings);

export default bookingRouter;

import bookingService from "../services/booking";
import { Request, Response } from "express";
import { respHandler } from "../../../res-handler";
import { RESPONSE_STATUS } from "../../../res-handler/constants";

export class BookingController {
  async createBooking(req: Request, res: Response) {
    try {
      const booking = await bookingService.createBooking(req);
      respHandler.apiResponseSuccess(
        res,
        booking,
        RESPONSE_STATUS.SUCCESS_CREATED,
        "Booking created successfully"
      );
    } catch (error) {
      respHandler.sendError(res, error);
    }
  }

  async getAllBookings(req: Request, res: Response) {
    try {
      const bookings = await bookingService.getAllBookings(req);
      respHandler.apiResponseSuccess(
        res,
        bookings,
        RESPONSE_STATUS.SUCCESS,
        "Bookings fetched successfully"
      );
    } catch (error) {
      respHandler.sendError(res, error);
    }
  }
}

export default new BookingController();

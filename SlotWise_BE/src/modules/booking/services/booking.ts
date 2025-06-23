import Bookings from "../models/booking";
import Slots from "../../slots/models/slots";
import { Exception } from "../../../res-handler";
import { RESPONSE_STATUS, ERROR_TYPE } from "../../../res-handler/constants";
import Users from "../../users/models/users";

export class BookingService {
  createBooking = async (req: any) => {
    const { userId, slotId, name, email } = req.body;
    const userExist = await Users.findById(userId);
    if (!userExist) {
      throw new Exception(
        RESPONSE_STATUS.BAD_REQUEST,
        ERROR_TYPE.BAD_REQUEST,
        "User does not exists for this userId"
      );
    }
    const slot = await Slots.findById(slotId);
    if (!slot || !slot.available) {
      throw new Exception(
        RESPONSE_STATUS.BAD_REQUEST,
        ERROR_TYPE.BAD_REQUEST,
        "Slot unavailable or does not exist"
      );
    }

    const booking = new Bookings({ slotId, userId, name, email });
    await booking.save();
    slot.available = false;
    await slot.save();

    return booking;
  };

  getAllBookings = async (req: any) => {
    const { userId, name, email } = req.query;
    const filter: any = {};
    if (userId) filter.userId = userId;
    if (name) filter.name = { $regex: name, $options: "i" };
    if (email) filter.email = { $regex: email, $options: "i" };
    return await Bookings.find(filter).populate("slotId");
  };
}

export default new BookingService();

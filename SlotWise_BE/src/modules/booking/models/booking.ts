import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  slotId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  bookedAt: Date;
}

const bookingSchema: Schema = new Schema({
  slotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Slots",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  bookedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IBooking>("Bookings", bookingSchema);

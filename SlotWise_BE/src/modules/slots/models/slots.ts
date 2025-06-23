import mongoose, { Schema, Document } from 'mongoose';

export interface ISlot extends Document {
    date: string;
    time: string;
    datetime: string;
    available: boolean;
}

const slotSchema: Schema = new Schema({
    date: { type: String, required: true },
    time: { type: String, required: true },
    datetime: { type: String, required: true },
    available: { type: Boolean, default: true }
});

export default mongoose.model<ISlot>('Slots', slotSchema);
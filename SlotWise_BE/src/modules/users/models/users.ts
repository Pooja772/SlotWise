import mongoose, { Document, Schema, Types } from "mongoose";
import { IRole } from "../../roles/models/roles";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  roleId: Types.ObjectId | IRole;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Roles",
      required: true,
    },
  },
  { timestamps: true }
);

const Users = mongoose.model<IUser>("Users", userSchema);

export default Users;

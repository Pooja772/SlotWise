import mongoose, { Document, Schema } from "mongoose";

export interface IRole extends Document {
  name: string; // e.g. "Admin", "User", "Manager", etc.
  permissions: string[]; // Array of permissions (optional)
}

const roleSchema = new Schema<IRole>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    permissions: [{ type: String }], // optional, for RBAC or future expansion
  },
  { timestamps: true }
);

const Roles = mongoose.model<IRole>("Roles", roleSchema);

export default Roles;

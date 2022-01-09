import * as mongoose from "mongoose";

export interface IRoleModel extends mongoose.Document {
  organization_id?: any;
  role_code: string;
  role_description: string;
  status: string;
  created_by: string;
  updated_by?: string;
  is_system?: boolean;
}
export const roleSchema = new mongoose.Schema(
  {
    organization_id: { type: mongoose.Schema.Types.ObjectId },
    role_code: { type: String },
    role_description: { type: String },
    status: { type: String },
    created_by: { type: String },
    updated_by: { type: String },
    is_system: { type: Boolean, default: false },
  },
  {
    collection: "role",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

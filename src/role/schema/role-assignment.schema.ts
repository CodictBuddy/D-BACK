import * as mongoose from "mongoose";

export interface IRoleAssignmentModel extends mongoose.Document {
  organization_id?: any;
  user_id?: any;
  role_id?: any;
  created_by?: any;
  updated_by?: any;
}
export const roleAssignmentSchema = new mongoose.Schema(
  {
    organization_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organization",
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    role_id: { type: mongoose.Schema.Types.ObjectId, ref: "role" },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    updated_by: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  {
    collection: "roleAssignment",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

import * as mongoose from "mongoose";
import { Schema } from "mongoose";

export interface IUserActionModel extends mongoose.Document {
  user_id: any;
  identity: any;
  activity: string;
  attempts: number;
  ip_address: string;
  last_attempt_on: number;
  createdOn: number;
  updatedOn: number;
}

export const UserActionSchema = new mongoose.Schema(
  {
    user_id: { type: Schema.Types.ObjectId },
    identity: { type: Schema.Types.ObjectId },
    activity: { type: String },
    attempts: { type: Number },
    last_attempt_on: { type: Number },
    ip_address: { type: String },
    createdOn: { type: Number },
    updatedOn: { type: Number },
  },
  {
    collection: "userAction",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

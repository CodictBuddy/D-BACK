import * as mongoose from "mongoose";

export interface ISequence extends mongoose.Document {
  tenant: number;
  name: string;
  value: number;
}

export const SequenceSchema = new mongoose.Schema(
  {
    tenant: {
      type: "Number",
      description: "The client id",
      example: 100,
    },
    name: {
      type: "String",
      description: "Name of the sequence",
      example: "SEQ_BID",
    },
    value: {
      type: "Number",
      description: "Current number",
      default: 0,
      example: 12,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "sequence",
  }
);

import * as mongoose from "mongoose";
export interface ISequence extends mongoose.Document {
    tenant: number;
    name: string;
    value: number;
}
export declare const SequenceSchema: mongoose.Schema<mongoose.Document<any, any, any>, mongoose.Model<mongoose.Document<any, any, any>, any, any>, undefined, {}>;

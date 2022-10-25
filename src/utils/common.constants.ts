import * as Mongoose from 'mongoose';

// for converting typeof string to typeof ObjectID
export const obj_id = Mongoose.Schema.Types.ObjectId;
export const conv_obj_id = Mongoose.Types.ObjectId;

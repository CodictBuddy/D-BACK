"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActionSchema = void 0;
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
exports.UserActionSchema = new mongoose.Schema({
    user_id: { type: mongoose_1.Schema.Types.ObjectId },
    identity: { type: mongoose_1.Schema.Types.ObjectId },
    activity: { type: String },
    attempts: { type: Number },
    last_attempt_on: { type: Number },
    ip_address: { type: String },
    createdOn: { type: Number },
    updatedOn: { type: Number },
}, {
    collection: "userAction",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});
//# sourceMappingURL=userAction.schema.js.map
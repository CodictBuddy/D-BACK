"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMessageSchema = void 0;
const mongoose = require("mongoose");
const common_constants_1 = require("../../utils/common.constants");
exports.ChatMessageSchema = new mongoose.Schema({
    organization_code: {
        type: Number,
    },
    room_id: { type: common_constants_1.obj_id, ref: "room" },
    sender_id: { type: common_constants_1.obj_id, ref: "user" },
    receiver_id: { type: common_constants_1.obj_id, ref: "user" },
    content: { type: String },
    message_type: {
        type: String,
        default: "conversation",
        example: "notification/conversation",
    },
    message_status: { type: String, default: "New", example: "read/delivered" },
    attachments: [{ type: String }],
    delete_type: { type: String },
    is_delete: { type: Boolean, default: false },
    is_edited: { type: Boolean, default: false },
}, {
    collection: "chat-message",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});
//# sourceMappingURL=chat_message.schema.js.map
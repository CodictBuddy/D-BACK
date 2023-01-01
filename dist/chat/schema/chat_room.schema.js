"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoomSchema = void 0;
const mongoose = require("mongoose");
const common_constants_1 = require("../../utils/common.constants");
exports.ChatRoomSchema = new mongoose.Schema({
    organization_code: {
        type: Number,
    },
    room_name: { type: String },
    recent_message: { type: Number },
    room_cat: {
        type: 'String',
        example: 'Group/individual',
        default: 'individual',
    },
    room_type: { type: String, example: 'Private/Room', default: 'Private' },
    members: [{ type: common_constants_1.obj_id, ref: 'user' }],
    created_by: { type: String },
}, {
    collection: 'chat-room',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});
//# sourceMappingURL=chat_room.schema.js.map
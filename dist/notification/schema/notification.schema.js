"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationSchema = void 0;
const mongoose = require("mongoose");
const common_constants_1 = require("../../utils/common.constants");
exports.notificationSchema = new mongoose.Schema({
    organization_code: {
        type: Number,
    },
    user_id: { type: common_constants_1.obj_id, ref: 'user' },
    target_user_id: { type: common_constants_1.obj_id, ref: 'user' },
    navigation_url: { type: String, example: '/connections/id' },
    type: {
        type: String,
        default: 'Action',
        example: 'Action/Connection/Post',
    },
    notification_message: { type: String },
    isRead: { type: Boolean, default: false },
    isNewNotification: { type: Boolean, default: true },
}, {
    collection: 'notification',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});
//# sourceMappingURL=notification.schema.js.map
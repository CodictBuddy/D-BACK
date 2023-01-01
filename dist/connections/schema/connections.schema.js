"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionsSchema = void 0;
const mongoose = require("mongoose");
const common_constants_1 = require("../../utils/common.constants");
exports.connectionsSchema = new mongoose.Schema({
    organization_code: {
        type: Number,
    },
    type: { type: String, example: 'Connect/following/block' },
    user_id: { type: common_constants_1.obj_id, ref: 'user' },
    target_user_id: { type: common_constants_1.obj_id, ref: 'user' },
    connection_status: {
        type: String,
        default: 'Pending',
        example: 'Accepted/Rejected/Blocked',
    },
}, {
    collection: 'connections',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});
//# sourceMappingURL=connections.schema.js.map
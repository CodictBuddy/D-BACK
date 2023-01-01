"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsSchema = void 0;
const mongoose = require("mongoose");
const common_constants_1 = require("../../utils/common.constants");
exports.commentsSchema = new mongoose.Schema({
    organization_code: {
        type: Number,
    },
    type: { type: String, example: 'content/comment/profile' },
    created_by: { type: common_constants_1.obj_id, ref: 'user' },
    content_id: { type: common_constants_1.obj_id },
    content_data: { type: String },
}, {
    collection: 'comments',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});
//# sourceMappingURL=comments.schema.js.map
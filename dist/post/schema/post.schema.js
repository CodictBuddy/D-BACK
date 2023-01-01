"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = void 0;
const mongoose = require("mongoose");
const common_constants_1 = require("../../utils/common.constants");
exports.postSchema = new mongoose.Schema({
    organization_code: {
        type: Number,
    },
    type: { type: String, example: 'Anyone/Connections' },
    created_by: { type: common_constants_1.obj_id, ref: 'user' },
    title: { type: String, require: true },
    content: { type: String, require: true },
}, {
    collection: 'post',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});
//# sourceMappingURL=post.schema.js.map
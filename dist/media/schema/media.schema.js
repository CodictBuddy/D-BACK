"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaSchema = void 0;
const mongoose = require("mongoose");
const common_constants_1 = require("../../utils/common.constants");
exports.mediaSchema = new mongoose.Schema({
    organization_code: { type: String },
    public_id: { type: String },
    user_id: {
        type: common_constants_1.obj_id,
        ref: 'user',
    },
    url: { type: String },
    type: { type: String },
    created_by: { type: String },
    updated_by: { type: String },
}, {
    collection: 'media',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});
//# sourceMappingURL=media.schema.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleSchema = void 0;
const mongoose = require("mongoose");
exports.roleSchema = new mongoose.Schema({
    organization_id: { type: mongoose.Schema.Types.ObjectId },
    role_code: { type: String },
    role_description: { type: String },
    status: { type: String },
    created_by: { type: String },
    updated_by: { type: String },
    is_system: { type: Boolean, default: false },
}, {
    collection: "role",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});
//# sourceMappingURL=role.schema.js.map
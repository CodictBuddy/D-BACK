"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleAssignmentSchema = void 0;
const mongoose = require("mongoose");
exports.roleAssignmentSchema = new mongoose.Schema({
    organization_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "organization",
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    role_id: { type: mongoose.Schema.Types.ObjectId, ref: "role" },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    updated_by: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
}, {
    collection: "roleAssignment",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});
//# sourceMappingURL=role-assignment.schema.js.map
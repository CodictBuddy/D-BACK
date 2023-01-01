"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequenceSchema = void 0;
const mongoose = require("mongoose");
exports.SequenceSchema = new mongoose.Schema({
    tenant: {
        type: "Number",
        description: "The client id",
        example: 100,
    },
    name: {
        type: "String",
        description: "Name of the sequence",
        example: "SEQ_BID",
    },
    value: {
        type: "Number",
        description: "Current number",
        default: 0,
        example: 12,
    },
}, {
    versionKey: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "sequence",
});
//# sourceMappingURL=sequence.schema.js.map
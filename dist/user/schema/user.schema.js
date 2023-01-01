"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.MediaSchema = exports.PasswordHistorySchema = exports.AddressSchema = exports.PhoneNumberSchema = exports.EmailSchema = exports.LanguageSchema = void 0;
const mongoose = require("mongoose");
const common_constants_1 = require("../../utils/common.constants");
exports.LanguageSchema = new mongoose.Schema({
    description: {
        type: String,
        description: 'Description of the particular attribute in respective language',
    },
    language: {
        type: String,
        description: 'Language code to represent description of the particular attribute',
    },
});
exports.EmailSchema = new mongoose.Schema({
    type: {
        type: String,
        description: 'Types of the email',
        default: 'Primary',
    },
    email: {
        type: String,
        unique: [true, 'this email is already in use'],
        description: 'email id of the user',
    },
    visibility: {
        type: String,
        description: 'Privacy settings of email',
        default: 'Public',
    },
    addedOn: {
        type: Date,
        default: new Date(),
        description: 'The date on which email was added',
    },
    verification: {
        type: Boolean,
        default: false,
        description: 'The date on which email was added',
    },
    verifiedOn: {
        type: Date,
        description: 'The date on which email was added',
    },
});
exports.PhoneNumberSchema = new mongoose.Schema({
    type: {
        type: String,
        description: 'Types of the phone number',
    },
    country: {
        type: String,
        description: 'country of the user',
    },
    ext: {
        type: String,
        description: 'extension of phone number',
        example: '+91',
    },
    phone_number: {
        type: String,
        description: 'phone number of the user',
    },
    visibility: {
        type: String,
        description: 'Privacy settings of email',
        default: 'Public',
    },
    addedOn: {
        type: Date,
        default: new Date(),
        description: 'The date on which email was added',
    },
    verification: {
        type: Boolean,
        default: false,
        description: 'The date on which email was added',
    },
    verifiedOn: {
        type: Date,
        description: 'The date on which email was added',
    },
});
exports.AddressSchema = new mongoose.Schema({
    type: {
        type: String,
        description: 'Types of the address',
    },
    address_line_one: {
        type: String,
        description: 'address of the user',
    },
    address_line_two: {
        type: String,
        description: 'address of the user',
    },
    city: {
        type: String,
        description: 'city of the user',
    },
    state: {
        type: String,
        description: 'state of the user',
    },
    country: {
        type: String,
        description: 'country of the user',
    },
    visibility: {
        type: String,
        description: 'Privacy settings of address',
        default: 'Public',
    },
    pincode: {
        type: String,
        description: 'Privacy settings of address',
    },
});
exports.PasswordHistorySchema = new mongoose.Schema({
    password: {
        type: String,
        description: 'The hashed string of the plain text password give by the user',
    },
    updatedOn: {
        type: Date,
        description: 'The password updated on by the user',
    },
});
exports.MediaSchema = new mongoose.Schema({
    type: {
        type: String,
        description: 'Types of the media',
    },
    visibility: {
        type: String,
        description: 'Privacy settings of email',
        default: 'Public',
    },
    media_id: {
        type: common_constants_1.obj_id,
        ref: 'media',
    },
});
exports.UserSchema = new mongoose.Schema({
    organization_code: { type: Number },
    first_name: [exports.LanguageSchema],
    last_name: [exports.LanguageSchema],
    code: { type: Number },
    retry: { type: Number, default: 0 },
    user_email: exports.EmailSchema,
    user_profile_image: { type: common_constants_1.obj_id, ref: 'media' },
    user_background_image: { type: common_constants_1.obj_id, ref: 'media' },
    user_notification_token: { type: String },
    password: {
        type: String,
        description: 'The hashed string of the plain text password give by the user',
    },
    temp_password: {
        type: String,
    },
    user_role: {
        type: common_constants_1.obj_id,
        ref: 'role',
    },
    user_dob: {
        type: String,
    },
    user_gender: {
        type: String,
    },
    user_account_status: {
        type: String,
        default: 'Inactive',
        description: 'status of the user',
        example: 'Active , Inactive , Blocked',
    },
    user_account_verification: {
        type: Boolean,
        example: 'true/false',
    },
    user_password_history: [exports.PasswordHistorySchema],
    user_about: exports.LanguageSchema,
    user_headline: exports.LanguageSchema,
    user_password_secret: {
        type: Number,
    },
    user_password_secret_expires: {
        type: Number,
    },
    created_by: { type: String },
    is_system: { type: Boolean },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
    },
    updated_by: {
        type: String,
    },
}, {
    collection: 'user',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});
//# sourceMappingURL=user.schema.js.map
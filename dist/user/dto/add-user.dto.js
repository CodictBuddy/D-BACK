"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Media = exports.Address = exports.PhoneNumber = exports.Email = exports.Language = exports.AddUserDTO = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class AddUserDTO {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsObject(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => Language),
    __metadata("design:type", Language)
], AddUserDTO.prototype, "first_name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsObject(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => Language),
    class_validator_1.IsString(),
    __metadata("design:type", Language)
], AddUserDTO.prototype, "last_name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AddUserDTO.prototype, "user_name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AddUserDTO.prototype, "user_designation", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", Array)
], AddUserDTO.prototype, "user_department", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", Object)
], AddUserDTO.prototype, "user_groups", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AddUserDTO.prototype, "user_location", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsObject(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => Email),
    __metadata("design:type", Email)
], AddUserDTO.prototype, "user_email", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => Email),
    __metadata("design:type", Array)
], AddUserDTO.prototype, "alternate_email", void 0);
__decorate([
    class_validator_1.IsNotEmptyObject(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => PhoneNumber),
    __metadata("design:type", PhoneNumber)
], AddUserDTO.prototype, "user_phone_number", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => PhoneNumber),
    __metadata("design:type", Array)
], AddUserDTO.prototype, "alternate_phone_number", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => Address),
    __metadata("design:type", Object)
], AddUserDTO.prototype, "user_address", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", Array)
], AddUserDTO.prototype, "user_role", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AddUserDTO.prototype, "user_dob", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AddUserDTO.prototype, "user_gender", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => Language),
    __metadata("design:type", Array)
], AddUserDTO.prototype, "user_about", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => Media),
    __metadata("design:type", Array)
], AddUserDTO.prototype, "user_media", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AddUserDTO.prototype, "password", void 0);
exports.AddUserDTO = AddUserDTO;
class Language {
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Language.prototype, "description", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Language.prototype, "language", void 0);
exports.Language = Language;
class Email {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Email.prototype, "email", void 0);
exports.Email = Email;
class PhoneNumber {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PhoneNumber.prototype, "country", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PhoneNumber.prototype, "ext", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PhoneNumber.prototype, "phone_number", void 0);
exports.PhoneNumber = PhoneNumber;
class Address {
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Address.prototype, "type", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Address.prototype, "country", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Address.prototype, "address_line_one", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Address.prototype, "address_line_two", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Address.prototype, "city", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Address.prototype, "state", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Address.prototype, "pincode", void 0);
exports.Address = Address;
class Media {
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Media.prototype, "type", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Media.prototype, "visibility", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", Object)
], Media.prototype, "media_id", void 0);
exports.Media = Media;
//# sourceMappingURL=add-user.dto.js.map
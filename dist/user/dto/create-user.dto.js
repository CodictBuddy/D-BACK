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
exports.Media = exports.PasswordHistory = exports.Address = exports.PhoneNumber = exports.Email = exports.Language = exports.CreateUserDTO = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateUserDTO {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => Language),
    __metadata("design:type", Array)
], CreateUserDTO.prototype, "first_name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => Language),
    __metadata("design:type", Array)
], CreateUserDTO.prototype, "last_name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Object)
], CreateUserDTO.prototype, "designation", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Object)
], CreateUserDTO.prototype, "email", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => Email),
    __metadata("design:type", Array)
], CreateUserDTO.prototype, "alternate_email", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Object)
], CreateUserDTO.prototype, "phone_number", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => PhoneNumber),
    __metadata("design:type", Array)
], CreateUserDTO.prototype, "alternate_phone_number", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => Address),
    __metadata("design:type", Object)
], CreateUserDTO.prototype, "address", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", Array)
], CreateUserDTO.prototype, "roles", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "date_of_birth", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Object)
], CreateUserDTO.prototype, "gender", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", Boolean)
], CreateUserDTO.prototype, "account_verification", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => PasswordHistory),
    __metadata("design:type", Array)
], CreateUserDTO.prototype, "password_history", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => Language),
    __metadata("design:type", Array)
], CreateUserDTO.prototype, "about", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => Media),
    __metadata("design:type", Array)
], CreateUserDTO.prototype, "media", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "password", void 0);
exports.CreateUserDTO = CreateUserDTO;
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
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Email.prototype, "type", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Email.prototype, "email", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Email.prototype, "visibility", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", Object)
], Email.prototype, "addedOn", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], Email.prototype, "verification", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", Object)
], Email.prototype, "verifiedOn", void 0);
exports.Email = Email;
class PhoneNumber {
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PhoneNumber.prototype, "type", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PhoneNumber.prototype, "country", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PhoneNumber.prototype, "ext", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PhoneNumber.prototype, "phone_number", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PhoneNumber.prototype, "visibility", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", Object)
], PhoneNumber.prototype, "addedOn", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], PhoneNumber.prototype, "verification", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", Object)
], PhoneNumber.prototype, "verifiedOn", void 0);
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
], Address.prototype, "ext", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Address.prototype, "phone_number", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Address.prototype, "visibility", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", Object)
], Address.prototype, "addedOn", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], Address.prototype, "verification", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", Object)
], Address.prototype, "verifiedOn", void 0);
exports.Address = Address;
class PasswordHistory {
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PasswordHistory.prototype, "password", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.IsISO8601(),
    __metadata("design:type", Date)
], PasswordHistory.prototype, "updatedOn", void 0);
exports.PasswordHistory = PasswordHistory;
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
//# sourceMappingURL=create-user.dto.js.map
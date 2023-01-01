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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleService = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
let RoleService = class RoleService {
    constructor(roleModel) {
        this.roleModel = roleModel;
    }
    async roleCreate(body) {
        try {
            await this.roleModel.create(body);
            return { message: "record created successfully" };
        }
        catch (err) {
            throw err;
        }
    }
    async roleUpdate(id, body) {
        try {
            await this.roleModel.findByIdAndUpdate(id, body, { new: true });
            let updatedData = await this.roleModel.findById(id);
            return updatedData;
        }
        catch (err) {
            throw err;
        }
    }
    async roleDelete(id) {
        try {
            await this.roleModel.findByIdAndDelete(id);
            return { message: "record deleted successfully" };
        }
        catch (err) {
            throw err;
        }
    }
    async roleList() {
        try {
            let data = await this.roleModel.find();
            return data;
        }
        catch (err) {
            throw err;
        }
    }
    async roleDetail(id) {
        try {
            let data = await this.roleModel.findById(id);
            return data;
        }
        catch (err) {
            throw err;
        }
    }
};
RoleService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel("role")),
    __metadata("design:paramtypes", [mongoose_1.Model])
], RoleService);
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map
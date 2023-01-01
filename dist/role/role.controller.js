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
exports.RoleController = void 0;
const shared_service_1 = require("../shared/shared.service");
const common_1 = require("@nestjs/common");
const role_service_1 = require("./role.service");
let RoleController = class RoleController {
    constructor(roleService, sservice) {
        this.roleService = roleService;
        this.sservice = sservice;
    }
    async roleCreate(res, body) {
        try {
            let data = await this.roleService.roleCreate(body);
            return res.json(data);
        }
        catch (err) {
            const { code, response } = await this.sservice.processError(err, this.constructor.name);
            return res.status(code).json(response);
        }
    }
    async updaterole(id, body, res) {
        try {
            let data = await this.roleService.roleUpdate(id, body);
            return res.json(data);
        }
        catch (err) {
            const { code, response } = this.sservice.processError(err, this.constructor.name);
            return res.status(code).json(response);
        }
    }
    async deleterole(id, res) {
        try {
            let data = await this.roleService.roleDelete(id);
            return res.json(data);
        }
        catch (err) {
            const { code, response } = await this.sservice.processError(err, this.constructor.name);
            return res.status(code).json(response);
        }
    }
    async getRoleDetail(id, res) {
        try {
            let data = await this.roleService.roleDetail(id);
            return res.json(data);
        }
        catch (err) {
            const { code, response } = await this.sservice.processError(err, this.constructor.name);
            return res.status(code).json(response);
        }
    }
    async getRoleList(res) {
        try {
            let data = await this.roleService.roleList();
            return res.json(data);
        }
        catch (err) {
            const { code, response } = await this.sservice.processError(err, this.constructor.name);
            return res.status(code).json(response);
        }
    }
};
__decorate([
    common_1.Post("role-create"),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "roleCreate", null);
__decorate([
    common_1.Patch("role-update/:id"),
    __param(0, common_1.Param("id")),
    __param(1, common_1.Body()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "updaterole", null);
__decorate([
    common_1.Delete("role-delete/:id"),
    __param(0, common_1.Param("id")), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "deleterole", null);
__decorate([
    common_1.Get("role-detail/:id"),
    __param(0, common_1.Param("id")), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "getRoleDetail", null);
__decorate([
    common_1.Get("get-list"),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "getRoleList", null);
RoleController = __decorate([
    common_1.Controller("role"),
    __metadata("design:paramtypes", [role_service_1.RoleService,
        shared_service_1.SharedService])
], RoleController);
exports.RoleController = RoleController;
//# sourceMappingURL=role.controller.js.map
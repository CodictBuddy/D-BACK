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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const app_exception_1 = require("../shared/app-exception");
const bcrypt = require("bcryptjs");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../user/schema/user.schema");
const usertoken_dto_1 = require("../user/dto/usertoken.dto");
const userAction_schema_1 = require("../user/schema/userAction.schema");
let AuthService = class AuthService {
    constructor(jwtService, User, UserAction) {
        this.jwtService = jwtService;
        this.User = User;
        this.UserAction = UserAction;
    }
    async validateUser(user_email, pass) {
        try {
            const user = await this.checkUser(user_email, pass);
            if (!user)
                return null;
            return user;
        }
        catch (err) {
            throw err;
        }
    }
    async checkUser(user_email, password) {
        try {
            let user = await this.User.findOne({ 'user_email.email': user_email });
            if (!user)
                throw new app_exception_1.AppException('Credentials not matched', common_1.HttpStatus.UNAUTHORIZED);
            let attempts = await this.checkLoginAttempts(user._id, 'loginFailureAttempts');
            let checkPassword = bcrypt.compare(password, user.password);
            if (checkPassword) {
                await this.UserAction.findOneAndUpdate({
                    user_id: user._id,
                    activity: 'loginFailureAttempts',
                    identity: user.user_email._id,
                }, { $set: { attempts: 0, last_attempt_on: 0 } });
                return user;
            }
            else {
                let updatedData = await this.UserAction.findOneAndUpdate({
                    user_id: user._id,
                    activity: 'loginFailureAttempts',
                    identity: user.user_email._id,
                }, { $set: { $inc: { attempts: 1 }, last_attempt_on: Date.now() } }, { upsert: true, new: true });
                return null;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async getDuration(attempt, activity) {
        let data = {};
        let configurationData = {};
        return 0;
    }
    async checkLoginAttempts(user, activity) {
        let loginAttempts = await this.UserAction.findOne({
            user_id: user.user_id,
            activity: activity,
        });
        if (loginAttempts) {
            let duration = await this.getDuration(loginAttempts.attempts, loginAttempts.activity);
            let delay = Date.now() - loginAttempts.last_attempt_on;
            if (delay < duration) {
                let remaining = duration - delay;
                let minutes = Math.round(remaining / 60000);
                throw new app_exception_1.AppException('Your Account is locked due to you exceed the limit,Retry after' +
                    ' ' +
                    `${minutes}`, +'Minutes' + common_1.HttpStatus.NOT_ACCEPTABLE);
            }
        }
        else
            return 0;
    }
    async loginUser(credentials, organization_code) {
        try {
            let data = await this.User.findOne({
                'user_email.email': credentials.user_email,
                organization_code,
            });
            if (!data) {
                throw new app_exception_1.AppException('no user fount with these credentials', common_1.HttpStatus.NOT_FOUND);
            }
            let checkPassword = await bcrypt.compare(credentials.password, data.password);
            if (!checkPassword) {
                throw new app_exception_1.AppException('Incorrect password', common_1.HttpStatus.BAD_REQUEST);
            }
            return await this.generateToken(data);
        }
        catch (err) {
            throw err;
        }
    }
    async generateToken(user) {
        try {
            let data = await this.User.findOne({ _id: user._id })
                .lean()
                .select({
                _id: 1,
                first_name: 1,
                last_name: 1,
                user_phone_number: 1,
                user_dob: 1,
                user_gender: 1,
                user_about: 1,
                user_headline: 1,
                user_profile_image: 1,
                user_background_image: 1,
            })
                .populate('user_profile_image', {
                _id: 1,
                public_id: 1,
                url: 1,
                type: 1,
            })
                .populate('user_background_image', {
                _id: 1,
                public_id: 1,
                url: 1,
                type: 1,
            });
            const payload = {
                id: user._id,
                email: user.user_email.email,
            };
            return {
                access_token: this.jwtService.sign(payload, {
                    expiresIn: process.env.JWT_EXPIRATION,
                }),
                user: data,
            };
        }
        catch (err) {
            throw err;
        }
    }
    createPasswordHash(data) {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(data.password, salt);
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(1, mongoose_1.InjectModel('user')),
    __param(2, mongoose_1.InjectModel('userAction')),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mongoose_2.Model,
        mongoose_2.Model])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
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
exports.UserService = void 0;
const auth_service_1 = require("./../auth/auth.service");
const utils_service_1 = require("./../utils/utils.service");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const app_exception_1 = require("../shared/app-exception");
const bcrypt = require("bcryptjs");
const shared_service_1 = require("../shared/shared.service");
let UserService = class UserService {
    constructor(userModel, sservice, utilsService, aservice) {
        this.userModel = userModel;
        this.sservice = sservice;
        this.utilsService = utilsService;
        this.aservice = aservice;
    }
    async findByLogin(userDto) {
        const { email, password } = userDto;
        const user = await this.userModel.findOne({ 'user_email.email': email });
        if (!user) {
            throw new common_1.HttpException('Invalid email', common_1.HttpStatus.UNAUTHORIZED);
        }
        if (await bcrypt.compare(password, user.password)) {
            return user;
        }
        else {
            throw new common_1.HttpException('Invalid password', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async signUp(body, organization_code) {
        try {
            const user = await this.userModel.findOne({
                organization_code: organization_code,
                'user_email.email': body.email,
            });
            if (user)
                throw new app_exception_1.AppException('User already exist', common_1.HttpStatus.BAD_REQUEST);
            const hashed = await this.aservice.createPasswordHash(body);
            let fv = {
                organization_code: organization_code,
                first_name: [
                    {
                        description: body.first_name,
                        language: body.lng,
                    },
                ],
                last_name: [
                    {
                        description: body.last_name,
                        language: body.lng,
                    },
                ],
                user_email: {
                    type: 'primary',
                    email: body.email,
                },
                password: hashed,
            };
            let createdUser = await this.userModel.create(fv);
            const d = await this.resetCodeGeneratorDB(createdUser);
            if (d) {
                this.triggerMail(d);
            }
            return await this.aservice.generateToken(d);
        }
        catch (e) {
            return e;
        }
    }
    async getProfile(user_id, organization_code, token) {
        const userMeta = {};
        const user = await this.userModel
            .findOne({
            _id: user_id,
            organization_code,
        })
            .lean()
            .select({
            user_account_status: 1,
            first_name: 1,
            last_name: 1,
            user_email: 1,
            user_phone_number: 1,
            user_dob: 1,
            user_gender: 1,
            user_about: 1,
            user_headline: 1,
            user_profile_image: 1,
            user_background_image: 1,
        })
            .populate('user_profile_image', {
            public_id: 1,
            url: 1,
            type: 1,
        })
            .populate('user_background_image', {
            public_id: 1,
            url: 1,
            type: 1,
        });
        if (!user)
            throw new app_exception_1.AppException('User does not exist', common_1.HttpStatus.NOT_FOUND);
        userMeta['self'] = token.id === user_id;
        return { userMeta, user };
    }
    async suggestions(organization_code, token) {
        const user = await this.userModel
            .find({
            organization_code: organization_code,
            _id: { $ne: token.id },
        })
            .select({
            first_name: 1,
            last_name: 1,
            user_email: 1,
            user_headline: 1,
            user_profile_image: 1,
        })
            .populate('user_profile_image', {
            url: 1,
            type: 1,
        });
        return { user };
    }
    async updateProfile(body, organization_code, token) {
        const user = await this.userModel.findOne({
            organization_code: organization_code,
            _id: token.id,
        });
        if (!user)
            throw new app_exception_1.AppException('User does not exist', common_1.HttpStatus.NOT_FOUND);
        let fv = { updated_at: new Date().toISOString() };
        if (body.hasOwnProperty('first_name')) {
            fv['first_name'] = [
                {
                    description: body.first_name,
                    language: body.lng,
                },
            ];
        }
        if (body.hasOwnProperty('last_name')) {
            fv['last_name'] = [
                {
                    description: body.last_name,
                    language: body.lng,
                },
            ];
        }
        if (body.hasOwnProperty('user_profile_image')) {
            fv['user_profile_image'] = body.user_profile_image;
        }
        if (body.hasOwnProperty('user_background_image')) {
            fv['user_background_image'] = body.user_background_image;
        }
        if (body.hasOwnProperty('user_dob')) {
            fv['user_dob'] = body.user_dob;
        }
        if (body.hasOwnProperty('user_gender')) {
            fv['user_gender'] = body.user_gender;
        }
        if (body.hasOwnProperty('user_account_status')) {
            fv['user_account_status'] = body.user_account_status;
        }
        if (body.hasOwnProperty('user_about')) {
            fv['user_about'] = {
                description: body.user_about,
                language: body.lng,
            };
        }
        if (body.hasOwnProperty('user_headline')) {
            fv['user_headline'] = {
                description: body.user_headline,
                language: body.lng,
            };
        }
        if (body.hasOwnProperty('user_notification_token')) {
            fv['user_notification_token'] = body.user_notification_token;
        }
        await this.userModel.updateOne({ organization_code, _id: token.id }, fv, {
            new: true,
        });
        const d = await this.userModel.findOne({
            _id: token.id,
            organization_code,
        });
        return await this.aservice.generateToken(d);
    }
    async forgotPassword(data, organization_code) {
        let foundUser = await this.userModel.findOne({
            'user_email.email': data.email,
            organization_code,
        });
        if (!foundUser)
            throw new app_exception_1.AppException('user does not exist', common_1.HttpStatus.NOT_FOUND);
        if (foundUser) {
            const data = await this.resetCodeGeneratorDB(foundUser);
            if (data) {
                this.triggerMail(data);
            }
        }
        return { _id: foundUser._id };
    }
    async resetPassword(data, organization_code) {
        const hashed = this.aservice.createPasswordHash(data);
        if (!hashed)
            throw new app_exception_1.AppException('no hashed created', common_1.HttpStatus.EXPECTATION_FAILED);
        await this.userModel.updateOne({ _id: data._id, organization_code }, { password: hashed });
        const d = await this.userModel.findOne({
            _id: data._id,
            organization_code,
        });
        if (!d)
            throw new app_exception_1.AppException('invalid credentials', common_1.HttpStatus.NOT_FOUND);
        return this.aservice.generateToken(d);
    }
    async resetCodeGeneratorDB(data) {
        const code = this.sservice.random6DigitCodeGenerator();
        const uData = await this.userModel.updateOne({ _id: data._id, organization_code: data.organization_code }, { code });
        if (uData) {
            setTimeout(() => {
                this.userModel
                    .updateOne({ _id: data._id }, { code: null })
                    .then(r => { });
            }, 180000);
        }
        return await this.userModel.findOne({
            _id: data._id,
            organization_code: data.organization_code,
        });
    }
    async verifyCode(data, organization_code) {
        let userData = await this.userModel.findOne({
            _id: data._id,
            organization_code,
        });
        if (userData && data['code'] === userData.code) {
            await this.userModel.updateOne({ _id: userData._id }, { code: null, 'user_email.verification': true });
            return { status: 'verified' };
        }
        if (userData && data.code != userData.code) {
            throw new app_exception_1.AppException('the entered code is incorrect', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async retryCode(data, organization_code) {
        let userData = await this.userModel.findOne({
            _id: data._id,
            organization_code,
        });
        let counter = 0;
        let code = this.sservice.random6DigitCodeGenerator();
        if (!userData)
            throw new app_exception_1.AppException('no data found', common_1.HttpStatus.NOT_FOUND);
        if (userData.retry === 3) {
            await this.userModel.deleteOne({ _id: userData._id, organization_code });
            throw new app_exception_1.AppException('please try again after some time', common_1.HttpStatus.FORBIDDEN);
        }
        if (userData.retry >= 0 && userData.retry < 3) {
            counter = userData.retry + 1;
        }
        const uData = await this.userModel.updateOne({
            _id: userData._id,
            organization_code,
        }, { retry: counter, code });
        if (uData) {
            setTimeout(() => {
                this.userModel
                    .updateOne({ _id: userData._id }, { code: null })
                    .then(r => { });
            }, 180000);
        }
        let latestCodeData = await this.userModel.findOne({
            _id: data._id,
            organization_code,
        });
        if (latestCodeData) {
            this.triggerMail(latestCodeData);
        }
        return { status: 'new code sent successfully' };
    }
    async triggerMail(data) {
        let sendSmtpEmail = {
            to: [
                {
                    email: data.user_email.email,
                },
            ],
            templateId: 1,
            params: {
                name: 'Malith',
                subject: 'Someone sent you a link',
                text: data.code,
            },
        };
        await this.utilsService.sendinblue(sendSmtpEmail);
    }
    async getUserById(userId, organization_code) {
        let user = await this.userModel.findOne({
            _id: userId,
            organization_code,
        });
        return { user };
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('user')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        shared_service_1.SharedService,
        utils_service_1.UtilsService,
        auth_service_1.AuthService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
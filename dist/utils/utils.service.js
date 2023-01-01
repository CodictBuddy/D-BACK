"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilsService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const toStream = require("buffer-to-stream");
var SibApiV3Sdk = require('sib-api-v3-typescript');
var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
var apiKey = apiInstance.authentications['apiKey'];
apiKey.apiKey =
    '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';
var partnerKey = apiInstance.authentications['partnerKey'];
partnerKey.apiKey =
    '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';
let UtilsService = class UtilsService {
    async uploadImage(file) {
        return new Promise((resolve, reject) => {
            const upload = cloudinary_1.v2.uploader.upload_stream((error, result) => {
                if (error)
                    return reject(error);
                resolve(result);
            });
            toStream(file.buffer).pipe(upload);
        });
    }
    async deleteFile(public_id) {
        return new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader.destroy(public_id, (error, result) => {
                if (error)
                    return reject(error);
                resolve(result);
            });
        });
    }
    async sendinblue(sendSmtpEmail) {
        apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
            console.log('data for email', data);
            return true;
        }, function (error) {
            console.error(error);
            return false;
        });
    }
};
UtilsService = __decorate([
    common_1.Injectable()
], UtilsService);
exports.UtilsService = UtilsService;
//# sourceMappingURL=utils.service.js.map
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
exports.SharedService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const app_exception_1 = require("./app-exception");
let SharedService = class SharedService {
    constructor(Sequence) {
        this.Sequence = Sequence;
        this.defaultLanguage = 'en';
    }
    async createSequence(tenant, name, defaultValue) {
        await this.Sequence.create({ tenant, name, value: defaultValue });
    }
    random6DigitCodeGenerator() {
        return Math.floor(100000 + Math.random() * 900000);
    }
    async getNextNumber(sequenceName) {
        let seq = await this.Sequence.findOneAndUpdate({ name: sequenceName }, { $inc: { value: 1 } }, { new: true, upsert: true });
        return `${seq.value}`;
    }
    processError(err, context) {
        let code, response;
        if (err instanceof app_exception_1.AppException) {
            code = err.getCode();
            response = { code, message: err.getMessage() };
        }
        else {
            code = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            response = { code, message: 'Something went wrong' };
        }
        console.log('err', err);
        return { code, response };
    }
    mediaMapping(data, media, media_details) {
        data.forEach(ele => {
            this.accessByString(ele, media).forEach(m => {
                m['location'] = this.accessByString(ele, media_details).find(x => x._id.toString() == m.media_id.toString()).location;
            });
        });
        return data;
    }
    accessByString(o, s) {
        s = s.replace(/\[(\w+)\]/g, '.$1');
        s = s.replace(/^\./, '');
        var a = s.split('.');
        for (var i = 0, n = a.length; i < n; ++i) {
            var k = a[i];
            if (k in o) {
                o = o[k];
            }
            else {
                return;
            }
        }
        return o;
    }
    processCondition(organization_code, user_id_1, user_id_2, type) {
        let filterObj = this.commonFilterObjectCreator(organization_code, type)
            .filterObj;
        const commFilter = this.commonFilterObjectCreator(organization_code, type)
            .commFilter;
        filterObj['$or'].push(Object.assign(Object.assign({}, commFilter), { target_user_id: user_id_1, user_id: user_id_2 }));
        filterObj['$or'].push(Object.assign(Object.assign({}, commFilter), { target_user_id: user_id_2, user_id: user_id_1 }));
        return filterObj;
    }
    returnUniqueRecords(data) {
        return [...new Set(data)];
    }
    processfetchMyRecordsCondition(organization_code, user_id, type, vision = 'all') {
        let filterObj = this.commonFilterObjectCreator(organization_code, type)
            .filterObj;
        const commFilter = this.commonFilterObjectCreator(organization_code, type)
            .commFilter;
        filterObj['$or'].push(Object.assign(Object.assign({}, commFilter), { target_user_id: user_id }));
        if (vision === 'all') {
            filterObj['$or'].push(Object.assign(Object.assign({}, commFilter), { user_id: user_id }));
        }
        return filterObj;
    }
    commonFilterObjectCreator(organization_code, type) {
        const commFilter = {
            organization_code,
        };
        if (type) {
            commFilter['type'] = type;
        }
        return {
            filterObj: {
                $or: [],
            },
            commFilter,
        };
    }
};
SharedService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('sequence')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SharedService);
exports.SharedService = SharedService;
//# sourceMappingURL=shared.service.js.map
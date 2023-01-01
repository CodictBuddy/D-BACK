"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetReqDetails = void 0;
const common_1 = require("@nestjs/common");
exports.GetReqDetails = common_1.createParamDecorator((data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    return req[data];
});
//# sourceMappingURL=get-request-details.js.map
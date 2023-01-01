"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSourceDetails = void 0;
const common_1 = require("@nestjs/common");
exports.GetSourceDetails = common_1.createParamDecorator((data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    return req[data];
});
//# sourceMappingURL=get-source-details.js.map
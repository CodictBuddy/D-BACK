"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOrganization = void 0;
const common_1 = require("@nestjs/common");
exports.GetOrganization = common_1.createParamDecorator((data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    return data ? req["organization"][data] || "" : req["organization"];
});
//# sourceMappingURL=get-organization.decorator.js.map
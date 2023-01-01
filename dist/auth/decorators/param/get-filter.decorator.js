"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFilters = void 0;
const common_1 = require("@nestjs/common");
exports.GetFilters = common_1.createParamDecorator((data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    return req.filterDetails;
});
//# sourceMappingURL=get-filter.decorator.js.map
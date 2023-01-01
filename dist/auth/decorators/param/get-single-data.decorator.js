"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSingleData = void 0;
const common_1 = require("@nestjs/common");
exports.GetSingleData = common_1.createParamDecorator((data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    return req["single_data"];
});
//# sourceMappingURL=get-single-data.decorator.js.map
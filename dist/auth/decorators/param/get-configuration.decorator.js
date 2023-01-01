"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetConfiguration = void 0;
const common_1 = require("@nestjs/common");
exports.GetConfiguration = common_1.createParamDecorator((data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    let config = req["configuration"].configurations;
    if (data) {
        return config[data] || "";
    }
    return config;
});
//# sourceMappingURL=get-configuration.decorator.js.map
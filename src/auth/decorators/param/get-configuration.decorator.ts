import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetConfiguration = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    let config = req["configuration"].configurations;
    if (data) {
      return config[data] || "";
    }
    return config;
  }
);

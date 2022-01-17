import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetOrganization = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return data ? req["organization"][data] || "" : req["organization"];
  }
);

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const Token = createParamDecorator(
  (tokentType: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const token: string = request.headers[tokentType];
    return token;
  },
);
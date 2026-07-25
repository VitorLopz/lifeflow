import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Uso: create(@CurrentUser('id') userId: string, ...)
// Extrai req.user (preenchido pelo JwtStrategy) sem repetir @Req() em todo controller.
export const CurrentUser = createParamDecorator(
  (data: 'id' | 'email' | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return data ? req.user?.[data] : req.user;
  },
);

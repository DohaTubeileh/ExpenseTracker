import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../../types/jwt.payload';

export const ExpensePayload = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtPayload => {
    const request: { user: JwtPayload } = ctx.switchToHttp().getRequest();
    return request?.user; // This contains your JWT payload
  },
);

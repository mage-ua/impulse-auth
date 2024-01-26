import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REQUEST_USER_KEY } from '../constants';
import { ActiveUserData } from '../../users/interfaces';

export const ActiveUser = createParamDecorator(
  (filed: keyof ActiveUserData | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: ActiveUserData = request[REQUEST_USER_KEY];
    return filed ? user?.[filed] : user;
  },
);

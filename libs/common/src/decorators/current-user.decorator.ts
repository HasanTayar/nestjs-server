import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UsersDocument } from '../models';

const getCurrentUserByContext = (context: ExecutionContext): UsersDocument => {
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (_data, context: ExecutionContext) => getCurrentUserByContext(context),
);

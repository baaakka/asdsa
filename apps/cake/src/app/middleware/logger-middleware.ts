import { AuthorizedRequest } from '@cake/lib-api-interface';
import { Response } from 'express';
import { Logger } from '@xtool/logger';

const logger = new Logger('logger-middleware');

export const loggerMiddleware = async (request: AuthorizedRequest, res, next): Promise<AuthorizedRequest> => {
  console.log('====================================');
  console.log('loggerMiddleware', request.path);
  console.log('====================================');
  next();
  return request;
};

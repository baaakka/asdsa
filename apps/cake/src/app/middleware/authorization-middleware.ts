import { Response, StatusCode } from 'typescript-openapi-router';

import { Logger } from '@xtool/logger';
import { Prisma, Token } from '@prisma/client';
import { PrismaRepository } from '../repository/prisma-repository';
import { TokenManager } from '../controllers/authorization/helpers/token-manager';
import { AuthorizedRequest } from '@cake/lib-api-interface';

const logger = new Logger('authorization-middleware');

export const authorizationMiddleware = async (
  request: AuthorizedRequest,
  res,
  next
): Promise<[AuthorizedRequest, Response<any> | null]> => {
  logger.log('checking authorization');
  const tokenRepo = new PrismaRepository<Token>('token');
  const authToken = TokenManager.tokenFromRequest(request);
  const tokenData = TokenManager.process(authToken);

  if (!tokenData) {
    logger.log('cannot validate token');
    return res.status(StatusCode.unauthorized).json({
      errors: [
        {
          code: 'Unauthorized',
          message: `cannot validate token`,
        },
      ],
    });
  }

  const [token, error] = await tokenRepo.findFirst<Prisma.TokenFindFirstArgs>({
    where: {
      userId: tokenData.data.id,
      authToken: authToken,
    },
  });

  if (!token || token.isDisabled || error) {
    logger.log('token not found or is disabled', token, error);
    return res.status(StatusCode.unauthorized).json({
      errors: [
        {
          code: 'token not found or is disabled',
          message: error,
        },
      ],
    });
  }

  logger.log('token is valid');
  logger.log(JSON.stringify(tokenData));
  request.extra = {
    userId: String(tokenData.data.id),
    email: tokenData.data.e,
    role: tokenData.data.r as any,
  };
  next();
  return [request, null];
};

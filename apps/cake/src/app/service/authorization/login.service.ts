import { Logger } from '@xtool/logger';

import { StatusCode } from 'typescript-openapi-router';
import { Response, Request } from 'express';
import { Prisma } from '@prisma/client';
import { PrismaRepository } from '../../repository/prisma-repository';
import { PasswordManager } from '../../controllers/authorization/helpers/password-manager';
import { TokenManager } from '../../controllers/authorization/helpers/token-manager';
import { LoginRequestBody, LoginResponseBody } from '@cake/lib-api-interface';

const logger = new Logger('login api');
const userRepository = new PrismaRepository('user');
const tokenRepository = new PrismaRepository('token');

export const apiLogin = async (request: Request<LoginRequestBody>, res: Response): Promise<Response<LoginResponseBody>> => {
  logger.log('login in user with', request);

  const email = request.body.email;
  const password = request.body.password;

  const [existingUser] = await userRepository.findFirst<Prisma.UserFindFirstArgs>({
    where: {
      email: email,
    },
  });

  if (!existingUser) {
    logger.log('user does not exist');
    return res.status(StatusCode.badRequest).json({
      errors: [
        {
          code: 'wrong-credentials',
          message: `Wrong username or password`,
        },
      ],
    });
  }

  const passwordsMatch = await PasswordManager.compare(password, existingUser.password);

  if (!passwordsMatch) {
    logger.log('passwords do not match');
    return res.status(StatusCode.badRequest).json({
      errors: [
        {
          code: 'wrong-credentials',
          message: 'Wrong username or password',
        },
      ],
    });
  }

  const { authToken, refreshToken } = TokenManager.sign({
    data: {
      id: existingUser.id,
      e: existingUser.email,
      r: existingUser.role,
    },
  });

  await tokenRepository.create<Prisma.TokenCreateArgs>({
    data: {
      authToken,
      refreshToken,
      userId: existingUser.id,
    },
  });

  logger.log('token created');

  return res.status(200).json({
    data: {
      authToken: authToken,
      authTokenType: 'Bearer',
      refreshToken: refreshToken,
      role: existingUser.role as any,
      id: existingUser.id,
    },
  });
};

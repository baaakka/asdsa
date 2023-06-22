import { UserWithRelations } from './../../types/userWithRelations';
import { Logger } from '@xtool/logger';
import { Prisma, Platform } from '@prisma/client';
import { PrismaRepository } from '../../repository/prisma-repository';
import { StatusCode } from 'typescript-openapi-router';
import { Request, Response } from 'express';
import { RemovePlatformRequestBody, ResponseEnvelope } from '@cake/lib-api-interface';

const platformRepository = new PrismaRepository<Platform>('platform');
const userReposeitory = new PrismaRepository<UserWithRelations>('user');
const logger = new Logger('remove Platform');

export const removePlatformService = async (
  request: Request<RemovePlatformRequestBody>,
  res: Response
): Promise<Response<ResponseEnvelope>> => {
  const userId = request['extra'].userId;
  const { link } = request.body;

  const [userPlatform, errorUser] = await userReposeitory.findFirst<Prisma.UserFindFirstArgs>({
    where: {
      id: userId,
    },
    select: {
      platforms: {
        where: {
          link,
        },
      },
    },
  });

  if (errorUser) {
    logger.error('Failed get user platform', errorUser);
    return res.status(StatusCode.badRequest).json({ error: errorUser });
  }

  if (userPlatform.platforms.length === 1) {
    const [, error] = await platformRepository.deleteOne<Prisma.PlatformDeleteArgs>({
      where: {
        link: link as string,
      },
    });

    if (error) {
      logger.error('Failed remove user platform', error);
      return res.status(StatusCode.badRequest).json({ error });
    }
    return res.status(StatusCode.noContent).json({});
  }

  return res.status(StatusCode.badRequest).json({ error: 'You can not delete this platform' });
};

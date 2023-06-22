import { Logger } from '@xtool/logger';
import { Prisma } from '@prisma/client';
import { PrismaRepository } from '../../repository/prisma-repository';
import { StatusCode } from 'typescript-openapi-router';
import { UserByPlatformResponse } from '@cake/lib-api-interface';
import { Request, Response } from 'express';
import { PlatformWithRelations } from '../../types/platformWithRelations';
import { userByPlatformMapper } from '../../utils';

const platformRepository = new PrismaRepository<PlatformWithRelations>('platform');
const userLogger = new Logger('get user by platform');

export const getUserByPlatform = async (request: Request<unknown>, res: Response): Promise<Response<UserByPlatformResponse>> => {
  const userId = request['extra'].userId;

  const { link } = request.query;

  console.log(link, userId);
  
  const [userData, error] = await platformRepository.findFirst<Prisma.PlatformFindFirstArgs>({
    where: {
      link: link as string,
    },

    select: {
      User: {
        select: {
          id: true,
          followedByIDs: true,
        }
      }
    },
  });

  if (error) {
    userLogger.error('Failed get list of users', error);
    return res.status(StatusCode.badRequest).json({ error });
  }

  if (!userData) {
    userLogger.error('User not found', new Error('User not found'));
    return res.status(StatusCode.notFound).json({ error: new Error('User not found') });
  }
  return res.status(StatusCode.okay).json({
    data: userByPlatformMapper(userData, userId),
  });
};

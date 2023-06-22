import { Logger } from '@xtool/logger';
import { Prisma, User } from '@prisma/client';
import { PrismaRepository } from '../../repository/prisma-repository';
import { StatusCode } from 'typescript-openapi-router';
import { Request, Response } from 'express';
import { ResponseEnvelope } from '@cake/lib-api-interface';

const followerRepository = new PrismaRepository<User>('user');
const logger = new Logger('add follower');

export const RemoveFollower = async (
  request: Request<unknown>,
  res: Response
): Promise<Response<ResponseEnvelope>> => {
  const followerId = request['extra'].userId;
  const { userId } = request.body;
  const [, error] = await followerRepository.updateOne<Prisma.UserUpdateArgs>({
    where: {
      id: followerId,
    },
    data: {
      following: {
        disconnect: {
          id: userId,
        },
      },
    },
  });

  if (error) {
    logger.error('Failed add follower', error);
    return res.status(StatusCode.badRequest).json({ error });
  }

  return res.status(StatusCode.noContent).json({});
};

import { Logger } from '@xtool/logger';
import { Prisma, Reward } from '@prisma/client';
import { PrismaRepository } from '../../repository/prisma-repository';
import { StatusCode } from 'typescript-openapi-router';
import { GetKOLById, KolItem } from '@cake/lib-api-interface';
import { UserWithRelations } from '../../types';
import { Request, Response } from 'express';

const rewardsRepository = new PrismaRepository<Reward>('reward');
const userRepository = new PrismaRepository<UserWithRelations>('user');
const userLogger = new Logger('get user by id');

export const getKOLById = async (request: Request<GetKOLById>, res: Response): Promise<Response<KolItem>> => {
  const userId = request.params.userId;
  const page = request.query.page ?? 1;
  const pageSize = request.query.pageSize ?? 12;

  const [userData, error] = await userRepository.findFirst<Prisma.UserFindFirstArgs>({
    where: {
      id: userId,
    },

    select: {
      rewards: {
        take: Number(pageSize),
        skip: (Number(page) - 1) * Number(pageSize),
        select: {
          id: true,
          smallImage: true,
          type: true,
          cost: true,
        },
      },
    },
  });

  if (error) {
    userLogger.error('Failed get list of users', error);
    return res.status(StatusCode.badRequest).json({ error });
  }

  const where = { userId: userId };
  const [count, errorCount] = await rewardsRepository.count<Prisma.RewardFindManyArgs>({ where });

  if (errorCount) {
    userLogger.error('Failed count rewards', errorCount);
    return res.status(StatusCode.badRequest).json({ errorCount });
  }

  return res.status(StatusCode.okay).json({
    data: userData,
    count,
    page: Number(page),
    pageSize: Number(pageSize),
  });
};

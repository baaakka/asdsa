import { Logger } from '@xtool/logger';
import { Prisma, Reward, Role } from '@prisma/client';
import { PrismaRepository } from '../../repository/prisma-repository';
import { StatusCode } from 'typescript-openapi-router';
import { queryParamsMapper } from '../../utils/queryParamsMapper';
import { KolItem, SortUserEum } from '@cake/lib-api-interface';
import { userMapper } from '../../utils';
import { UserWithRelations } from '../../types';
import { Request, Response } from 'express';

const userRepository = new PrismaRepository<UserWithRelations>('user');

const userLogger = new Logger('get all user');

export const getAllUserService = async (request: Request<unknown>, res: Response): Promise<Response<Array<KolItem>>> => {
  const userId = request['extra'].userId;
  let queryParams: Prisma.UserFindManyArgs = {};
  const { page, pageSize } = request.query;
  if (request?.query) {
    const filterParams: Prisma.UserWhereInput = {
      firstName: '',
      lastName: '',
      email: '',
    };
    queryParams = queryParamsMapper<Prisma.UserFindManyArgs, Prisma.UserWhereInput>(request.query, filterParams);
  }
  if (!request.query?.sort) {
    // queryParams.orderBy = () => {
    //   switch (request.query?.sort) {
    //     case SortUserEum.Reward:
    //         return {
    //           reward: {
    //             _count: 'desc',
    //           }
    //         }
    //     default:
    //       break;
    //   }
    // }
  }

  if (!request.query?.where) {
    queryParams.where = { role: 'KOL', ...queryParams.where };
  }

  if (request.query?.where) {
    queryParams.where = { role: request.query?.where as Role, ...queryParams.where };
  }

  const [userData, error] = await userRepository.findAll<Prisma.UserFindManyArgs>({
    ...queryParams,
    orderBy: {
      ...(request.query?.sort === SortUserEum.Reward
        ? {
            rewards: {
              _count: 'desc',
            },
          }
        : {}),
      ...(request.query?.sort === SortUserEum.Cakebox
        ? {
            rewards: {
              _count: 'desc',
            },
          }
        : {}),
      ...(request.query?.sort === SortUserEum.FollowedByIDs ? { [SortUserEum.FollowedByIDs]: 'desc' } : {}),
      ...(request.query?.sort === SortUserEum.CreatedAt ? { [SortUserEum.CreatedAt]: 'asc' } : {}),
      ...(request.query?.sort === SortUserEum.Role ? { [SortUserEum.Role]: 'asc' } : {}),
    },
    include: {
      platforms: {
        select: {
          title: true,
          isPopular: true,
          link: true,
        },
      },
      rewards: {
        where: {
          isOnCakeBox: false,
        },
        select: {
          image: true,
          type: true,
          name: true,
          rarity: true,
          RewardByIDs: true,
        },
      },
    },
  });

  if (error) {
    userLogger.error('Failed get list of users', error);
    return res.status(StatusCode.badRequest).json({ error });
  }

  const [count, errorCount] = await userRepository.count<Prisma.UserCountArgs>({
    where: queryParams.where,
  });

  if (errorCount) {
    userLogger.error('Failed count users', errorCount);
    return res.status(StatusCode.badRequest).json({ errorCount });
  }
  userLogger.debug(JSON.stringify(await userMapper(userData, userId)));
  return res.status(StatusCode.okay).json({
    data: await userMapper(userData, userId),
    count: count,
    page: Number(page),
    pageSize: Number(pageSize),
  });
};

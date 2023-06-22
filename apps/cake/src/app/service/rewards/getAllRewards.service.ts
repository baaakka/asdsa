import { GetAllRewardResponseBody, RewardItem } from '@cake/lib-api-interface';
import { Prisma, Reward, RewardEnum } from '@prisma/client';
import { Logger } from '@xtool/logger';
import { Request, Response } from 'express';
import { StatusCode } from 'typescript-openapi-router';
import { PrismaRepository } from '../../repository/prisma-repository';
import { queryParamsMapper, rewardsMapper } from '../../utils';

const rewardsRepository = new PrismaRepository<Reward>('reward');
const logger = new Logger('get all rewards');

export const getAllRewards = async (request: Request, res: Response): Promise<Response<GetAllRewardResponseBody>> => {
  const userId = request['extra'].userId;

  let queryParams: Prisma.RewardFindManyArgs = {};
  const { page, pageSize, isConfectionary, owner } = request.query;  
  if (request?.query) {
    const filterParams: Prisma.RewardWhereInput = {
      category: '',
      name: '',
    };
    queryParams = queryParamsMapper<Prisma.RewardFindManyArgs, Prisma.RewardWhereInput>(request.query, filterParams);
  }

  if (request.query?.sort) queryParams.orderBy = { [request.query?.sort as string]: 'desc' };

  if (request.query?.where !== 'TREND' && request.query?.where)
    queryParams.where = { type: request.query?.where as RewardEnum, ...queryParams.where };
    
    if (JSON.parse(owner as string || 'false')) queryParams.where = { userId: userId, ...queryParams.where };

    if (isConfectionary !== undefined) queryParams.where = { isConfectionary: JSON.parse(isConfectionary as string), ...queryParams.where, ...isConfectionary? {}: { userId: userId }  };

  queryParams.where = { isOnCakeBox: false, ...queryParams.where };

  const [rewardData, error] = await rewardsRepository.findAll<Prisma.RewardFindManyArgs>(queryParams);

  if (error) {
    logger.error('Failed get list of rewards', error);
    return res.status(StatusCode.badRequest).json({ error });
  }

  let where = {};

  if (queryParams.where && request.query?.where !== 'TREND') {
    where = { type: request.query?.where as RewardEnum, ...queryParams.where };
  }

  const [count, errorCount] = await rewardsRepository.count<Prisma.UserCountArgs>({ where });

  if (errorCount) {
    logger.error('Failed count rewards', errorCount);
    return res.status(StatusCode.badRequest).json({ errorCount });
  }

  rewardsMapper(rewardData as unknown as Array<RewardItem>).then((data) => {
    return res.status(StatusCode.okay).json({
      data,
      count,
      page: Number(page),
      pageSize: Number(pageSize),
    });
  });
};

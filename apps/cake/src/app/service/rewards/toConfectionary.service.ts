import { Prisma, Reward } from '@prisma/client';
import { Logger } from '@xtool/logger';
import { Request, Response } from 'express';
import { StatusCode } from 'typescript-openapi-router';
import { PrismaRepository } from '../../repository/prisma-repository';

const rewardsRepository = new PrismaRepository<Reward>('reward');
const logger = new Logger('get reward');

export const toConfectionary = async (request: Request, res: Response): Promise<Response<unknown>> => {
  const { rewardId } = request.params;
  const { isConfectionary } = request.body;

  const [rewardData, error] = await rewardsRepository.updateOne<Prisma.RewardUpdateArgs>({
    where: {
      id: rewardId,
    },
    data: {
      isConfectionary,
    },
  });

  if (error) {
    logger.error('Failed get reward', error);
    return res.status(StatusCode.badRequest).json({ error });
  }

  return res.status(StatusCode.okay).json({
    data: rewardData,
  });
};

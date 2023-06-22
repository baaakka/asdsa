import { RewardEnum, RewardItem } from '@cake/lib-api-interface';
import { Prisma, Reward } from '@prisma/client';
import { PrismaRepository } from '../repository/prisma-repository';

const rewardsRepository = new PrismaRepository<Reward>('reward');

export const rewardMapper = (reward: RewardItem, rewards: Array<RewardItem>): RewardItem => {
  return {
    ...reward,
    rewards: rewards,
  };
};

export const rewardsMapper = async (rewards: Array<RewardItem>): Promise<RewardItem[]> => {
    return await Promise.all(
        rewards.map(async (value) => {
          if (value.type === RewardEnum.CAKEBOX) {
            const [rewards, error] = await rewardsRepository.findAll<Prisma.RewardFindManyArgs>({
                where: {
                  id: { in: value.RewardByIDs },
                },
              })
            return {
              ...value,
              rewards: rewards as unknown as Array<RewardItem>
            };
          } else {
            return await Promise.resolve(value);
          }
        })
      )
};

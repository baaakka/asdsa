import { KolItem, PlatformEnum, RarityEnum, RewardEnum, UserByPlatformResponse } from '@cake/lib-api-interface';
import { Prisma, Reward } from '@prisma/client';
import { PrismaRepository } from '../repository/prisma-repository';
import { UserWithRelations } from '../types';
import { PlatformWithRelations } from '../types/platformWithRelations';

const rewardsRepository = new PrismaRepository<Reward>('reward');

export const userMapper = async (usersData: Array<UserWithRelations>, userId: string): Promise<Array<KolItem>> => {
  return await Promise.all(
    usersData.map(async (user: UserWithRelations): Promise<KolItem> => {
      return {
        user: {
          avatar: user.avatar,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          id: user.id,
          isFollow: user.followedByIDs.includes(userId),
        },
        rewards: user.rewards.flatMap((reward) => {
          if (reward.type === RewardEnum.SLICE) {
            const { image, name, type } = reward;
            return { image, name, type };
          }
          return [];
        }),
        followers: user.followedByIDs.length,
        platforms: user.platforms.map((platform) => ({
          platform: platform.title as PlatformEnum,
          isPopular: platform.isPopular,
          link: platform.link,
        })),
        cakeboxes: await Promise.all(
          user.rewards
            .filter((rewardFilter) => rewardFilter.type === RewardEnum.CAKEBOX)
            .flatMap(async (reward) => {
              const rewardPromises = await reward.RewardByIDs.flatMap(async (id) => {
                return await rewardsRepository.findFirst<Prisma.RewardFindFirstArgs>({
                  where: {
                    id: id,
                  },
                });
              });
              return Promise.all(rewardPromises).then((values) => {
                return {
                  rarity: reward.rarity as RarityEnum,
                  rewards: values.map((reward) => ({ image: reward[0].smallImage || reward[0].image })),
                };
              });
            }) as any
        ),
      };
    }) as any
  );
};

export const userByPlatformMapper = (usersData: PlatformWithRelations, userId: string): UserByPlatformResponse => {
  return {
    id: usersData.User.id,
    isFollow: usersData.User.followedByIDs.includes(userId),
    followers: usersData.User.followedByIDs.length,
  }
};

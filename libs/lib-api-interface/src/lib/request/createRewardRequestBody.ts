import { CategoryEnum, RarityEnum, RewardEnum } from '../constants';

export type CreateRewardsRequestBody = {
  userId?: string;
  image?: string;
  smallImage?: string;
  cost: number;
  rarity: RarityEnum;
  category: CategoryEnum;
  type: RewardEnum;
  name: string;
};
